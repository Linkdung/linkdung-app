<template>
  <div class="comic-panel p-6">
    <div class="flex items-center justify-between mb-2">
      <h2
        class="font-display text-2xl"
        style="color:var(--accent-primary);"
      >
        MY LINKS
      </h2>
      <div class="flex items-center gap-2">
        <span
          class="font-comic text-xs px-2 py-1 border-2 border-black font-bold"
          style="background:#FFD700;color:#000;"
        >
          {{ links.filter(l => l.isVisible).length }} visible
        </span>
        <span
          class="font-comic text-xs px-2 py-1 border-2 border-black font-bold"
          style="background:var(--bg-secondary);"
        >
          {{ links.length }} total
        </span>
      </div>
    </div>
    <p
      v-for="item in subtitles"
      :key="item.label"
      class="font-comic text-xs mb-4 inline-block gap-x-5 cursor-default"
      style="color:var(--text-muted);"
    >
      <ClientOnly>
        <component
          :is="iconMap[item.icon as keyof typeof iconMap]"
          :size="12"
          class="inline-block ml-5"
          stroke-width="3"
        />
        {{ item.label }}
      </ClientOnly>
    </p>

    <ClientOnly>
      <div
        v-if="links.length === 0"
        class="text-center py-12 border-3 border-dashed"
        style="border-color:var(--text-muted);"
      >
        <p
          class="action-text text-3xl mb-1"
          style="color:var(--text-muted);"
        >
          NO LINKS YET!
        </p>
        <p
          class="font-comic text-sm"
          style="color:var(--text-muted);"
        >
          Use the form above ↑
        </p>
      </div>

      <TransitionGroup
        v-else
        name="link-list"
        tag="div"
        class="space-y-3"
      >
        <div
          v-for="(link, index) in links"
          :key="link.id"
          class="flex items-stretch gap-2"
        >
          <!-- reorder buttons -->
          <div class="flex flex-col justify-center gap-1 flex-shrink-0">
            <button
              class="text-xs px-1.5 py-1 border-2 border-black font-bold transition-colors hover:bg-black hover:text-white disabled:opacity-30"
              style="background:var(--bg-card); color:var(--text-primary);"
              :disabled="index === 0"
              @click="store.reorderLinks(moveItem(links, index, -1))"
            >
              ▲
            </button>
            <button
              class="text-xs px-1.5 py-1 border-2 border-black font-bold transition-colors hover:bg-black hover:text-white disabled:opacity-30"
              style="background:var(--bg-card); color:var(--text-primary);"
              :disabled="index === links.length - 1"
              @click="store.reorderLinks(moveItem(links, index, 1))"
            >
              ▼
            </button>
          </div>
          <div class="flex-1 min-w-0">
            <AdminLinkCard
              :link="link"
              @delete="(id, title) => $emit('delete', id, title)"
            />
          </div>
        </div>
      </TransitionGroup>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import {
  ArrowUpDown,
  Eye, Star, Trash,
} from 'lucide-vue-next'
import { useProfileStore } from '~/stores/profile'
import type { LinkItem } from '~/stores/profile'

const iconMap = markRaw({ ArrowUpDown, Eye, Star, Trash })

const subtitles = [
  { icon: 'ArrowUpDown', label: 'Reorder' },
  { icon: 'Eye', label: 'Toggle Visible' },
  { icon: 'Star', label: 'Hightlight' },
  { icon: 'Trash', label: 'Delete' },
]

defineProps<{ links: LinkItem[] }>()
defineEmits<{ delete: [id: string, title: string] }>()

const store = useProfileStore()

function moveItem(arr: LinkItem[], index: number, direction: -1 | 1): LinkItem[] {
  const copy = [...arr]
  const target = index + direction
  ;[copy[index], copy[target]] = [copy[target], copy[index]]
  return copy
}
</script>

<style scoped>
.link-list-enter-active { transition: all 0.25s ease; }
.link-list-leave-active { transition: all 0.2s ease; position: absolute; width: 100%; }
.link-list-enter-from   { opacity: 0; transform: translateY(-10px); }
.link-list-leave-to     { opacity: 0; transform: translateX(20px); }
.link-list-move         { transition: transform 0.3s ease; }
</style>
