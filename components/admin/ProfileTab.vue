<template>
  <div class="space-y-5">
    <div class="comic-panel p-6">
      <h2
        class="font-display text-2xl mb-5"
        style="color:var(--accent-primary);"
      >
        PROFILE INFO
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label class="font-comic font-bold text-xs block mb-1">Display Name</label>
          <input
            v-model="profile.displayName"
            class="input-comic"
            placeholder="Your name"
          />
        </div>
        <div>
          <label class="font-comic font-bold text-xs block mb-1">Username</label>
          <div class="flex items-center gap-1">
            <span
              class="font-comic font-bold"
              style="color:var(--text-muted);"
            >@</span>
            <input
              v-model="profile.username"
              class="input-comic flex-1"
              placeholder="username"
            />
          </div>
        </div>
      </div>
      <div class="mt-4">
        <label class="font-comic font-bold text-xs block mb-1">Bio</label>
        <textarea
          v-model="profile.bio"
          class="input-comic resize-none"
          rows="3"
          maxlength="200"
        />
        <p
          class="text-xs font-comic text-right mt-1"
          style="color:var(--text-muted);"
        >
          {{ profile.bio.length }}/200
        </p>
      </div>
      <div class="mt-4">
        <label class="font-comic font-bold text-xs block mb-1">Avatar URL</label>
        <input
          v-model="profile.avatar"
          class="input-comic"
          placeholder="https://..."
        />
      </div>
      <div class="mt-4 flex items-center gap-3">
        <input
          id="isPublic"
          v-model="profile.isPublic"
          type="checkbox"
          class="toggle-comic"
        />
        <label
          for="isPublic"
          class="font-comic font-bold text-sm cursor-pointer"
        >Profile is public</label>
      </div>
    </div>

    <div class="comic-panel p-6">
      <h2
        class="font-display text-2xl mb-5"
        style="color:var(--accent-primary);"
      >
        SOCIAL LINKS
      </h2>
      <div class="space-y-3 mb-4">
        <div
          v-for="social in profile.socialLinks"
          :key="social.id"
        >
          <div class="flex items-center gap-2">
            <!-- Icon -->
            <span
              class="w-8 flex-shrink-0 flex items-center justify-center"
              style="color:var(--accent-primary);"
            >
              <component
                :is="iconMap[social.platform as keyof typeof iconMap]"
                :size="24"
              />
            </span>

            <!-- Platform select -->
            <select
              v-model="social.platform"
              class="input-comic w-36 flex-shrink-0 text-sm"
            >
              <option
                v-for="p in SOCIAL_PLATFORMS"
                :key="p"
                :value="p"
              >
                {{ p }}
              </option>
            </select>

            <!-- URL input -->
            <input
              v-model="social.url"
              class="input-comic flex-1 text-sm"
              :class="socialErrors[social.id] ? 'border-red-500' : ''"
              placeholder="https://..."
              @blur="validateSocial(social.id, social.url)"
              @input="socialErrors[social.id] = ''"
            />

            <button
              class="btn-ghost px-2 py-2"
              @click="store.removeSocialLink(social.id)"
            >
              ❌
            </button>
          </div>

          <p
            v-if="socialErrors[social.id]"
            class="font-comic text-xs mt-1 ml-10"
            style="color:var(--color-error, #E23636);"
          >
            {{ socialErrors[social.id] }}
          </p>
        </div>
      </div>
      <button
        class="btn-ghost px-4 py-2 font-display text-base border-2 border-black"
        @click="store.addSocialLink({ platform: 'custom', url: '' })"
      >
        + Add Social
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Instagram, Facebook, Twitter, Music as Tiktok, AudioLines as Spotify, Youtube, Github, Linkedin, Mic as Discord, Twitch, Mail as Gmail, Link2 as Custom,
} from 'lucide-vue-next'
import { SOCIAL_PLATFORMS } from '~/composables/useLinkStyles'
import { useProfileStore } from '~/stores/profile'

const iconMap = markRaw({ Instagram, Facebook, Twitter, Tiktok, Spotify, Youtube, Github, Linkedin, Discord, Twitch, Gmail, Custom })

const store = useProfileStore()
const { profile } = storeToRefs(store)

const socialErrors = ref<Record<string, string>>({})

function validateSocial(id: string, url: string) {
  if (!url || !url.trim()) {
    socialErrors.value[id] = 'URL tidak boleh kosong'
    return false
  }
  if (!url.startsWith('http://') && !url.startsWith('https://') && !url.startsWith('mailto:')) {
    socialErrors.value[id] = 'URL harus diawali https://'
    return false
  }
  socialErrors.value[id] = ''
  return true
}
</script>
