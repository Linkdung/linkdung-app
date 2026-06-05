<template>
  <div
    class="min-h-screen flex items-center justify-center px-4 relative overflow-hidden halftone-bg"
    style="background:var(--bg-primary);"
  >
    <!-- Animated web strands background -->
    <div
      class="fixed inset-0 pointer-events-none"
      aria-hidden="true"
    >
      <svg
        class="absolute inset-0 w-full h-full opacity-[0.05] dark:opacity-[0.09]"
        viewBox="0 0 800 600"
        fill="none"
        style="color:var(--border-color);"
      >
        <g
          stroke="currentColor"
          stroke-width="1"
        >
          <line
            x1="400"
            y1="300"
            x2="400"
            y2="0"
          /><line
            x1="400"
            y1="300"
            x2="693"
            y2="150"
          />
          <line
            x1="400"
            y1="300"
            x2="693"
            y2="450"
          /><line
            x1="400"
            y1="300"
            x2="400"
            y2="600"
          />
          <line
            x1="400"
            y1="300"
            x2="107"
            y2="450"
          /><line
            x1="400"
            y1="300"
            x2="107"
            y2="150"
          />
          <ellipse
            cx="400"
            cy="300"
            rx="80"
            ry="60"
          />
          <ellipse
            cx="400"
            cy="300"
            rx="160"
            ry="120"
          />
          <ellipse
            cx="400"
            cy="300"
            rx="240"
            ry="180"
          />
          <ellipse
            cx="400"
            cy="300"
            rx="320"
            ry="240"
          />
        </g>
      </svg>
    </div>

    <div
      class="relative z-10 w-full max-w-md text-center"
      style="animation:pop-in 0.5s cubic-bezier(0.175,0.885,0.32,1.275);"
    >
      <!-- Gear / maintenance animation -->
      <div class="mb-6 relative">
        <span
          class="text-8xl block"
          style="animation:spin-slow 4s linear infinite;"
        >⚙️</span>
        <span class="text-4xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 float-anim">🔧</span>
      </div>

      <div
        class="comic-panel p-8"
        style="box-shadow:8px 8px 0 var(--border-color);"
      >
        <span
          class="action-text text-4xl block mb-3"
          style="color:var(--accent-primary);"
        >
          MAINTENANCE
        </span>
        <h1
          class="font-display text-xl mb-4"
          style="color:var(--text-primary);"
        >
          We're upgrading the network
        </h1>
        <p
          class="font-comic text-sm leading-relaxed mb-6"
          style="color:var(--text-muted);"
        >
          Linkdung is getting an upgrade. Our team is hard at work building
          something better. Check back in a few minutes!
        </p>

        <!-- Fake progress bar -->
        <div
          class="border-2 border-black overflow-hidden mb-6"
          style="border-radius:4px;"
        >
          <div
            class="progress-bar h-4"
            style="background:var(--accent-primary);"
          />
        </div>

        <!-- Notify me input -->
        <div
          v-if="!notified"
          class="flex gap-2"
        >
          <input
            v-model="notifyEmail"
            type="email"
            class="input-comic flex-1 text-sm"
            placeholder="Notify me when back..."
          />
          <button
            class="btn-comic px-4 font-display text-sm text-white"
            style="background:var(--accent-primary);border-color:#000;box-shadow:3px 3px 0 #000;"
            @click="handleNotify"
          >
            OK
          </button>
        </div>
        <div
          v-else
          class="font-comic text-sm px-3 py-2 border-2 border-black"
          style="background:#FFD700;color:#000;"
        >
          We'll ping you when we're back online!
        </div>
      </div>

      <p
        class="font-comic text-xs mt-6"
        style="color:var(--text-muted);"
      >
        Follow us for updates: <a
          href="#"
          class="underline"
          style="color:var(--accent-primary);"
        >@linkdung</a>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'blank' })
useHead({ title: 'Maintenance | Linkdung' })

const notifyEmail = ref('')
const notified = ref(false)
function handleNotify() {
  if (!notifyEmail.value.trim()) return
  // TODO: save email
  notified.value = true
}
</script>

<style scoped>
@keyframes pop-in {
  from { opacity: 0; transform: scale(0.88) translateY(20px); }
  to   { opacity: 1; transform: scale(1) translateY(0); }
}
@keyframes spin-slow { to { transform: rotate(360deg); } }
@keyframes progress {
  0%   { width: 20%; }
  50%  { width: 75%; }
  100% { width: 55%; }
}
.progress-bar { animation: progress 3s ease-in-out infinite alternate; }
</style>
