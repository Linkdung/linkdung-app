<template>
  <div class="comic-panel p-6">
    <!-- Header -->
    <div class="flex items-center justify-between mb-4">
      <div class="skeleton h-7 w-28" />
      <div class="flex gap-2">
        <div class="skeleton h-6 w-16" />
        <div class="skeleton h-6 w-14" />
      </div>
    </div>

    <!-- Subtitle legend -->
    <div class="flex gap-4 mb-5">
      <div
        v-for="i in 4"
        :key="i"
        class="skeleton h-3 w-16"
      />
    </div>

    <!-- Link rows -->
    <div class="space-y-3">
      <div
        v-for="i in count"
        :key="i"
        class="flex items-stretch gap-2"
      >
        <!-- Reorder buttons -->
        <div class="flex flex-col gap-1 flex-shrink-0">
          <div class="skeleton w-7 h-7" />
          <div class="skeleton w-7 h-7" />
        </div>

        <!-- Card body -->
        <div
          class="skeleton flex-1"
          style="height:80px;"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ count?: number }>(), { count: 4 })
</script>
