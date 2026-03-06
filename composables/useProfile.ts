import { useQuery, useMutation } from '@tanstack/vue-query'

// ─── Types ────────────────────────────────────────────────
interface ProfileResponse {
  username: string
  displayName: string
  bio: string
  avatar: string
  links: Array<{
    id: string
    title: string
    url: string
    clicks: number
  }>
}

// ─── Query Keys ───────────────────────────────────────────
export const profileKeys = {
  all: ['profiles'] as const,
  detail: (username: string) => [...profileKeys.all, username] as const,
  analytics: (username: string) => [...profileKeys.detail(username), 'analytics'] as const,
}

// ─── Fetch Profile via REST (fallback when no GraphQL) ────
async function fetchProfile(username: string): Promise<ProfileResponse> {
  // Replace with actual API call or Apollo query
  const response = await $fetch<ProfileResponse>(`/api/profiles/${username}`)
  return response
}

async function updateProfileApi(data: Partial<ProfileResponse>) {
  return await $fetch('/api/profiles/me', { method: 'PUT', body: data })
}

// ─── Composables ──────────────────────────────────────────

/**
 * Fetch a public profile by username
 * Uses TanStack Query for caching & background refetch
 */
export function useProfileQuery(username: MaybeRef<string>) {
  return useQuery({
    queryKey: computed(() => profileKeys.detail(unref(username))),
    queryFn: () => fetchProfile(unref(username)),
    enabled: computed(() => !!unref(username)),
    staleTime: 1000 * 60 * 5, // 5min
  })
}

/**
 * Update profile mutation
 */
export function useUpdateProfileMutation() {
  return useMutation({
    mutationFn: updateProfileApi,
  })
}

/**
 * Track a link click
 */
export function useTrackClick() {
  return useMutation({
    mutationFn: async (linkId: string) => {
      await $fetch(`/api/links/${linkId}/click`, { method: 'POST' })
    },
  })
}
