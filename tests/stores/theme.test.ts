import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useThemeStore } from '~/stores/theme'

describe('useThemeStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('starts with light theme by default', () => {
    const store = useThemeStore()
    expect(store.isDark).toBe(false)
    expect(store.currentTheme).toBe('light')
  })

  it('toggles theme', () => {
    const store = useThemeStore()
    store.toggleTheme()
    expect(store.isDark).toBe(true)
    expect(store.currentTheme).toBe('dark')
    store.toggleTheme()
    expect(store.isDark).toBe(false)
  })

  it('sets specific theme', () => {
    const store = useThemeStore()
    store.setTheme('dark')
    expect(store.isDark).toBe(true)
    store.setTheme('light')
    expect(store.isDark).toBe(false)
  })
})
