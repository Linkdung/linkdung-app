<template>
  <div class="min-h-screen py-10 px-4">
    <div class="max-w-3xl mx-auto">
      <!-- Header -->
      <div class="flex items-center justify-between mb-8">
        <div>
          <h1
            class="font-display text-4xl tracking-wide gap-x-2"
            style="color:var(--text-primary);"
          >
            <IconShieldUser
              :size="42"
              class="inline-block"
            />
            <span>ADMIN</span>
          </h1>
          <p
            class="font-comic text-sm mt-1"
            style="color:var(--text-muted);"
          >
            Customize your Linkdung profile
          </p>
        </div>
        <div class="flex gap-3 items-center">
          <ClientOnly>
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
                      to="/"
                      class="flex items-center gap-2 px-4 py-2 font-comic font-bold text-sm no-underline hover:opacity-70 transition-opacity"
                      style="color:var(--text-primary);"
                      @click="open = false"
                    >
                      <IconLayoutDashboard :size="15" />
                      Landing Page
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
          </ClientOnly>
          <NuxtLink
            to="/profile"
            target="_blank"
            class="btn-ghost px-4 py-2 font-display text-base no-underline flex items-center gap-2"
          >
            <IconEye :size="18" />
            <span>Preview</span>
          </NuxtLink>
          <button
            class="btn-comic px-6 py-2 font-display text-lg text-white flex items-center gap-2"
            style="background:var(--accent-primary);border-color:#000;box-shadow:4px 4px 0 #000;"
            :disabled="store.isLoading || !store.isDirty"
            @click="store.saveProfile()"
          >
            <IconHourglass
              v-if="store.isLoading"
              :size="18"
            />
            <IconSave
              v-else
              :size="18"
            />
            <span>{{ store.isLoading ? 'Saving...' : 'Save' }}</span>
          </button>
        </div>
      </div>

      <!-- Unsaved banner -->
      <Transition name="slide-down">
        <div
          v-if="store.isDirty"
          class="comic-panel px-4 py-3 mb-6 flex items-center justify-between gap-3"
          style="background:#FFD700;border-color:#000;"
        >
          <div class="flex items-center gap-3">
            <IconTriangleAlert
              :size="28"
              color="black"
            />
            <p class="font-comic font-bold text-sm text-black">
              Unsaved changes — remember to save!
            </p>
          </div>
          <button
            class="font-comic font-bold text-xs text-black underline underline-offset-2 hover:opacity-70 flex-shrink-0"
            @click="store.discardDraft()"
          >
            Discard
          </button>
        </div>
      </Transition>

      <!-- Tabs nav -->
      <div
        class="flex flex-wrap gap-2 mb-6 border-b-3"
        style="border-color:var(--border-color);"
      >
        <button
          v-for="tab in tabs"
          :key="tab.id"
          class="btn-comic px-4 py-2 font-display text-sm -mb-px transition-all"
          :class="activeTab === tab.id ? 'text-white' : 'opacity-60 hover:opacity-100'"
          :style="activeTab === tab.id
            ? 'background:var(--accent-primary);border-color:var(--border-color);border-bottom-color:transparent;'
            : ''"
          @click="activeTab = tab.id"
        >
          <ClientOnly>
            <component
              :is="iconMap[tab.icon as keyof typeof iconMap]"
              :size="18"
              class="inline-block"
            />
            {{ tab.label }}
          </ClientOnly>
        </button>
      </div>

      <!-- Tab: Links -->
      <div
        v-show="activeTab === 'links'"
        class="space-y-5"
      >
        <AdminAddLinkForm />
        <AdminLinkList
          :links="allLinks"
          @delete="openDelete"
        />
      </div>

      <!-- Tab: Profile -->
      <div v-show="activeTab === 'profile'">
        <AdminProfileTab />
      </div>

      <!-- Tab: Analytics -->
      <div v-show="activeTab === 'analytics'">
        <AdminAnalyticsTab />
      </div>

      <!-- Tab: Appearance -->
      <div v-show="activeTab === 'appearance'">
        <AdminAppearanceTab />
      </div>
    </div>

    <AdminDeleteModal
      :target="deleteTarget"
      @confirm="executeDelete"
      @cancel="deleteTarget = null"
    />
  </div>
</template>

<script setup lang="ts">
import {
  Link, User, Palette, BarChart2,
} from 'lucide-vue-next'
import { useProfileStore } from '~/stores/profile'
import { useAccentColor } from '~/composables/useAccentColor'

const authStore = useAuthStore()
const isAuthenticated = computed(() => authStore.isAuthenticated)
const userName = computed(() => authStore.user?.name ?? '')

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

const iconMap = markRaw({ Link, User, Palette, BarChart2 })

useHead({ title: 'Admin | Linkdung' })

const store = useProfileStore()
const { allLinks } = storeToRefs(store)
const { initAccentColor } = useAccentColor()

onMounted(() => {
  // Init from published (not draft) so CSS vars match the saved state
  initAccentColor()
  // Sync draft to current published on mount (in case of stale draft)
  store.discardDraft()
})

const activeTab = ref('links')
const tabs = [
  { id: 'links', label: 'Links', icon: 'Link' },
  { id: 'profile', label: 'Profile', icon: 'User' },
  { id: 'analytics', label: 'Analytics', icon: 'BarChart2' },
  { id: 'appearance', label: 'Look', icon: 'Palette' },
]

const deleteTarget = ref<{ id: string, title: string } | null>(null)
function openDelete(id: string, title: string) { deleteTarget.value = { id, title } }
function executeDelete() {
  if (deleteTarget.value) store.removeLink(deleteTarget.value.id)
  deleteTarget.value = null
}
</script>

<style scoped>
.slide-down-enter-active {
  animation: pop-in 0.3s ease;
}

.slide-down-leave-active {
  transition: opacity 0.2s, transform 0.2s;
}

.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
