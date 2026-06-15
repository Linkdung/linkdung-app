/**
 * useAccentColor — Single source of truth untuk primary accent color.
 *
 * CSS vars di-set ke :root sebagai inline style (highest specificity),
 * sehingga override .dark class dan berlaku global di semua mode.
 */
import { useProfileStore } from '~/stores/profile'

export function useAccentColor() {
  const profileStore = useProfileStore()
  const accentColor = computed(() => profileStore.profile.accentColor || '#E23636')

  function applyAccentColor(hex: string) {
    if (!/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(hex)) return
    profileStore.updateProfile({ accentColor: hex })
    _setCssVars(hex)
  }

  function initAccentColor() {
    if (!import.meta.client) return
    _setCssVars(profileStore.profile.accentColor || '#E23636')
  }

  return { accentColor, applyAccentColor, initAccentColor }
}

export function _setCssVars(hex: string) {
  if (!import.meta.client) return
  const root = document.documentElement
  // Only set accent vars — shadow-color stays black (light) / handled by .dark CSS (dark)
  root.style.setProperty('--accent-primary', hex)
  root.style.setProperty('--color-accent', hex)
  root.style.setProperty('--halftone-color', _rgba(hex, 0.08))
  root.style.setProperty('--accent-dark', _darken(hex, 25))
}

export function _rgba(hex: string, alpha: number): string {
  const h = hex.replace('#', '')
  const f = h.length === 3 ? h.split('').map(c => c + c).join('') : h
  return `rgba(${parseInt(f.slice(0, 2), 16)},${parseInt(f.slice(2, 4), 16)},${parseInt(f.slice(4, 6), 16)},${alpha})`
}

export function _darken(hex: string, amt: number): string {
  const h = hex.replace('#', '')
  const f = h.length === 3 ? h.split('').map(c => c + c).join('') : h
  const c = (n: number) => Math.max(0, n - amt).toString(16).padStart(2, '0')
  return `#${c(parseInt(f.slice(0, 2), 16))}${c(parseInt(f.slice(2, 4), 16))}${c(parseInt(f.slice(4, 6), 16))}`
}

export function _luminance(hex: string): number {
  const h = hex.replace('#', '')
  const f = h.length === 3 ? h.split('').map(c => c + c).join('') : h
  return 0.299 * (parseInt(f.slice(0, 2), 16) / 255) + 0.587 * (parseInt(f.slice(2, 4), 16) / 255) + 0.114 * (parseInt(f.slice(4, 6), 16) / 255)
}
