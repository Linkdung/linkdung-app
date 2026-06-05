<template>
  <div
    class="min-h-screen py-10 px-4"
    style="background:var(--bg-primary);"
  >
    <div class="max-w-xl mx-auto">
      <!-- Header -->
      <div class="flex items-center justify-between mb-8">
        <div>
          <h1
            class="font-display text-4xl tracking-wide"
            style="color:var(--text-primary);"
          >
            <IconUserCog
              :size="38"
              class="inline-block mr-2"
            />
            ACCOUNT
          </h1>
          <p
            class="font-comic text-sm mt-1"
            style="color:var(--text-muted);"
          >
            Manage your email & password
          </p>
        </div>
        <NuxtLink
          to="/admin"
          class="btn-ghost px-4 py-2 font-display text-base no-underline flex items-center gap-2"
        >
          <IconArrowLeft :size="18" />
          <span>Dashboard</span>
        </NuxtLink>
      </div>

      <!-- Loading skeleton -->
      <template v-if="isLoadingAccount">
        <div class="space-y-4">
          <div
            v-for="i in 3"
            :key="i"
            class="h-12 rounded comic-panel animate-pulse"
            style="background:var(--bg-secondary);"
          />
        </div>
      </template>

      <template v-else>
        <!-- ── Section: Profile Info ──────────────────────────── -->
        <form
          class="comic-panel p-6 mb-6 space-y-4"
          style="box-shadow:6px 6px 0 var(--border-color);"
          @submit.prevent="handleUpdateAccount"
        >
          <h2
            class="font-display text-2xl tracking-wide mb-4"
            style="color:var(--text-primary);"
          >
            Profile Info
          </h2>

          <div>
            <label class="font-comic font-bold text-xs block mb-1">Display Name</label>
            <input
              v-model="accountForm.name"
              class="input-comic"
              placeholder="John Doe"
              autocomplete="name"
            />
          </div>

          <div>
            <label class="font-comic font-bold text-xs block mb-1">Email</label>
            <input
              v-model="accountForm.email"
              type="email"
              class="input-comic"
              placeholder="you@example.com"
              autocomplete="email"
            />
          </div>

          <Transition name="field-slide">
            <p
              v-if="accountError"
              class="font-comic text-sm px-3 py-2 border-2 border-black"
              style="background:#FFD700;color:#000;"
            >
              ⚡ {{ accountError }}
            </p>
          </Transition>
          <Transition name="field-slide">
            <p
              v-if="accountSuccess"
              class="font-comic text-sm px-3 py-2 border-2 border-black"
              style="background:#16a34a;color:#fff;"
            >
              ✓ Profile updated!
            </p>
          </Transition>

          <button
            type="submit"
            class="btn-comic px-6 py-2 font-display text-lg text-white flex items-center gap-2"
            style="background:var(--accent-primary);border-color:#000;box-shadow:4px 4px 0 #000;"
            :disabled="updatingAccount"
          >
            <IconHourglass
              v-if="updatingAccount"
              :size="18"
            />
            <IconSave
              v-else
              :size="18"
            />
            {{ updatingAccount ? 'Saving...' : 'Save Changes' }}
          </button>
        </form>

        <!-- ── Section: Change Password ──────────────────────── -->
        <form
          class="comic-panel p-6 space-y-4"
          style="box-shadow:6px 6px 0 var(--border-color);"
          @submit.prevent="handleChangePassword"
        >
          <h2
            class="font-display text-2xl tracking-wide mb-4"
            style="color:var(--text-primary);"
          >
            Change Password
          </h2>

          <div>
            <label class="font-comic font-bold text-xs block mb-1">Current Password</label>
            <div class="relative">
              <input
                v-model="pwForm.currentPassword"
                :type="showCurrent ? 'text' : 'password'"
                class="input-comic pr-16"
                placeholder="••••••••"
                autocomplete="current-password"
              />
              <button
                type="button"
                class="absolute right-3 top-1/2 -translate-y-1/2 font-comic text-xs"
                style="color:var(--text-muted);"
                @click="showCurrent = !showCurrent"
              >
                {{ showCurrent ? 'Hide' : 'Show' }}
              </button>
            </div>
          </div>

          <div>
            <label class="font-comic font-bold text-xs block mb-1">New Password</label>
            <div class="relative">
              <input
                v-model="pwForm.newPassword"
                :type="showNew ? 'text' : 'password'"
                class="input-comic pr-16"
                placeholder="••••••••"
                autocomplete="new-password"
              />
              <button
                type="button"
                class="absolute right-3 top-1/2 -translate-y-1/2 font-comic text-xs"
                style="color:var(--text-muted);"
                @click="showNew = !showNew"
              >
                {{ showNew ? 'Hide' : 'Show' }}
              </button>
            </div>
          </div>

          <div>
            <label class="font-comic font-bold text-xs block mb-1">Confirm New Password</label>
            <input
              v-model="pwForm.confirmPassword"
              :type="showNew ? 'text' : 'password'"
              class="input-comic"
              placeholder="••••••••"
              autocomplete="new-password"
            />
          </div>

          <Transition name="field-slide">
            <p
              v-if="pwError"
              class="font-comic text-sm px-3 py-2 border-2 border-black"
              style="background:#FFD700;color:#000;"
            >
              ⚡ {{ pwError }}
            </p>
          </Transition>
          <Transition name="field-slide">
            <p
              v-if="pwSuccess"
              class="font-comic text-sm px-3 py-2 border-2 border-black"
              style="background:#16a34a;color:#fff;"
            >
              ✓ Password changed!
            </p>
          </Transition>

          <button
            type="submit"
            class="btn-ghost px-6 py-2 font-display text-lg flex items-center gap-2"
            :disabled="changingPassword"
          >
            <IconHourglass
              v-if="changingPassword"
              :size="18"
            />
            <IconLockKeyhole
              v-else
              :size="18"
            />
            {{ changingPassword ? 'Updating...' : 'Change Password' }}
          </button>
        </form>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'default', middleware: 'auth' })
useHead({ title: 'Account | Linkdung' })

// ── Account detail ───────────────────────────────────────
const { data: accountData, isLoading: isLoadingAccount } = useAccountQuery()

const accountForm = reactive({ name: '', email: '' })

// Sync form saat data masuk dari server
watch(accountData, (val) => {
  if (val) {
    accountForm.name = val.name ?? ''
    accountForm.email = val.email ?? ''
  }
}, { immediate: true })

// ── Update account ───────────────────────────────────────
const accountError = ref('')
const accountSuccess = ref(false)
const { mutate: updateAccount, isPending: updatingAccount, error: updateErr } = useUpdateAccountMutation()

watch(updateErr, (e) => {
  if (e) accountError.value = (e as Error).message ?? 'Something went wrong.'
})

function handleUpdateAccount() {
  accountError.value = ''
  accountSuccess.value = false
  if (!accountForm.email) { accountError.value = 'Email is required.'; return }

  updateAccount(
    { name: accountForm.name, email: accountForm.email },
    {
      onSuccess: () => {
        accountSuccess.value = true
        setTimeout(() => { accountSuccess.value = false }, 3000)
      },
    },
  )
}

// ── Change password ──────────────────────────────────────
const pwForm = reactive({ currentPassword: '', newPassword: '', confirmPassword: '' })
const showCurrent = ref(false)
const showNew = ref(false)
const pwError = ref('')
const pwSuccess = ref(false)
const { mutate: changePassword, isPending: changingPassword, error: pwErr } = useChangePasswordMutation()

watch(pwErr, (e) => {
  if (e) pwError.value = (e as Error).message ?? 'Something went wrong.'
})

function handleChangePassword() {
  pwError.value = ''
  pwSuccess.value = false

  if (!pwForm.currentPassword) { pwError.value = 'Current password is required.'; return }
  if (!pwForm.newPassword) { pwError.value = 'New password is required.'; return }
  if (pwForm.newPassword.length < 8) { pwError.value = 'New password min. 8 characters.'; return }
  if (pwForm.newPassword !== pwForm.confirmPassword) { pwError.value = 'Passwords do not match.'; return }

  changePassword(
    { currentPassword: pwForm.currentPassword, newPassword: pwForm.newPassword },
    {
      onSuccess: () => {
        pwSuccess.value = true
        pwForm.currentPassword = ''
        pwForm.newPassword = ''
        pwForm.confirmPassword = ''
        setTimeout(() => { pwSuccess.value = false }, 3000)
      },
    },
  )
}
</script>

<style scoped>
.field-slide-enter-active { transition: all 0.25s ease; }
.field-slide-leave-active { transition: all 0.2s ease; }
.field-slide-enter-from   { opacity: 0; transform: translateY(-6px); }
.field-slide-leave-to     { opacity: 0; transform: translateY(6px); }
</style>
