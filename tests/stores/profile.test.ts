import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useProfileStore } from '~/stores/profile'

describe('useProfileStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('initializes with default profile', () => {
    const store = useProfileStore()
    expect(store.profile.username).toBe('nolep')
    expect(store.profile.displayName).toBe('John Doe')
    expect(store.profile.links.length).toBeGreaterThan(0)
  })

  it('adds a new link', () => {
    const store = useProfileStore()
    const initialCount = store.profile.links.length
    store.addLink({
      title: 'Test Link',
      url: 'https://test.com',
      isVisible: true,
      isHighlighted: false,
      style: 'default',
    })
    expect(store.profile.links.length).toBe(initialCount + 1)
  })

  it('removes a link', () => {
    const store = useProfileStore()
    const linkId = store.profile.links[0].id
    const initialCount = store.profile.links.length
    store.removeLink(linkId)
    expect(store.profile.links.length).toBe(initialCount - 1)
    expect(store.profile.links.find(l => l.id === linkId)).toBeUndefined()
  })

  it('toggles link visibility', () => {
    const store = useProfileStore()
    const link = store.profile.links[0]
    const initialVisibility = link.isVisible
    store.toggleLinkVisibility(link.id)
    expect(store.profile.links[0].isVisible).toBe(!initialVisibility)
  })

  it('records click increments count', () => {
    const store = useProfileStore()
    const link = store.profile.links[0]
    const initialClicks = link.clicks
    store.recordClick(link.id)
    expect(store.profile.links[0].clicks).toBe(initialClicks + 1)
  })

  it('computes visible links correctly', () => {
    const store = useProfileStore()
    const visibleCount = store.profile.links.filter(l => l.isVisible).length
    expect(store.visibleLinks.length).toBe(visibleCount)
  })

  it('marks profile as dirty after update', () => {
    const store = useProfileStore()
    expect(store.isDirty).toBe(false)
    store.updateProfile({ displayName: 'New Name' })
    expect(store.isDirty).toBe(true)
  })

  it('reorders links correctly', () => {
    const store = useProfileStore()
    const links = [...store.allLinks].reverse()
    store.reorderLinks(links)
    expect(store.profile.links[0].order).toBe(0)
  })
})
