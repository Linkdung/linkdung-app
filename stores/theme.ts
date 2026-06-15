import { defineStore } from 'pinia'

export type Theme = 'light' | 'dark'

export const useThemeStore = defineStore('theme', () => {
  const isDark = ref(false)

  function initTheme() {
    if (import.meta.client) {
      const saved = localStorage.getItem('linkdung-theme')
      if (saved) {
        isDark.value = saved === 'dark'
      }
      else {
        isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
      }
    }
  }

  function toggleTheme() {
    isDark.value = !isDark.value
    if (import.meta.client) {
      localStorage.setItem('linkdung-theme', isDark.value ? 'dark' : 'light')
    }
  }

  function setTheme(theme: Theme) {
    isDark.value = theme === 'dark'
    if (import.meta.client) {
      localStorage.setItem('linkdung-theme', theme)
    }
  }

  const currentTheme = computed<Theme>(() => isDark.value ? 'dark' : 'light')

  return { isDark, currentTheme, initTheme, toggleTheme, setTheme }
}, {
  persist: {
    key: 'linkdung-theme',
    storage: import.meta.client ? localStorage : undefined,
    pick: ['isDark'],
  },
})
