<template>
  <div class="max-w-lg mx-auto py-10 px-4">
    <!-- Avatar -->
    <div class="text-center mb-8">
      <div
        class="skeleton w-28 h-28 rounded-full mx-auto mb-4"
        style="box-shadow:6px 6px 0 var(--border-color);"
      />

      <!-- Display name -->
      <div class="skeleton h-9 w-48 mx-auto mb-2" />

      <!-- @username -->
      <div class="skeleton h-4 w-24 mx-auto mb-5" />

      <!-- Bio bubble -->
      <div
        class="skeleton mx-auto mb-1"
        style="max-width:22rem; height:72px; border-radius:8px;"
      />

      <!-- Social icons row -->
      <div class="flex justify-center gap-3 mt-6">
        <div
          v-for="i in 3"
          :key="i"
          class="skeleton w-10 h-10"
        />
      </div>
    </div>

    <!-- MY LINKS! banner -->
    <div class="skeleton h-12 w-36 mx-auto mb-6" />

    <!-- Link cards -->
    <div class="flex flex-col gap-4">
      <div
        v-for="i in count"
        :key="i"
        class="skeleton"
        style="height:66px; box-shadow:6px 6px 0 var(--border-color);"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ count?: number }>(), { count: 4 })
</script>
