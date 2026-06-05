<template>
  <div class="comic-panel p-6">
    <div class="flex items-center justify-between mb-5">
      <h2
        class="font-display text-2xl py-1"
        style="color:var(--accent-primary);"
      >
        <IconPlus
          :size="20"
          class="bold inline-block"
          stroke-width="3"
        />
        ADD NEW LINK
      </h2>

      <button
        class="btn-comic px-3 py-1 font-display text-sm"
        style="background:var(--color-error);color:#fff;border-color:#000;box-shadow:3px 3px 0 #000;"
        @click="reset"
      >
        Reset
      </button>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
      <div>
        <label class="font-comic font-bold text-xs block mb-1">Title *</label>
        <input
          v-model="form.title"
          class="input-comic"
          placeholder="My Awesome Link"
        />
      </div>
      <div>
        <label class="font-comic font-bold text-xs block mb-1">URL *</label>
        <input
          v-model="form.url"
          class="input-comic"
          placeholder="https://..."
        />
      </div>

      <!-- Emoji Picker -->
      <div
        ref="emojiRef"
        class="relative"
      >
        <label class="font-comic font-bold text-xs block mb-1">Icon / Emoji</label>
        <button
          type="button"
          class="input-comic flex items-center gap-2 w-full text-left"
          @click="showEmoji = !showEmoji"
        >
          <span class="text-2xl">{{ form.emoji || '🔗' }}</span>
          <span
            class="font-comic text-sm flex-1"
            style="color:var(--text-muted);"
          >
            {{ form.emoji ? 'Change emoji' : 'Pick an emoji' }}
          </span>
          <IconX
            v-if="form.emoji"
            :size="16"
            class="text-gray-500 hover:text-gray-700 transition-colors"
            @click.stop="form.emoji = ''"
          />
          <IconTriangle
            v-if="showEmoji"
            :size="10"
          />
          <IconTriangle
            v-else
            :size="10"
            style="transform: rotate(180deg);"
          />
        </button>
        <Transition name="dropdown">
          <div
            v-if="showEmoji"
            class="absolute top-full left-0 mt-1 z-50 comic-panel p-3 w-72"
            style="background:var(--bg-card);"
          >
            <div
              class="flex flex-wrap gap-1 mb-2 pb-2 border-b-2"
              style="border-color:var(--border-color);"
            >
              <button
                v-for="cat in EMOJI_CATEGORIES"
                :key="cat.name"
                class="px-2 py-1 text-xs font-comic border-2 border-black transition-all"
                :style="activeCat === cat.name ? 'background:var(--accent-primary);color:#fff;' : ''"
                @click="activeCat = cat.name"
              >
                {{ cat.icon }} {{ cat.label }}
              </button>
            </div>
            <div class="grid grid-cols-8 gap-1 max-h-44 overflow-y-auto">
              <button
                v-for="emoji in currentEmojis"
                :key="emoji"
                class="text-xl p-1 hover:scale-125 transition-transform text-center leading-none"
                :class="form.emoji === emoji ? 'ring-2 ring-black bg-yellow-200 rounded' : ''"
                @click="form.emoji = emoji; showEmoji = false"
              >
                {{ emoji }}
              </button>
            </div>
            <button
              class="mt-2 btn-ghost w-full text-xs font-comic py-1"
              @click="showEmoji = false"
            >
              ✕ Close
            </button>
          </div>
        </Transition>
      </div>

      <!-- Card Style + Custom Color -->
      <div>
        <label class="font-comic font-bold text-xs block mb-1">Card Style</label>
        <div class="flex gap-2 flex-wrap items-end">
          <button
            v-for="style in CARD_STYLES"
            :key="style.value"
            :title="style.label"
            class="w-9 h-9 border-3 border-black transition-all hover:scale-110 flex items-center justify-center text-sm font-bold"
            :style="{
              background: style.bg,
              color: style.text,
              boxShadow: form.style === style.value
                ? '0 0 0 3px '+style.bg+', 0 0 0 5px #000'
                : '3px 3px 0 #000',
            }"
            @click="form.style = style.value; form.customColor = style.bg"
          >
            {{ form.style === style.value ? '✓' : '' }}
          </button>
          <div class="w-px h-8 bg-black opacity-20" />
          <div class="flex flex-row items-center gap-0.5">
            <input
              type="color"
              :value="form.customColor"
              class="w-9 h-9 border-2 border-black cursor-pointer p-0.5"
              :style="{ boxShadow: form.style === 'custom' ? '0 0 0 3px '+form.customColor+', 0 0 0 5px #000' : '3px 3px 0 #000' }"
              @input="(e) => { form.style = 'custom'; form.customColor = (e.target as HTMLInputElement).value }"
            />
            <span
              class="font-comic ml-2"
              style="color:var(--text-muted); font-size:10px;"
            >Custom</span>
          </div>
        </div>
        <p
          class="text-xs font-comic mt-1"
          style="color:var(--text-muted);"
        >
          Style: <strong>{{ form.style === 'custom' ? form.customColor : CARD_STYLES.find(s => s.value === form.style)?.label }}</strong>
        </p>
      </div>
    </div>

    <div class="mb-4">
      <label class="font-comic font-bold text-xs block mb-1">Description (optional)</label>
      <input
        v-model="form.description"
        class="input-comic"
        placeholder="Short description..."
      />
    </div>

    <!-- Preview -->
    <div class="mb-4">
      <label
        class="font-comic font-bold text-xs block mb-1"
        style="color:var(--text-muted);"
      >Preview:</label>
      <div
        class="flex items-center gap-3 border-3 border-black px-5 py-3 font-display text-lg"
        :style="previewStyle"
      >
        <IconLink
          v-if="!form.emoji"
          :size="20"
        />
        <span class="text-2xl">{{ form.emoji || '' }}</span>
        <div class="flex-1 min-w-0">
          <div class="truncate tracking-wide">
            {{ form.title || 'Link Title' }}
          </div>
          <div
            v-if="form.description"
            class="font-comic text-xs opacity-75 truncate"
          >
            {{ form.description }}
          </div>
        </div>
        <span class="opacity-50">→</span>
      </div>
    </div>

    <button
      class="btn-comic w-full py-3 font-display text-xl tracking-wide text-white"
      style="background:var(--accent-primary);border-color:#000;box-shadow:4px 4px 0 #000;"
      :disabled="!form.title || !form.url"
      :class="!form.title || !form.url ? 'opacity-50 cursor-not-allowed' : ''"
      @click="submit"
    >
      <IconZap :size="20" />
      ADD LINK
    </button>
  </div>
</template>

<script setup lang="ts">
import { CARD_STYLES, getLinkBg, getLinkTextColor, EMOJI_CATEGORIES } from '~/composables/useLinkStyles'
import { useProfileStore } from '~/stores/profile'

const store = useProfileStore()

interface FormLink {
  title: string
  url: string
  emoji: string
  description: string
  style: string
  customColor: string
}

const form = reactive({
  title: '', url: '', emoji: '', description: '',
  style: 'default', customColor: '#FFFFFF',
})

const showEmoji = ref(false)
const activeCat = ref('popular')
const emojiRef = ref<HTMLElement>()

const currentEmojis = computed(() => EMOJI_CATEGORIES.find(c => c.name === activeCat.value)?.emojis || [])

const previewStyle = computed(() => {
  const bg = getLinkBg(form as FormLink)
  const color = getLinkTextColor(form as FormLink)
  return `background:${bg}; color:${color}; box-shadow:5px 5px 0 #000;`
})

function submit() {
  if (!form.title || !form.url) return
  store.addLink({
    title: form.title, url: form.url, emoji: form.emoji,
    description: form.description, style: form.style as LinkItem['style'],
    customColor: form.customColor, isVisible: true, isHighlighted: false,
  })
  Object.assign(form, { title: '', url: '', emoji: '', description: '', style: 'default', customColor: '#FFFFFF' })
  showEmoji.value = false
}

function reset() {
  Object.assign(form, { title: '', url: '', emoji: '', description: '', style: 'default', customColor: '#FFFFFF' })
  showEmoji.value = false
}

// Tutup emoji picker saat klik di luar — onClickOutside auto-cleanup saat unmount
// (mengganti document.addEventListener manual yang tidak pernah di-remove → memory leak)
onClickOutside(emojiRef, () => { showEmoji.value = false })
</script>

<style scoped>
.dropdown-enter-active, .dropdown-leave-active { transition: opacity 0.15s ease, transform 0.15s ease; }
.dropdown-enter-from, .dropdown-leave-to { opacity: 0; transform: translateY(-6px); }
</style>
