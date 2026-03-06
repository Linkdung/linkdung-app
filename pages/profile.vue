<template>
  <div class="min-h-screen py-10 px-4">
    <div class="max-w-lg mx-auto">
      <!-- Profile Header -->
      <div class="text-center mb-8 animate-pop-in">
        <div class="relative inline-block mb-4">
          <div
            class="w-28 h-28 avatar-comic mx-auto overflow-hidden flex items-center justify-center text-5xl font-bold text-white"
            style="background:var(--accent-primary);"
          >
            <span v-if="!profile.avatar">{{ profile.displayName.charAt(0) }}</span>
            <img
              v-else
              :src="profile.avatar"
              :alt="profile.displayName"
              class="w-full h-full object-cover"
            />
          </div>
          <span class="absolute -bottom-1 -right-1 text-2xl float-anim">😎</span>
        </div>
        <h1
          class="font-display text-4xl tracking-wide mb-1"
          style="color:var(--text-primary); text-shadow:3px 3px 0 var(--accent-primary);"
        >
          {{ profile.displayName }}
        </h1>
        <p
          class="font-comic text-sm mb-3"
          style="color:var(--text-muted);"
        >
          @{{ profile.username }}
        </p>
        <div class="speech-bubble text-left inline-block max-w-sm mx-auto mb-2">
          <p
            class="font-comic text-sm"
            style="color:var(--text-primary);"
          >
            {{ profile.bio }}
          </p>
        </div>
        <div class="flex justify-center gap-3 mt-6 flex-wrap">
          <a
            v-for="social in validSocialLinks"
            :key="social.id"
            :href="social.url"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-ghost px-3 py-2 text-xl glitch-hover"
          >
            <ClientOnly>
              <component
                :is="iconMap[social.platform as keyof typeof iconMap]"
                :size="24"
                class="inline-block"
              />
            </ClientOnly>
          </a>
        </div>
      </div>

      <!-- Action Banner -->
      <div class="text-center mb-6">
        <span
          class="action-text text-5xl"
          style="color:var(--accent-primary); text-shadow:3px 3px 0 #0A0A0A;"
        >
          MY LINKS!
        </span>
      </div>

      <!-- Link Cards — fully inline style so color changes are immediately reactive -->
      <ClientOnly>
        <TransitionGroup
          name="link-list"
          tag="div"
          class="flex flex-col gap-4"
        >
          <a
            v-for="link in visibleLinks"
            :key="link.id"
            :href="link.url"
            target="_blank"
            rel="noopener noreferrer"
            class="no-underline"
            :style="getLinkStyle(link)"
            @click="profileStore.recordClick(link.id)"
          >
            <span class="text-2xl flex-shrink-0">{{ link.emoji || '🔗' }}</span>
            <div class="flex-1 min-w-0">
              <div class="font-display text-xl tracking-wide leading-tight truncate">{{ link.title }}</div>
              <div
                v-if="link.description"
                class="font-comic text-xs mt-0.5 opacity-75 truncate"
              >{{ link.description }}</div>
            </div>
            <span class="text-xl flex-shrink-0 opacity-60">→</span>
          </a>
        </TransitionGroup>
      </ClientOnly>

      <div
        v-if="visibleLinks.length === 0"
        class="comic-panel p-8 text-center mt-4"
      >
        <p
          class="action-text text-3xl mb-2"
          style="color:var(--accent-primary);"
        >
          NOTHING HERE!
        </p>
        <p
          class="font-comic"
          style="color:var(--text-muted);"
        >
          No links added yet.
        </p>
      </div>

      <div
        class="mt-8 text-center font-comic text-xl"
        style="color:var(--text-muted);"
      >
        <span
          class="action-text text-3xl mr-2"
          style="color:#FFD700;"
        >{{ totalClicks }}</span> total clicks
      </div>
      <div class="mt-6 text-center bottom-0 fixed left-1/2 transform -translate-x-1/2 mb-4 glitch-hover -z-10">
        <NuxtLink
          to="/"
          class="font-comic text-2xl no-underline"
          style="color:var(--text-muted);"
        >
          Made with <span style="color:var(--accent-primary);">Linkdung</span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Instagram, Facebook, Twitter, Music as Tiktok, AudioLines as Spotify, Youtube, Github, Linkedin, Mic as Discord, Twitch, Mail as Gmail, Link2 as Custom,
} from 'lucide-vue-next'
import { getLinkBg, getLinkTextColor } from '~/composables/useLinkStyles'
import { useProfileStore } from '~/stores/profile'
import { useAccentColor } from '~/composables/useAccentColor'
import type { LinkItem } from '~/stores/profile'

const iconMap = markRaw({ Instagram, Facebook, Twitter, Tiktok, Spotify, Youtube, Github, Linkedin, Discord, Twitch, Gmail, Custom })

const profileStore = useProfileStore()
const { profile, visibleLinks, totalClicks } = storeToRefs(profileStore)
const { initAccentColor } = useAccentColor()

onMounted(() => initAccentColor())

useHead({
  title: computed(() => `${profile.value.displayName} | Linkdung`),
  meta: [{ name: 'description', content: computed(() => profile.value.bio) }],
})

// Social links: hanya tampilkan yang punya URL valid
const validSocialLinks = computed(() =>
  profile.value.socialLinks.filter(s => s.url && s.url.trim().length > 0),
)

// Full inline style — reactive terhadap setiap perubahan warna, tidak ada CSS class override
function getLinkStyle(link: LinkItem): string {
  const bg = getLinkBg(link)
  const color = getLinkTextColor(link)
  // Ring color: pakai accent-primary untuk default/white card, pakai warna card itu sendiri untuk yang lain
  const ringColor = (link.style === 'default' && !link.customColor) ? 'var(--accent-primary)' : bg
  const highlight = link.isHighlighted
    ? `outline: 3px solid ${ringColor}; outline-offset: 4px;`
    : ''
  return [
    `display:flex; align-items:center; gap:1rem;`,
    `width:100%; padding:1rem 1.5rem;`,
    `font-family:'Bangers',Impact,sans-serif; font-size:1.35rem; letter-spacing:0.05em;`,
    `cursor:pointer; border-radius:4px; border:3px solid #000;`,
    `transition:transform 0.15s cubic-bezier(0.175,0.885,0.32,1.275), box-shadow 0.15s ease;`,
    `background:${bg}; color:${color};`,
    `box-shadow:6px 6px 0 #000;`,
    highlight,
  ].filter(Boolean).join(' ')
}
</script>
