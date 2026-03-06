<template>
  <div class="relative min-h-screen" style="background: var(--bg-primary); color: var(--text-primary);">
    <div class="fixed inset-0 speed-lines pointer-events-none z-0" />
    <div class="relative z-10">
      <slot />
    </div>
  </div>
</template>
