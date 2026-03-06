<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="target"
           class="fixed inset-0 z-50 flex items-center justify-center p-4"
           style="background:rgba(0,0,0,0.75);"
           @click.self="$emit('cancel')">
        <div class="comic-panel p-6 max-w-sm w-full" style="background:var(--bg-card);">
          <p class="action-text text-3xl mb-3" style="color:var(--accent-primary);">DELETE?</p>
          <p class="font-comic mb-5">Remove <strong>"{{ target.title }}"</strong>?</p>
          <div class="flex gap-3">
            <button class="btn-comic flex-1 font-display text-base py-2 text-white"
                    style="background:var(--accent-primary);border-color:#000;box-shadow:4px 4px 0 #000;"
                    @click="$emit('confirm')">🗑️ Delete</button>
            <button class="btn-ghost flex-1 font-display text-base py-2"
                    @click="$emit('cancel')">Cancel</button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
defineProps<{ target: { id: string; title: string } | null }>()
defineEmits<{ confirm: []; cancel: [] }>()
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
