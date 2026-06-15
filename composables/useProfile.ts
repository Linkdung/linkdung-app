/**
 * useProfile.ts
 *
 * Layer antara Apollo GraphQL dan Pinia store.
 * TanStack Query menangani caching, background refetch, dan loading states.
 * Setiap composable langsung sync hasilnya ke store (draft/published).
 *
 * Hierarki:
 *   GraphQL server → Apollo Client → useQuery/useMutation (TanStack) → Pinia store → UI
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import { useApolloClient } from '@vue/apollo-composable'
import type { ProfileData, LinkItem, SocialLink } from '~/stores/profile'
import { useProfileStore } from '~/stores/profile'

// ─── GQL documents ───────────────────────────────────────────────────────────
// Satu file per operasi — Vite transform via vite-plugin-graphql-loader
// Fragment di-resolve otomatis lewat #import directive (graphql-tag compatible)
import GET_PUBLIC_PROFILE from '~/graphql/queries/getPublicProfile.gql'
import GET_ADMIN_PROFILE from '~/graphql/queries/getAdminProfile.gql'
import GET_ANALYTICS from '~/graphql/queries/getAnalytics.gql'
import UPDATE_PROFILE from '~/graphql/mutations/updateProfile.gql'
import ADD_LINK from '~/graphql/mutations/addLink.gql'
import UPDATE_LINK from '~/graphql/mutations/updateLink.gql'
import REMOVE_LINK from '~/graphql/mutations/removeLink.gql'
import REORDER_LINKS from '~/graphql/mutations/reorderLinks.gql'
import TOGGLE_VISIBILITY from '~/graphql/mutations/toggleVisibility.gql'
import TOGGLE_HIGHLIGHT from '~/graphql/mutations/toggleHighlight.gql'
import ADD_SOCIAL_LINK from '~/graphql/mutations/addSocialLink.gql'
import REMOVE_SOCIAL_LINK from '~/graphql/mutations/removeSocialLink.gql'
import RECORD_CLICK from '~/graphql/mutations/recordClick.gql'

// ─── Query Key factory ───────────────────────────────────────────────────────
// Satu tempat untuk semua cache keys — mudah di-invalidate secara tepat
export const profileKeys = {
  all: ['profiles'] as const,
  detail: (u: string) => ['profiles', u] as const,
  admin: () => ['profiles', 'me'] as const,
  analytics: (u: string) => ['profiles', u, 'analytics'] as const,
}

// ─── Helper: Apollo → Promise ────────────────────────────────────────────────
// Wrapper tipis agar Apollo bisa dipakai sebagai queryFn TanStack Query
function useApolloExecute() {
  const { client } = useApolloClient()
  return {
    query: <T>(doc: unknown, variables?: Record<string, unknown>) =>
      client
        .query<T>({ query: doc as never, variables, fetchPolicy: 'network-only' })
        .then(r => r.data),
    mutate: <T>(doc: unknown, variables?: Record<string, unknown>) =>
      client
        .mutate<T>({ mutation: doc as never, variables })
        .then(r => r.data as T),
  }
}

// ─── Response mapper ─────────────────────────────────────────────────────────
// Normalisasi GraphQL response ke shape ProfileData — fallback ke DEFAULT values
function mapToProfileData(raw: Record<string, unknown>): Partial<ProfileData> {
  return {
    username: (raw.username as string) ?? '',
    displayName: (raw.displayName as string) ?? '',
    bio: (raw.bio as string) ?? '',
    avatar: (raw.avatar as string) ?? '',
    accentColor: (raw.accentColor as string) ?? '#E23636',
    backgroundType: (raw.backgroundType as ProfileData['backgroundType']) ?? 'halftone',
    backgroundValue: (raw.backgroundValue as string) ?? '#E23636',
    isPublic: (raw.isPublic as boolean) ?? true,
    verifiedAt: raw.verifiedAt as string | undefined,
    totalClicks: (raw.totalClicks as number) ?? 0,
    socialLinks: (raw.socialLinks as SocialLink[]) ?? [],
    links: (raw.links as LinkItem[]) ?? [],
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// QUERIES
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Public profile — /pages/profile.vue
 * Hanya fetch visible links (difilter server), otomatis sync ke store.published
 */
export function usePublicProfileQuery(username: MaybeRef<string>) {
  const apollo = useApolloExecute()
  const store = useProfileStore()

  return useQuery({
    queryKey: computed(() => profileKeys.detail(unref(username))),
    queryFn: async () => {
      const data = await apollo.query<{ profile: { getByUsername: Record<string, unknown> } }>(
        GET_PUBLIC_PROFILE, { username: unref(username) },
      )
      const mapped = mapToProfileData(data.profile.getByUsername)
      // Sync ke published — halaman publik pakai published (bukan draft)
      store.hydratePublished(mapped)
      return mapped
    },
    enabled: computed(() => !!unref(username)),
    staleTime: 1000 * 60 * 5, // 5 menit
    gcTime: 1000 * 60 * 15, // 15 menit di cache
  })
}

/**
 * Admin profile — /pages/admin.vue
 * Semua links (visible + hidden), sync ke store.draft lewat discardDraft()
 */
export function useAdminProfileQuery() {
  const apollo = useApolloExecute()
  const store = useProfileStore()

  return useQuery({
    queryKey: profileKeys.admin(),
    queryFn: async () => {
      const data = await apollo.query<{ profile: { me: Record<string, unknown> } }>(
        GET_ADMIN_PROFILE,
      )
      const mapped = mapToProfileData(data.profile.me)
      // Update published dulu, lalu discardDraft() sync ke draft
      store.hydratePublished(mapped)
      store.discardDraft()
      return mapped
    },
    staleTime: 1000 * 30, // 30 detik — admin butuh lebih fresh
    gcTime: 1000 * 60 * 5,
  })
}

/**
 * Analytics — refetch interval 30 detik untuk live click count
 */
export function useAnalyticsQuery(username: MaybeRef<string>) {
  const apollo = useApolloExecute()

  return useQuery({
    queryKey: computed(() => profileKeys.analytics(unref(username))),
    queryFn: async () => {
      const data = await apollo.query<{ profile: { getByUsername: Record<string, unknown> } }>(
        GET_ANALYTICS, { username: unref(username) },
      )
      return data.profile.getByUsername as {
        totalClicks: number
        links: Array<{ id: string, title: string, clicks: number, createdAt: string }>
      }
    },
    enabled: computed(() => !!unref(username)),
    staleTime: 0, // always consider stale
    refetchInterval: 1000 * 30, // polling 30 detik
  })
}

// ═══════════════════════════════════════════════════════════════════════════
// MUTATIONS
// ═══════════════════════════════════════════════════════════════════════════

/**
 * saveProfile() — commit store.draft ke server
 * Menggantikan store.saveProfile() yang saat ini hanya delay simulasi
 */
export function useSaveProfileMutation() {
  const apollo = useApolloExecute()
  const store = useProfileStore()
  const qc = useQueryClient()

  return useMutation({
    mutationFn: async () => {
      const { links, socialLinks, ...rest } = store.draft
      const data = await apollo.mutate<{ profile: { update: Record<string, unknown> } }>(
        UPDATE_PROFILE,
        {
          input: {
            ...rest,
            // Strip client-only fields yang tidak perlu dikirim ke server
            links: links.map(({ id, title, url, description, emoji, isVisible,
              isHighlighted, style, customColor, order }) =>
              ({ id, title, url, description, emoji, isVisible, isHighlighted, style, customColor, order }),
            ),
            socialLinks: socialLinks.map(({ id, platform, url, label }) =>
              ({ id, platform, url, label }),
            ),
          },
        },
      )
      return mapToProfileData(data!.profile.update)
    },
    onSuccess: (updated) => {
      // Server response jadi sumber kebenaran — bukan draft
      store.hydratePublished(updated)
      store.discardDraft()
      qc.invalidateQueries({ queryKey: profileKeys.admin() })
    },
  })
}

/**
 * addLink() — optimistic: langsung tambah ke draft, server konfirmasi ID resmi
 */
export function useAddLinkMutation() {
  const apollo = useApolloExecute()
  const store = useProfileStore()

  return useMutation({
    mutationFn: async (link: Omit<LinkItem, 'id' | 'order' | 'clicks' | 'createdAt'>) => {
      const data = await apollo.mutate<{ link: { add: LinkItem } }>(ADD_LINK, { input: link })
      return data!.link.add
    },
    onMutate: (link) => {
      // Optimistic: tambah ke draft sebelum server balas
      store.addLink(link)
    },
    onSuccess: (serverLink) => {
      // Replace optimistic entry dengan ID + createdAt resmi dari server
      const draft = store.draft
      const idx = draft.links.findIndex(l =>
        l.title === serverLink.title && l.url === serverLink.url,
      )
      if (idx !== -1) draft.links[idx] = serverLink
    },
  })
}

/**
 * updateLink() — optimistic
 */
export function useUpdateLinkMutation() {
  const apollo = useApolloExecute()
  const store = useProfileStore()

  return useMutation({
    mutationFn: async ({ id, updates }: { id: string, updates: Partial<LinkItem> }) => {
      const data = await apollo.mutate<{ link: { update: LinkItem } }>(
        UPDATE_LINK, { id, input: updates },
      )
      return data!.link.update
    },
    onMutate: ({ id, updates }) => {
      store.updateLink(id, updates)
    },
    onSuccess: (serverLink) => {
      // Sync field yang mungkin dimodifikasi server
      store.updateLink(serverLink.id, serverLink)
    },
  })
}

/**
 * removeLink() — optimistic remove dari draft
 */
export function useRemoveLinkMutation() {
  const apollo = useApolloExecute()
  const store = useProfileStore()

  return useMutation({
    mutationFn: async (id: string) => {
      await apollo.mutate(REMOVE_LINK, { id })
      return id
    },
    onMutate: (id) => {
      store.removeLink(id)
    },
  })
}

/**
 * reorderLinks() — kirim array ID dengan urutan baru ke server
 */
export function useReorderLinksMutation() {
  const apollo = useApolloExecute()
  const store = useProfileStore()

  return useMutation({
    mutationFn: async (newOrder: LinkItem[]) => {
      await apollo.mutate(REORDER_LINKS, { ids: newOrder.map(l => l.id) })
      return newOrder
    },
    onMutate: (newOrder) => {
      store.reorderLinks(newOrder)
    },
  })
}

/**
 * toggleVisibility() — optimistic flip, server konfirmasi state final
 * Berguna kalau server punya logika limit (misal max 10 visible links)
 */
export function useToggleVisibilityMutation() {
  const apollo = useApolloExecute()
  const store = useProfileStore()

  return useMutation({
    mutationFn: async (id: string) => {
      const data = await apollo.mutate<{
        link: { toggleVisibility: { id: string, isVisible: boolean } }
      }>(TOGGLE_VISIBILITY, { id })
      return data!.link.toggleVisibility
    },
    onMutate: (id) => {
      store.toggleLinkVisibility(id)
    },
    onSuccess: ({ id, isVisible }) => {
      // Sync state resmi (server bisa override kalau ada batasan)
      store.updateLink(id, { isVisible })
    },
  })
}

/**
 * toggleHighlight()
 */
export function useToggleHighlightMutation() {
  const apollo = useApolloExecute()
  const store = useProfileStore()

  return useMutation({
    mutationFn: async (id: string) => {
      const data = await apollo.mutate<{
        link: { toggleHighlight: { id: string, isHighlighted: boolean } }
      }>(TOGGLE_HIGHLIGHT, { id })
      return data!.link.toggleHighlight
    },
    onMutate: (id) => {
      store.toggleLinkHighlight(id)
    },
    onSuccess: ({ id, isHighlighted }) => {
      store.updateLink(id, { isHighlighted })
    },
  })
}

/**
 * addSocialLink()
 */
export function useAddSocialLinkMutation() {
  const apollo = useApolloExecute()
  const store = useProfileStore()

  return useMutation({
    mutationFn: async (social: Omit<SocialLink, 'id'>) => {
      const data = await apollo.mutate<{ socialLink: { add: SocialLink } }>(
        ADD_SOCIAL_LINK, { input: social },
      )
      return data!.socialLink.add
    },
    onMutate: (social) => {
      store.addSocialLink(social)
    },
    onSuccess: (serverSocial) => {
      // Replace optimistic entry dengan ID resmi
      const draft = store.draft
      const idx = draft.socialLinks.findIndex(
        s => s.platform === serverSocial.platform && s.url === serverSocial.url,
      )
      if (idx !== -1) draft.socialLinks[idx] = serverSocial
    },
  })
}

/**
 * removeSocialLink()
 */
export function useRemoveSocialLinkMutation() {
  const apollo = useApolloExecute()
  const store = useProfileStore()

  return useMutation({
    mutationFn: async (id: string) => {
      await apollo.mutate(REMOVE_SOCIAL_LINK, { id })
      return id
    },
    onMutate: (id) => {
      store.removeSocialLink(id)
    },
  })
}

/**
 * recordClick() — fire-and-forget, tidak block navigasi
 * onMutate: optimistic increment di published langsung
 */
export function useRecordClickMutation() {
  const apollo = useApolloExecute()
  const store = useProfileStore()

  return useMutation({
    mutationFn: async (linkId: string) => {
      const data = await apollo.mutate<{
        analytics: { recordClick: { linkId: string, clicks: number } }
      }>(RECORD_CLICK, { linkId })
      return data!.analytics.recordClick
    },
    onMutate: (linkId) => {
      store.recordClick(linkId)
    },
    onSuccess: ({ linkId, clicks }) => {
      // Sync angka resmi dari server (bukan optimistic)
      const link = store.published.links.find(l => l.id === linkId)
      if (link) link.clicks = clicks
    },
  })
}
