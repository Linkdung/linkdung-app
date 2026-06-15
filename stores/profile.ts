import { defineStore } from 'pinia'

export interface SocialLink {
  id: string
  platform: 'Instagram' | 'Twitter' | 'Youtube' | 'Facebook' | 'LinkedIn' | 'GitHub' | string
  url: string
  label?: string
}

export interface LinkItem {
  id: string
  title: string
  url: string
  description?: string
  icon?: string
  emoji?: string
  thumbnail?: string
  isVisible: boolean
  isHighlighted: boolean
  style: 'default' | 'red' | 'blue' | 'yellow' | 'dark' | 'custom'
  customColor?: string
  order: number
  clicks: number
  createdAt: string
}

export interface ProfileData {
  username: string
  displayName: string
  bio: string
  avatar: string
  backgroundType: 'halftone' | 'web' | 'gradient' | 'solid' | 'custom'
  backgroundValue: string
  accentColor: string
  socialLinks: SocialLink[]
  links: LinkItem[]
  isPublic: boolean
  verifiedAt?: string
  totalClicks: number
}

// [CHANGE] deepClone helper — agar draft & published tidak share referensi object
function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj))
}

const DEFAULT_PROFILE: ProfileData = {
  username: 'nolep',
  displayName: 'John Doe',
  bio: 'Friendly Adit. City represent! Into Developer.',
  avatar: '',
  backgroundType: 'halftone',
  backgroundValue: '#E23636',
  accentColor: '#E23636',
  socialLinks: [
    { id: 'sl-1', platform: 'Instagram', url: 'https://instagram.com/nolep' },
    { id: 'sl-2', platform: 'Twitter', url: 'https://twitter.com/nolep' },
    { id: 'sl-3', platform: 'Youtube', url: 'https://youtube.com/@nolep' },
  ],
  links: [
    {
      id: 'link-1', title: 'My Art Portfolio', url: 'https://example.com/art',
      description: 'Check out my latest graffiti art', emoji: '🎨',
      isVisible: true, isHighlighted: true, style: 'red', order: 0, clicks: 247, createdAt: new Date().toISOString(),
    },
    {
      id: 'link-2', title: 'Adit Merch', url: 'https://example.com/merch',
      description: 'Official Adit gear', emoji: '🛍️',
      isVisible: true, isHighlighted: false, style: 'blue', order: 1, clicks: 153, createdAt: new Date().toISOString(),
    },
    {
      id: 'link-3', title: 'My Spotify Playlist', url: 'https://spotify.com',
      description: 'What I listen to while i sell merch', emoji: '🎵',
      isVisible: true, isHighlighted: false, style: 'default', order: 2, clicks: 89, createdAt: new Date().toISOString(),
    },
    {
      id: 'link-4', title: 'Latest YouTube Video', url: 'https://youtube.com',
      description: 'Training montage', emoji: '📺',
      isVisible: false, isHighlighted: false, style: 'yellow', order: 3, clicks: 34, createdAt: new Date().toISOString(),
    },
  ],
  isPublic: true,
  totalClicks: 0,
}

export const useProfileStore = defineStore('profile', () => {
  // [CHANGE] Sebelum: satu `profile` ref yang langsung dimutasi admin.
  // Sekarang dipisah:
  //   published = data final, dipakai /profile publik, di-persist ke localStorage
  //   draft     = copy kerja admin, belum tersimpan sampai saveProfile()
  const published = ref<ProfileData>(deepClone(DEFAULT_PROFILE))
  const draft = ref<ProfileData>(deepClone(DEFAULT_PROFILE))

  const isLoading = ref(false)

  // [CHANGE] isDirty dulu di-set manual di setiap mutasi.
  // Sekarang computed otomatis — JSON.stringify compare draft vs published.
  const isDirty = computed(() =>
    JSON.stringify(draft.value) !== JSON.stringify(published.value),
  )

  // [CHANGE] profile sekarang computed dari published.
  // Halaman /profile tidak berubah saat admin mengedit, sampai Save ditekan.
  const profile = computed(() => published.value)

  // visibleLinks & totalClicks dari published (data publik final)
  const visibleLinks = computed(() =>
    published.value.links.filter(l => l.isVisible).sort((a, b) => a.order - b.order),
  )
  const totalClicks = computed(() =>
    published.value.links.reduce((s, l) => s + l.clicks, 0),
  )

  // [CHANGE] allLinks dari draft — admin melihat & mengedit draft
  const allLinks = computed(() =>
    [...draft.value.links].sort((a, b) => a.order - b.order),
  )

  // [CHANGE] Semua mutasi di bawah hanya menyentuh draft, BUKAN published.
  // Tidak perlu isDirty.value = true — computed mendeteksi otomatis.

  function addLink(link: Omit<LinkItem, 'id' | 'order' | 'clicks' | 'createdAt'>) {
    draft.value.links.push({
      ...link,
      id: `link-${Date.now()}`,
      order: draft.value.links.length,
      clicks: 0,
      createdAt: new Date().toISOString(),
    })
  }

  function updateLink(id: string, updates: Partial<LinkItem>) {
    const idx = draft.value.links.findIndex(l => l.id === id)
    if (idx !== -1)
      draft.value.links[idx] = { ...draft.value.links[idx], ...updates }
  }

  function removeLink(id: string) {
    draft.value.links = draft.value.links.filter(l => l.id !== id)
    reorderLinks()
  }

  function reorderLinks(newOrder?: LinkItem[]) {
    const src = newOrder ?? draft.value.links
    draft.value.links = src.map((l, i) => ({ ...l, order: i }))
  }

  function toggleLinkVisibility(id: string) {
    const l = draft.value.links.find(l => l.id === id)
    if (l) l.isVisible = !l.isVisible
  }

  function toggleLinkHighlight(id: string) {
    const l = draft.value.links.find(l => l.id === id)
    if (l) l.isHighlighted = !l.isHighlighted
  }

  function addSocialLink(social: Omit<SocialLink, 'id'>) {
    draft.value.socialLinks.push({ ...social, id: `sl-${Date.now()}` })
  }

  function removeSocialLink(id: string) {
    draft.value.socialLinks = draft.value.socialLinks.filter(s => s.id !== id)
  }

  function updateProfile(updates: Partial<ProfileData>) {
    // Legacy compat untuk useAccentColor composable (sync ke keduanya)
    if (updates.accentColor) {
      published.value.accentColor = updates.accentColor
      draft.value.accentColor = updates.accentColor
    }
  }

  // [CHANGE] Merge data dari server ke published — dipakai composable useProfile.
  // Mutasi via action (akses `published.value` di dalam store = benar), bukan
  // `store.published.value = …` dari luar (di setup store ref sudah di-unwrap → bug).
  function hydratePublished(data: Partial<ProfileData>) {
    published.value = { ...published.value, ...data }
  }

  // [CHANGE] Fungsi baru: preview accent di draft + CSS vars, tanpa sentuh published
  function previewAccentColor(hex: string) {
    draft.value.accentColor = hex
  }

  // [CHANGE] saveProfile: commit draft → published (deepClone agar tidak share ref)
  async function saveProfile() {
    isLoading.value = true
    try {
      await new Promise(r => setTimeout(r, 700))
      published.value = deepClone(draft.value)
    }
    finally {
      isLoading.value = false
    }
  }

  // [CHANGE] Fungsi baru: reset draft kembali ke published (tombol Discard)
  function discardDraft() {
    draft.value = deepClone(published.value)
  }

  // recordClick langsung ke published — tidak butuh save
  function recordClick(id: string) {
    const l = published.value.links.find(l => l.id === id)
    if (l) l.clicks++
  }

  return {
    // [CHANGE] draft & published kini di-expose
    draft, published,
    isLoading, isDirty,
    profile, visibleLinks, totalClicks, allLinks,
    addLink, updateLink, removeLink, reorderLinks,
    toggleLinkVisibility, toggleLinkHighlight,
    recordClick, updateProfile, hydratePublished,
    addSocialLink, removeSocialLink,
    previewAccentColor, saveProfile, discardDraft,
  }
}, {
  persist: {
    key: 'linkdung-profile',
    storage: import.meta.client ? localStorage : undefined,
    // [CHANGE] Hanya persist published — draft tidak disimpan ke localStorage
    pick: ['published'],
  },
})
