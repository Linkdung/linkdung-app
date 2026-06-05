/**
 * useLinkStyles — konstanta card styles yang dipakai di AddLinkForm,
 * LinkCard, dan profile page. DRY: definisi cukup satu tempat.
 */
export const CARD_STYLES = [
  { value: 'default', label: 'White', bg: '#FFFFFF', text: '#0A0A0A' },
  { value: 'red', label: 'Red', bg: '#E23636', text: '#F5F5F0' },
  { value: 'blue', label: 'Blue', bg: '#1A3A6B', text: '#F5F5F0' },
  { value: 'yellow', label: 'Yellow', bg: '#FFD700', text: '#0A0A0A' },
  { value: 'dark', label: 'Dark', bg: '#0A0A0A', text: '#F5F5F0' },
] as const

export type CardStyleValue = typeof CARD_STYLES[number]['value'] | 'custom'

export function getLinkBg(link: { style: string, customColor?: string }): string {
  if (link.style === 'custom') return link.customColor || '#FFFFFF'
  return CARD_STYLES.find(s => s.value === link.style)?.bg || '#FFFFFF'
}

export function getLinkTextColor(link: { style: string, customColor?: string }): string {
  if (link.style === 'custom') {
    const bg = link.customColor || '#FFFFFF'
    const h = bg.replace('#', '')
    const f = h.length === 3 ? h.split('').map(c => c + c).join('') : h
    const lum = 0.299 * (parseInt(f.slice(0, 2), 16) / 255) + 0.587 * (parseInt(f.slice(2, 4), 16) / 255) + 0.114 * (parseInt(f.slice(4, 6), 16) / 255)
    return lum > 0.5 ? '#0A0A0A' : '#F5F5F0'
  }
  return CARD_STYLES.find(s => s.value === link.style)?.text || '#0A0A0A'
}

export const SOCIAL_PLATFORMS = ['Instagram', 'Facebook', 'Twitter', 'Tiktok', 'Spotify', 'Youtube', 'Github', 'Linkedin', 'Discord', 'Twitch', 'Gmail', 'Custom']

export const SOCIAL_EMOJI: Record<string, string> = {
  instagram: '📸', twitter: '𝕏', tiktok: '🎵', youtube: '▶️',
  facebook: '👤', linkedin: '💼', github: '🐙', twitch: '🟣',
  discord: '💬', email: '✉️', custom: '🔗',
}

export const EMOJI_CATEGORIES = [
  { name: 'popular', icon: '⭐', label: 'Top', emojis: ['🔗', '🌐', '📱', '💻', '🎨', '🎵', '🎥', '📸', '✍️', '📚', '🛒', '💼', '🚀', '❤️', '🔥', '💡', '🎯', '🏆', '🎁', '💬', '📧', '📞', '🔔', '⚡', '🌟', '🌐', '😎'] },
  { name: 'social', icon: '📲', label: 'Social', emojis: ['📸', '🐦', '▶️', '🎵', '👤', '💼', '🐙', '🟣', '💬', '✉️', '📡', '🤳', '📢', '📣', '🗣️', '💭', '📲', '🌐'] },
  { name: 'business', icon: '💼', label: 'Work', emojis: ['💼', '📊', '📈', '📉', '💰', '💳', '🏦', '🤝', '📋', '📌', '📎', '🗂️', '💡', '🔑', '🏢', '⚙️', '🛠️', '📐', '🎓', '📜'] },
  { name: 'creative', icon: '🎨', label: 'Art', emojis: ['🎨', '✏️', '📝', '🖌️', '🎭', '🎬', '🎤', '🎧', '🥁', '🎸', '🎹', '📷', '🖼️', '✨', '🌈', '💎', '🌸', '🎪', '🎡'] },
  { name: 'fun', icon: '🎉', label: 'Fun', emojis: ['🎉', '🎊', '🥳', '😎', '🤩', '🔥', '💫', '⚡', '🌊', '🌴', '🏖️', '🎮', '🕹️', '🎲', '🃏', '🎯', '🏆', '🥇', '🦄', '🐉'] },
]

export const ACCENT_COLORS = [
  { value: '#E23636', label: ' Red' },
  { value: '#1A3A6B', label: ' Blue' },
  { value: '#2563EB', label: 'Bright Blue' },
  { value: '#FFD700', label: 'Gold' },
  { value: '#FF2D78', label: ' Pink' },
  { value: '#7B2FBE', label: 'Purple' },
  { value: '#00D4FF', label: ' Cyan' },
  { value: '#16A34A', label: 'Green' },
  { value: '#F97316', label: ' Orange' },
  { value: '#0A0A0A', label: 'Ink Black' },
]
