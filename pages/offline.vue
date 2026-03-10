<template>
  <div
    class="min-h-screen flex items-center justify-center px-4 relative overflow-hidden halftone-bg"
    style="background:var(--bg-primary);"
  >
    <div
      class="relative z-10 w-full max-w-md text-center"
      style="animation:pop-in 0.5s cubic-bezier(0.175,0.885,0.32,1.275);"
    >
      <!-- Broken web icon -->
      <div class="mb-6 relative inline-block">
        <svg
          width="120"
          height="120"
          viewBox="0 0 120 120"
          fill="none"
          class="mx-auto"
        >
          <g
            stroke="currentColor"
            stroke-width="1.5"
            style="color:var(--border-color);opacity:0.3;"
          >
            <line
              x1="60"
              y1="60"
              x2="60"
              y2="10"
            /><line
              x1="60"
              y1="60"
              x2="103"
              y2="35"
            />
            <line
              x1="60"
              y1="60"
              x2="103"
              y2="85"
            /><line
              x1="60"
              y1="60"
              x2="60"
              y2="110"
            />
            <line
              x1="60"
              y1="60"
              x2="17"
              y2="85"
            /><line
              x1="60"
              y1="60"
              x2="17"
              y2="35"
            />
            <circle
              cx="60"
              cy="60"
              r="18"
            /><circle
              cx="60"
              cy="60"
              r="36"
            />
          </g>
          <!-- Broken strand (accent) -->
          <g
            stroke="currentColor"
            stroke-width="2.5"
            style="color:var(--accent-primary);"
            stroke-dasharray="4 3"
          >
            <line
              x1="60"
              y1="60"
              x2="60"
              y2="10"
            />
            <circle
              cx="60"
              cy="60"
              r="50"
              stroke-dasharray="8 6"
            />
          </g>
          <text
            x="60"
            y="68"
            text-anchor="middle"
            class="font-display"
            font-size="28"
            fill="currentColor"
            style="color:var(--accent-primary);"
          >📡</text>
        </svg>
      </div>

      <div
        class="comic-panel p-8"
        style="box-shadow:8px 8px 0 var(--border-color);"
      >
        <span
          class="action-text text-4xl block mb-2"
          style="color:var(--accent-primary);"
        >OFFLINE</span>
        <h1
          class="font-display text-xl mb-4"
          style="color:var(--text-primary);"
        >
          Web signal lost
        </h1>
        <p
          class="font-comic text-sm leading-relaxed mb-6"
          style="color:var(--text-muted);"
        >
          Even the best web-slingers need a signal.
          Check your internet connection and try again.
        </p>
        <button
          class="btn-comic w-full font-display text-xl text-white"
          style="background:var(--accent-primary);border-color:#000;box-shadow:5px 5px 0 #000;"
          @click="() => window.location.reload()"
        >
          ↺ Try Again
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'blank' })
useHead({ title: 'Offline | Linkdung' })
</script>

<style scoped>
@keyframes pop-in {
  from { opacity: 0; transform: scale(0.88) translateY(20px); }
  to   { opacity: 1; transform: scale(1) translateY(0); }
}
</style>
