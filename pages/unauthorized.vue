<template>
  <div
    class="min-h-screen flex items-center justify-center px-4 relative overflow-hidden halftone-bg"
    style="background:var(--bg-primary);"
  >
    <div
      class="fixed inset-0 pointer-events-none"
      aria-hidden="true"
    >
      <svg
        class="absolute top-0 right-0 w-64 h-64 opacity-[0.08]"
        viewBox="0 0 200 200"
        fill="none"
        style="color:var(--accent-primary);"
      >
        <g
          stroke="currentColor"
          stroke-width="1.5"
        >
          <line
            x1="200"
            y1="0"
            x2="0"
            y2="60"
          /><line
            x1="200"
            y1="0"
            x2="50"
            y2="120"
          />
          <line
            x1="200"
            y1="0"
            x2="120"
            y2="200"
          /><line
            x1="200"
            y1="0"
            x2="0"
            y2="10"
          />
          <path d="M 150,0 Q 175,25 200,50" /><path d="M 100,0 Q 150,50 200,100" />
          <path d="M 50,0 Q 125,75 200,150" />
        </g>
      </svg>
    </div>

    <div
      class="relative z-10 w-full max-w-md text-center"
      style="animation:pop-in 0.5s cubic-bezier(0.175,0.885,0.32,1.275);"
    >
      <div class="mb-4">
        <span
          class="font-display text-[9rem] leading-none block select-none"
          style="color:var(--accent-primary);-webkit-text-stroke:3px var(--border-color);text-shadow:6px 6px 0 var(--border-color);"
        >
          401
        </span>
      </div>

      <div
        class="comic-panel p-8 mb-6"
        style="box-shadow:8px 8px 0 var(--border-color);"
      >
        <h1
          class="font-display text-2xl mb-3"
          style="color:var(--text-primary);"
        >
          Who goes there?
        </h1>
        <p
          class="font-comic text-sm leading-relaxed mb-6"
          style="color:var(--text-muted);"
        >
          This page requires you to be logged in.
          Prove your identity, hero.
        </p>
        <div class="flex flex-col sm:flex-row gap-3 justify-center">
          <NuxtLink
            to="/login"
            class="btn-comic px-6 py-3 font-display text-lg text-white no-underline inline-flex items-center justify-center"
            style="background:var(--accent-primary);border-color:#000;box-shadow:5px 5px 0 #000;"
          >
            Log In →
          </NuxtLink>
          <NuxtLink
            to="/"
            class="btn-ghost px-6 py-3 font-display text-lg no-underline inline-flex items-center justify-center"
          >
            <IconHouse :size="18" />
            Home
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'blank' })
useHead({ title: '401 Unauthorized | Linkdung' })
</script>

<style scoped>
@keyframes pop-in {
  from { opacity: 0; transform: scale(0.88) translateY(20px); }
  to   { opacity: 1; transform: scale(1) translateY(0); }
}
</style>
