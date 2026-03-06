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
  customColor?: string // used when style === 'custom'
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

export const useProfileStore = defineStore('profile', () => {
  const profile = ref<ProfileData>({
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
        description: 'Official Adit gear', emoji: '🕷️',
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
  })

  const isLoading = ref(false)
  const isDirty = ref(false)

  const visibleLinks = computed(() =>
    profile.value.links.filter(l => l.isVisible).sort((a, b) => a.order - b.order),
  )
  const allLinks = computed(() =>
    [...profile.value.links].sort((a, b) => a.order - b.order),
  )
  const totalClicks = computed(() =>
    profile.value.links.reduce((s, l) => s + l.clicks, 0),
  )

  function addLink(link: Omit<LinkItem, 'id' | 'order' | 'clicks' | 'createdAt'>) {
    profile.value.links.push({
      ...link,
      id: `link-${Date.now()}`,
      order: profile.value.links.length,
      clicks: 0,
      createdAt: new Date().toISOString(),
    })
    isDirty.value = true
  }

  function updateLink(id: string, updates: Partial<LinkItem>) {
    const idx = profile.value.links.findIndex(l => l.id === id)
    if (idx !== -1) {
      profile.value.links[idx] = { ...profile.value.links[idx], ...updates }
      isDirty.value = true
    }
  }

  function removeLink(id: string) {
    profile.value.links = profile.value.links.filter(l => l.id !== id)
    reorderLinks()
    isDirty.value = true
  }

  function reorderLinks(newOrder?: LinkItem[]) {
    const src = newOrder ?? profile.value.links
    profile.value.links = src.map((l, i) => ({ ...l, order: i }))
    isDirty.value = true
  }

  function toggleLinkVisibility(id: string) {
    const l = profile.value.links.find(l => l.id === id)
    if (l) { l.isVisible = !l.isVisible; isDirty.value = true }
  }

  function toggleLinkHighlight(id: string) {
    const l = profile.value.links.find(l => l.id === id)
    if (l) { l.isHighlighted = !l.isHighlighted; isDirty.value = true }
  }

  function recordClick(id: string) {
    const l = profile.value.links.find(l => l.id === id)
    if (l) l.clicks++
  }

  function updateProfile(updates: Partial<ProfileData>) {
    profile.value = { ...profile.value, ...updates }
    isDirty.value = true
  }

  function addSocialLink(social: Omit<SocialLink, 'id'>) {
    profile.value.socialLinks.push({ ...social, id: `sl-${Date.now()}` })
    isDirty.value = true
  }

  function removeSocialLink(id: string) {
    profile.value.socialLinks = profile.value.socialLinks.filter(s => s.id !== id)
    isDirty.value = true
  }

  async function saveProfile() {
    isLoading.value = true
    try {
      await new Promise(r => setTimeout(r, 700))
      isDirty.value = false
    }
    finally {
      isLoading.value = false
    }
  }

  return {
    profile, isLoading, isDirty,
    visibleLinks, allLinks, totalClicks,
    addLink, updateLink, removeLink, reorderLinks,
    toggleLinkVisibility, toggleLinkHighlight,
    recordClick, updateProfile,
    addSocialLink, removeSocialLink, saveProfile,
  }
}, {
  persist: {
    key: 'linkdung-profile',
    storage: import.meta.client ? localStorage : undefined,
  },
})
