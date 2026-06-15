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
        <!-- Theme toggle -->
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

        <!-- Auth area — ClientOnly agar tidak hydration mismatch -->
        <ClientOnly>
          <!-- Sudah login: tampilkan username + dropdown -->
          <template v-if="isAuthenticated">
            <div
              ref="menuRef"
              class="relative"
            >
              <button
                class="btn-ghost px-4 py-2 font-display text-base flex items-center gap-2"
                style="color:var(--accent-primary);"
                @click="open = !open"
              >
                <IconUser :size="16" />
                <span>{{ userName }}</span>
                <IconChevronDown
                  :size="14"
                  :class="open ? 'rotate-180' : ''"
                  class="transition-transform duration-200"
                />
              </button>

              <!-- Dropdown -->
              <Transition name="dropdown">
                <div
                  v-if="open"
                  class="absolute right-0 top-full mt-2 w-44 comic-panel py-1"
                  style="box-shadow:4px 4px 0 var(--border-color); z-index:100;"
                >
                  <NuxtLink
                    to="/admin"
                    class="flex items-center gap-2 px-4 py-2 font-comic font-bold text-sm no-underline hover:opacity-70 transition-opacity"
                    style="color:var(--text-primary);"
                    @click="open = false"
                  >
                    <IconLayoutDashboard :size="15" />
                    Dashboard
                  </NuxtLink>
                  <NuxtLink
                    to="/account"
                    class="flex items-center gap-2 px-4 py-2 font-comic font-bold text-sm no-underline hover:opacity-70 transition-opacity"
                    style="color:var(--text-primary);"
                    @click="open = false"
                  >
                    <IconUserCog :size="15" />
                    Account
                  </NuxtLink>
                  <div
                    class="my-1 border-t"
                    style="border-color:var(--border-color);"
                  />
                  <button
                    class="flex items-center gap-2 w-full px-4 py-2 font-comic font-bold text-sm hover:opacity-70 transition-opacity"
                    style="color:#dc2626;"
                    @click="handleLogout"
                  >
                    <IconLogOut :size="15" />
                    Log Out
                  </button>
                </div>
              </Transition>
            </div>
          </template>

          <!-- Belum login: tampilkan Log In + Sign Up -->
          <template v-else>
            <NuxtLink
              to="/login?mode=login"
              class="btn-ghost px-4 py-2 font-display text-base no-underline hidden sm:inline-flex"
            >
              Log In
            </NuxtLink>
            <NuxtLink
              to="/login?mode=signup"
              class="btn-comic px-5 py-2 font-display text-base no-underline text-white"
              style="background:var(--accent-primary); border-color:#000; box-shadow:4px 4px 0 #000;"
            >
              Sign Up Free
            </NuxtLink>
          </template>
        </ClientOnly>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import Logo from '~/assets/img/Logo.vue'
import { useThemeStore } from '~/stores/theme'
import { useAuthStore } from '~/stores/auth'

const themeStore = useThemeStore()
const { isDark } = storeToRefs(themeStore)

const authStore = useAuthStore()
const isAuthenticated = computed(() => authStore.isAuthenticated)
const userName = computed(() => authStore.user?.username ?? '')

// ── Dropdown ─────────────────────────────────────────────
const open = ref(false)
const menuRef = ref<HTMLElement | null>(null)

onClickOutside(menuRef, () => { open.value = false })

// ── Logout ───────────────────────────────────────────────
const logout = useLogout()
async function handleLogout() {
  open.value = false
  await logout()
}

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Templates', href: '#templates' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
]
</script>

<style scoped>
.dropdown-enter-active { transition: all 0.15s ease-out; }
.dropdown-leave-active { transition: all 0.1s ease-in; }
.dropdown-enter-from  { opacity: 0; transform: translateY(-6px); }
.dropdown-leave-to    { opacity: 0; transform: translateY(-4px); }
</style>
