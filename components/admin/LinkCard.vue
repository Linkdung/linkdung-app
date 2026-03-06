<template>
  <div class="comic-panel p-3 flex items-start gap-3 transition-opacity duration-200"
    :class="{ 'opacity-40': !link.isVisible }">
    <span class="w-5 h-5 flex-shrink-0 mt-2 border-2 border-black" :style="{ background: getLinkBg(link) }" />
    <span class="text-2xl flex-shrink-0">{{ link.emoji || '🔗' }}</span>

    <div class="flex-1 min-w-0 space-y-1">
      <!-- Title with validation -->
      <div>
        <input v-model="localTitle" class="input-comic text-sm py-1 font-display tracking-wide w-full"
          :class="titleError ? 'border-red-500' : ''" placeholder="Link Title (required)" @blur="saveTitle"
          @keydown.enter="saveTitle" />
        <p v-if="titleError" class="font-comic text-xs" style="color:var(--color-error, #E23636);">{{ titleError }}</p>
      </div>
      <!-- URL with validation -->
      <div>
        <input v-model="localUrl" class="input-comic text-xs py-1 w-full" :class="urlError ? 'border-red-500' : ''"
          placeholder="https://... (required)" @blur="saveUrl" @keydown.enter="saveUrl" />
        <p v-if="urlError" class="font-comic text-xs" style="color:var(--color-error, #E23636);">{{ urlError }}</p>
      </div>

      <!-- Style dots + custom color -->
      <div class="flex items-center gap-1.5 flex-wrap">
        <button v-for="style in CARD_STYLES" :key="style.value" :title="style.label"
          class="w-4 h-4 border-2 border-black hover:scale-125 transition-transform" :style="{
            background: style.bg,
            outline: link.style === style.value ? '2px solid var(--accent-primary)' : 'none',
            outlineOffset: '1px',
          }" @click="store.updateLink(link.id, { style: style.value, customColor: undefined })" />
        <input type="color" :value="link.customColor || '#FFFFFF'"
          class="w-4 h-4 border-1 border-black cursor-pointer p-0" :style="{
            outline: link.style === 'custom' ? '2px solid var(--accent-primary)' : 'none',
            outlineOffset: '1px',
          }" title="Custom color"
          @input="(e) => store.updateLink(link.id, { style: 'custom', customColor: (e.target as HTMLInputElement).value })" />
        <span class="font-comic text-xs" style="color:var(--text-muted);">{{ link.clicks }} clicks</span>
      </div>
    </div>

    <!-- Actions -->
    <div class="flex flex-col gap-1 flex-shrink-0">
      <button class="btn-ghost px-2 py-1 text-base leading-none" :title="link.isVisible ? 'Hide' : 'Show'"
        @click="store.toggleLinkVisibility(link.id)">
        <IconEye :size="18" v-if="link.isVisible" />
        <IconEyeClosed :size="18" v-else />
      </button>
      <button class="btn-ghost px-2 py-1 text-base leading-none"
        :title="link.isHighlighted ? 'Remove highlight' : 'Highlight'" @click="store.toggleLinkHighlight(link.id)">
        <IconStar :size="18" v-if="link.isHighlighted" fill="#facc15" stroke="0" />

        <IconStar :size="18" v-else stroke="0" />
      </button>
      <button class="btn-ghost px-2 py-1 text-base leading-none" @click="$emit('delete', link.id, link.title)">
        <IconTrash2 :size="18" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CARD_STYLES, getLinkBg } from '~/composables/useLinkStyles'
import { useProfileStore } from '~/stores/profile'
import type { LinkItem } from '~/stores/profile'

const props = defineProps<{ link: LinkItem }>()
defineEmits<{ delete: [id: string, title: string] }>()

const store = useProfileStore()

// Local copies for validation before saving
const localTitle = ref(props.link.title)
const localUrl = ref(props.link.url)
const titleError = ref('')
const urlError = ref('')

// Sync if store changes from outside
watch(() => props.link.title, v => { localTitle.value = v })
watch(() => props.link.url, v => { localUrl.value = v })

function saveTitle() {
  if (!localTitle.value.trim()) {
    titleError.value = 'Title tidak boleh kosong'
    localTitle.value = props.link.title // revert
    return
  }
  titleError.value = ''
  store.updateLink(props.link.id, { title: localTitle.value.trim() })
}

function saveUrl() {
  const val = localUrl.value.trim()
  if (!val) {
    urlError.value = 'URL tidak boleh kosong'
    localUrl.value = props.link.url
    return
  }
  if (!val.startsWith('http://') && !val.startsWith('https://')) {
    urlError.value = 'URL harus diawali https://'
    return
  }
  urlError.value = ''
  store.updateLink(props.link.id, { url: val })
}
</script>
