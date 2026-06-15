<template>
  <!-- Skeleton: tampil saat SSR / sebelum client hydrated -->
  <SkeletonLinkListSkeleton
    v-if="!isReady"
    :count="links.length || 3"
  />

  <Transition name="list-fade">
    <div
      v-if="isReady"
      class="comic-panel p-6"
    >
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
        <component
          :is="iconMap[item.icon as keyof typeof iconMap]"
          :size="12"
          class="inline-block ml-5"
          stroke-width="3"
        />
        {{ item.label }}
      </p>

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

      <VueDraggable
        v-else
        v-model="orderedLinks"
        :animation="200"
        handle=".drag-handle"
        ghost-class="drag-ghost"
        drag-class="drag-active"
        class="space-y-3"
      >
        <div
          v-for="(link, index) in orderedLinks"
          :key="link.id"
          class="flex items-stretch gap-2"
        >
          <!-- drag handle + reorder buttons -->
          <div class="flex flex-col items-center justify-center gap-1 flex-shrink-0">
            <div
              class="drag-handle flex items-center justify-center px-1.5 py-1 border-2 border-black cursor-grab active:cursor-grabbing touch-none select-none"
              style="background:var(--bg-card); color:var(--text-primary);"
              title="Drag to reorder"
            >
              <IconGripVertical :size="14" />
            </div>
            <button
              class="text-xs px-1.5 py-1 border-2 border-black font-bold transition-colors hover:bg-black hover:text-white disabled:opacity-30"
              style="background:var(--bg-card); color:var(--text-primary);"
              :disabled="index === 0"
              @click="store.reorderLinks(moveItem(orderedLinks, index, -1))"
            >
              ▲
            </button>
            <button
              class="text-xs px-1.5 py-1 border-2 border-black font-bold transition-colors hover:bg-black hover:text-white disabled:opacity-30"
              style="background:var(--bg-card); color:var(--text-primary);"
              :disabled="index === orderedLinks.length - 1"
              @click="store.reorderLinks(moveItem(orderedLinks, index, 1))"
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
      </VueDraggable>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { VueDraggable } from 'vue-draggable-plus'
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
  { icon: 'Star', label: 'Highlight' },
  { icon: 'Trash', label: 'Delete' },
]

const props = defineProps<{ links: LinkItem[] }>()
defineEmits<{ delete: [id: string, title: string] }>()

const store = useProfileStore()

// v-model untuk VueDraggable: get dari draft (prop), set commit urutan baru ke store.
// store.reorderLinks() me-reindex `order` lalu isDirty otomatis → tinggal Save.
const orderedLinks = computed<LinkItem[]>({
  get: () => props.links,
  set: newOrder => store.reorderLinks(newOrder),
})

// isReady: skeleton tampil di server/hydration, konten asli fade-in setelah mount
const isReady = ref(false)
onMounted(() => { isReady.value = true })

function moveItem(arr: LinkItem[], index: number, direction: -1 | 1): LinkItem[] {
  const copy = [...arr]
  const target = index + direction
  ;[copy[index], copy[target]] = [copy[target], copy[index]]
  return copy
}
</script>

<style scoped>
/* Placeholder slot saat item ditarik */
.drag-ghost {
  opacity: 0.4;
  background: var(--bg-secondary);
}

/* Item yang sedang aktif ditarik */
.drag-active {
  cursor: grabbing;
  box-shadow: 6px 6px 0 var(--border-color);
}

.list-fade-enter-active { transition: opacity 0.3s ease; }
.list-fade-enter-from   { opacity: 0; }
</style>
