<template>
  <div
    class="min-h-screen flex items-center justify-center px-4 relative overflow-hidden halftone-bg"
    style="background:var(--bg-primary);"
  >
    <!-- Web corners -->
    <div
      class="fixed inset-0 pointer-events-none"
      aria-hidden="true"
    >
      <svg
        class="absolute top-0 left-0 w-72 h-72 opacity-[0.07] dark:opacity-[0.12]"
        viewBox="0 0 200 200"
        fill="none"
        style="color:var(--border-color);"
      >
        <g
          stroke="currentColor"
          stroke-width="1"
        >
          <line
            x1="0"
            y1="0"
            x2="200"
            y2="50"
          /><line
            x1="0"
            y1="0"
            x2="140"
            y2="110"
          />
          <line
            x1="0"
            y1="0"
            x2="70"
            y2="200"
          /><line
            x1="0"
            y1="0"
            x2="200"
            y2="8"
          />
          <line
            x1="0"
            y1="0"
            x2="8"
            y2="200"
          />
          <path d="M 60,0 Q 30,30 0,60" /><path d="M 120,0 Q 60,60 0,120" />
          <path d="M 180,0 Q 90,90 0,180" />
        </g>
      </svg>
      <svg
        class="absolute bottom-0 right-0 w-72 h-72 opacity-[0.07] dark:opacity-[0.12]"
        viewBox="0 0 200 200"
        fill="none"
        style="color:var(--border-color);"
      >
        <g
          stroke="currentColor"
          stroke-width="1"
          transform="rotate(180,100,100)"
        >
          <line
            x1="0"
            y1="0"
            x2="200"
            y2="50"
          /><line
            x1="0"
            y1="0"
            x2="140"
            y2="110"
          />
          <line
            x1="0"
            y1="0"
            x2="70"
            y2="200"
          /><line
            x1="0"
            y1="0"
            x2="200"
            y2="8"
          />
          <line
            x1="0"
            y1="0"
            x2="8"
            y2="200"
          />
          <path d="M 60,0 Q 30,30 0,60" /><path d="M 120,0 Q 60,60 0,120" />
          <path d="M 180,0 Q 90,90 0,180" />
        </g>
      </svg>
    </div>

    <div
      class="relative z-10 w-full max-w-lg text-center"
      style="animation:pop-in 0.5s cubic-bezier(0.175,0.885,0.32,1.275);"
    >
      <!-- Error code / icon -->
      <div class="mb-6 relative inline-block">
        <!-- Glitch big number -->
        <span
          class="font-display block leading-none select-none"
          :class="is404 ? 'text-[10rem]' : 'text-[8rem]'"
          style="color:var(--accent-primary);-webkit-text-stroke:3px var(--border-color);text-shadow:6px 6px 0 var(--border-color);"
          aria-hidden="true"
        >{{ errorCode }}</span>
        <!-- Unplugged icon dangling from the number -->
        <span class="text-5xl absolute -right-4 -bottom-4 float-anim inline-block select-none">🔌</span>
      </div>

      <!-- Card -->
      <div
        class="comic-panel p-8 mb-8"
        style="box-shadow:8px 8px 0 var(--border-color);"
      >
        <h1
          class="font-display text-2xl mb-3"
          style="color:var(--text-primary);"
        >
          {{ title }}
        </h1>
        <p
          class="font-comic text-base leading-relaxed mb-6"
          style="color:var(--text-muted);"
        >
          {{ message }}
        </p>

        <!-- Action buttons -->
        <div class="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            class="btn-comic px-6 py-3 font-display text-lg text-white"
            style="background:var(--accent-primary);border-color:#000;box-shadow:5px 5px 0 #000;"
            @click="handleBack"
          >
            ← Go Back
          </button>
          <NuxtLink
            to="/"
            class="btn-ghost px-6 py-3 font-display text-lg no-underline inline-flex items-center justify-center"
          >
            <IconHouse :size="18" />
            Home
          </NuxtLink>
        </div>

        <!-- Extra: show stack trace in dev -->
        <details
          v-if="isDev && error?.stack"
          class="mt-6 text-left"
        >
          <summary
            class="font-comic text-xs cursor-pointer"
            style="color:var(--text-muted);"
          >
            🔍 Show error details (dev only)
          </summary>
          <pre
            class="mt-2 p-3 text-xs overflow-auto border-2 border-black font-mono"
            style="background:var(--bg-secondary);color:var(--text-primary);max-height:200px;"
          >{{ error?.stack }}</pre>
        </details>
      </div>

      <!-- Fun line -->
      <p
        class="font-comic text-sm"
        style="color:var(--text-muted);"
      >
        {{ funLine }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { NuxtError } from 'nuxt/app'

const props = defineProps<{ error: NuxtError }>()

const isDev = import.meta.dev

const is404 = computed(() => props.error?.statusCode === 404)
const isAuth = computed(() => props.error?.statusCode === 401 || props.error?.statusCode === 403)

const errorCode = computed(() => String(props.error?.statusCode ?? '500'))

const title = computed(() => {
  switch (props.error?.statusCode) {
    case 404: return 'Page Not Found'
    case 401: return 'Not Authenticated'
    case 403: return 'Access Denied'
    case 429: return 'Too Many Requests'
    case 500: return 'Server Error'
    case 503: return 'Service Unavailable'
    default: return 'Something Went Wrong'
  }
})

const message = computed(() => {
  switch (props.error?.statusCode) {
    case 404: return 'Looks like this page got lost somewhere in the network and vanished. Double-check the URL or head back home.'
    case 401: return 'You need to be logged in to access this page. Please sign in and try again.'
    case 403: return 'You don\'t have permission to view this page. If you think this is a mistake, contact support.'
    case 429: return 'Whoa, slow down! You\'ve made too many requests. Take a breather and try again in a moment.'
    case 500: return 'Our server stumbled on a loose thread. We\'re on it — try refreshing or come back shortly.'
    case 503: return 'We\'re doing some quick maintenance. The network is being rewired — back shortly!'
    default: return props.error?.message || 'An unexpected error occurred. Please try again.'
  }
})

const funLine = computed(() => {
  const lines: Record<number, string> = {
    404: 'Even the best map has a missing street sometimes. ',
    401: 'Every hero needs to prove themselves first. ',
    403: 'This sector of the network is restricted. ',
    429: 'Easy there, speed racer. Even servers need a breather. ',
    500: 'Every great app trips over a loose wire sometimes. ',
    503: 'The network is being rewired. Won\'t take long. ',
  }
  return lines[props.error?.statusCode ?? 0] ?? 'Every bug gets squashed eventually.'
})

function handleBack() {
  if (window.history.length > 1) {
    window.history.back()
  }
  else {
    navigateTo('/')
  }
}
</script>

<style scoped>
@keyframes pop-in {
  from { opacity: 0; transform: scale(0.88) translateY(20px); }
  to   { opacity: 1; transform: scale(1) translateY(0); }
}
</style>
