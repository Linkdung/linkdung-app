<template>
  <nav
    class="sticky top-0 z-50 border-b-3"
    style="border-color:var(--border-color); background:var(--bg-card); box-shadow:0 4px 0 var(--border-color);"
  >
    <div class="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
      <a
        href="#"
        class="font-display text-2xl tracking-widest flex items-center gap-2 no-underline"
        style="color:var(--accent-primary);"
      >
        <ClientOnly>
          <span class="text-3xl float-anim inline-block">
            <Logo />
          </span>
          <span
            class="-ml-60"
            style="-webkit-text-stroke:1.5px var(--border-color);"
          >Linkdung</span>
        </ClientOnly>
      </a>

      <div class="hidden md:flex items-center gap-6">
        <a
          v-for="link in navLinks"
          :key="link.label"
          :href="link.href"
          class="font-comic font-bold text-sm no-underline transition-all hover:opacity-70"
          style="color:var(--text-primary);"
        >{{ link.label }}</a>
      </div>

      <div class="flex items-center gap-3">
        <!-- Theme toggle — tidak berubah -->
        <button
          class="btn-ghost px-3 py-2 font-display text-sm hidden md:block"
          @click="themeStore.toggleTheme()"
        >
          <IconSun
            v-if="isDark"
            :size="24"
            style="color:var(--accent-primary);"
          />
          <IconMoon
            v-else
            :size="24"
            style="color:var(--accent-primary);"
          />
        </button>

        <!-- [CHANGE] Log In — ghost button (baru) -->
        <NuxtLink
          to="/login?mode=login"
          class="btn-ghost px-4 py-2 font-display text-base no-underline hidden sm:inline-flex"
        >
          Log In
        </NuxtLink>

        <!-- [CHANGE] Get Started → Sign Up Free + arahkan ke /login?mode=signup -->
        <NuxtLink
          to="/login?mode=signup"
          class="btn-comic px-5 py-2 font-display text-base no-underline text-white"
          style="background:var(--accent-primary); border-color:#000; box-shadow:4px 4px 0 #000;"
        >
          Sign Up Free
        </NuxtLink>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import Logo from '~/assets/img/Logo.vue'
import { useThemeStore } from '~/stores/theme'

const themeStore = useThemeStore()
const { isDark } = storeToRefs(themeStore)
const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Templates', href: '#templates' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
]
</script>
