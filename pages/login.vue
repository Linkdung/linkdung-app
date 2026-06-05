<template>
  <div
    class="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden"
    style="background:var(--bg-primary);"
  >
    <!-- ── Spider Web Background ─────────────────────────── -->
    <div
      class="fixed inset-0 pointer-events-none"
      aria-hidden="true"
    >
      <svg
        class="absolute inset-0 w-full h-full opacity-[0.06] dark:opacity-[0.10]"
        viewBox="0 0 800 800"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        style="color:var(--border-color);"
      >
        <g
          stroke="currentColor"
          stroke-width="1"
        >
          <line
            v-for="(angle, i) in webLines"
            :key="'l'+i"
            :x1="400"
            :y1="400"
            :x2="400 + Math.cos(angle) * 600"
            :y2="400 + Math.sin(angle) * 600"
          />
          <circle
            v-for="r in webRings"
            :key="'r'+r"
            cx="400"
            cy="400"
            :r="r"
          />
          <path
            v-for="(p, i) in webPaths"
            :key="'p'+i"
            :d="p"
          />
        </g>
      </svg>
      <!-- Corner webs -->
      <svg
        class="absolute top-0 left-0 w-64 h-64 opacity-[0.08] dark:opacity-[0.15]"
        viewBox="0 0 200 200"
        fill="none"
        style="color:var(--accent-primary);"
      >
        <g
          stroke="currentColor"
          stroke-width="1.5"
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
          <path d="M 50,0 Q 25,25 0,50" /><path d="M 100,0 Q 50,50 0,100" />
          <path d="M 150,0 Q 75,75 0,150" /><path d="M 200,0 Q 100,100 0,200" />
        </g>
      </svg>
      <svg
        class="absolute bottom-0 right-0 w-64 h-64 opacity-[0.08] dark:opacity-[0.15]"
        viewBox="0 0 200 200"
        fill="none"
        style="color:var(--accent-primary);"
      >
        <g
          stroke="currentColor"
          stroke-width="1.5"
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
          <path d="M 50,0 Q 25,25 0,50" /><path d="M 100,0 Q 50,50 0,100" />
          <path d="M 150,0 Q 75,75 0,150" /><path d="M 200,0 Q 100,100 0,200" />
        </g>
      </svg>
    </div>

    <!-- ── Outer wrapper ─────────────────────────────────── -->
    <div
      class="relative z-10 w-full max-w-md"
      style="animation:pop-in 0.4s cubic-bezier(0.175,0.885,0.32,1.275);"
    >
      <!-- Logo -->
      <div class="text-center mb-8">
        <NuxtLink
          to="/"
          class="inline-block no-underline group"
        >
          <span
            class="font-display text-5xl tracking-widest block"
            style="color:var(--accent-primary);-webkit-text-stroke:2px var(--border-color);text-shadow:4px 4px 0 var(--border-color);"
          >
            LINKDUNG
          </span>
          <span
            class="font-comic text-sm block mt-1 opacity-60 group-hover:opacity-100 transition-opacity"
            style="color:var(--text-muted);"
          >
            One link to rule them all
          </span>
        </NuxtLink>
      </div>

      <!-- ── FLIP SCENE ────────────────────────────────────── -->
      <div
        class="flip-scene"
        :class="{ flipped: showForgot }"
      >
        <!-- ░░ FRONT — Login / Sign Up ░░░░░░░░░░░░░░░░░░░░ -->
        <div
          class="flip-face flip-front comic-panel p-8"
          style="box-shadow:8px 8px 0 var(--border-color);"
        >
          <!-- Mode tabs -->
          <div
            class="flex mb-7 border-3 border-black overflow-hidden"
            style="border-radius:4px;"
          >
            <button
              class="flex-1 py-2.5 font-display text-lg tracking-wide transition-all"
              :style="mode==='signup' ? 'background:var(--accent-primary);color:#fff;' : 'background:var(--bg-secondary);color:var(--text-muted);'"
              @click="mode='signup'"
            >
              Sign Up
            </button>
            <button
              class="flex-1 py-2.5 font-display text-lg tracking-wide transition-all border-l-3 border-black"
              :style="mode==='login' ? 'background:var(--accent-primary);color:#fff;' : 'background:var(--bg-secondary);color:var(--text-muted);'"
              @click="mode='login'"
            >
              Log In
            </button>
          </div>

          <!-- Form -->
          <form
            class="space-y-4 mb-6"
            @submit.prevent="handleEmail"
          >
            <Transition
              name="field-slide"
              mode="out-in"
            >
              <div
                v-if="mode==='signup'"
                key="username"
                class="space-y-4"
              >
                <div>
                  <label class="font-comic font-bold text-xs block mb-1">Username</label>
                  <div class="relative">
                    <input
                      v-model="form.username"
                      class="input-comic pr-28"
                      placeholder="johndoe"
                      autocomplete="username"
                    />
                    <span
                      v-if="form.username.length >= 3"
                      class="absolute right-3 top-1/2 -translate-y-1/2 font-comic text-xs font-bold"
                      :style="usernameStatus.color"
                    >
                      {{ usernameStatus.label }}
                    </span>
                  </div>
                </div>
              </div>
            </Transition>
            <div>
              <label class="font-comic font-bold text-xs block mb-1">Email</label>
              <input
                v-model="form.email"
                type="email"
                class="input-comic"
                placeholder="you@example.com"
                autocomplete="email"
              />
            </div>
            <div>
              <label class="font-comic font-bold text-xs block mb-1">Password</label>
              <div class="relative">
                <input
                  v-model="form.password"
                  :type="showPassword?'text':'password'"
                  class="input-comic pr-12"
                  placeholder="••••••••"
                  autocomplete="current-password"
                />
                <button
                  type="button"
                  class="absolute right-3 top-1/2 -translate-y-1/2 font-comic text-xs"
                  style="color:var(--text-muted);"
                  @click="showPassword=!showPassword"
                >
                  {{ showPassword ? 'Hide' : 'Show' }}
                </button>
              </div>
            </div>
            <Transition name="field-slide">
              <p
                v-if="errorMsg"
                class="font-comic text-sm px-3 py-2 border-2 border-black"
                style="background:#FFD700;color:#000;"
              >
                ⚡ {{ errorMsg }}
              </p>
            </Transition>
            <button
              type="submit"
              class="btn-comic w-full font-display text-xl text-white mt-2"
              style="background:var(--accent-primary);border-color:#000;box-shadow:5px 5px 0 #000;"
              :disabled="isLoading"
            >
              <span v-if="isLoading">⏳ Loading...</span>
              <span v-else-if="mode==='signup'">Create Account 🕸️</span>
              <span v-else>Log In →</span>
            </button>
            <!-- Forgot password trigger -->
            <div
              v-if="mode==='login'"
              class="text-center pt-1"
            >
              <button
                type="button"
                class="font-comic text-xs underline underline-offset-2 hover:opacity-70 transition-opacity"
                style="color:var(--text-muted);"
                @click="flipToForgot"
              >
                Forgot password?
              </button>
            </div>
          </form>

          <!-- Divider -->
          <div class="flex items-center gap-3 mb-5">
            <div
              class="flex-1 h-px"
              style="background:var(--border-color);"
            />
            <span
              class="font-comic text-xs font-bold"
              style="color:var(--text-muted);"
            >OR CONTINUE WITH</span>
            <div
              class="flex-1 h-px"
              style="background:var(--border-color);"
            />
          </div>

          <!-- OAuth -->
          <div class="space-y-3">
            <button
              class="btn-ghost w-full flex items-center gap-3 px-4 py-3 font-comic font-bold text-sm hover:-translate-y-0.5 transition-transform"
              @click="handleOAuth('google')"
            >
              <svg
                class="w-5 h-5 flex-shrink-0"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>
            <button
              class="btn-ghost w-full flex items-center gap-3 px-4 py-3 font-comic font-bold text-sm hover:-translate-y-0.5 transition-transform"
              @click="handleOAuth('github')"
            >
              <svg
                class="w-5 h-5 flex-shrink-0"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              <span>Continue with GitHub</span>
            </button>
            <button
              class="btn-ghost w-full flex items-center gap-3 px-4 py-3 font-comic font-bold text-sm hover:-translate-y-0.5 transition-transform"
              @click="handleOAuth('discord')"
            >
              <svg
                class="w-5 h-5 flex-shrink-0"
                viewBox="0 0 24 24"
                fill="#5865F2"
              >
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.03.056a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
              </svg>
              <span>Continue with Discord</span>
            </button>
          </div>

          <p
            class="font-comic text-xs text-center mt-6"
            style="color:var(--text-muted);"
          >
            {{ mode==='signup' ? 'Already have an account?' : "Don't have an account?" }}
            <button
              class="font-bold underline underline-offset-2 ml-1"
              style="color:var(--accent-primary);"
              @click="mode = mode==='signup' ? 'login' : 'signup'"
            >
              {{ mode==='signup' ? 'Log In' : 'Sign Up' }}
            </button>
          </p>
        </div><!-- end flip-front -->

        <!-- ░░ BACK — Forgot Password ░░░░░░░░░░░░░░░░░░░░░ -->
        <div
          class="flip-face flip-back comic-panel p-8"
          style="box-shadow:8px 8px 0 var(--border-color);"
        >
          <!-- Mini web decoration -->
          <div
            class="flex justify-center mb-4"
            aria-hidden="true"
          >
            <svg
              width="64"
              height="64"
              viewBox="0 0 64 64"
              fill="none"
            >
              <g
                stroke="currentColor"
                stroke-width="1.2"
                style="color:var(--accent-primary);opacity:0.4;"
              >
                <line
                  x1="32"
                  y1="32"
                  x2="32"
                  y2="4"
                />
                <line
                  x1="32"
                  y1="32"
                  x2="56"
                  y2="18"
                />
                <line
                  x1="32"
                  y1="32"
                  x2="56"
                  y2="46"
                />
                <line
                  x1="32"
                  y1="32"
                  x2="32"
                  y2="60"
                />
                <line
                  x1="32"
                  y1="32"
                  x2="8"
                  y2="46"
                />
                <line
                  x1="32"
                  y1="32"
                  x2="8"
                  y2="18"
                />
                <circle
                  cx="32"
                  cy="32"
                  r="8"
                />
                <circle
                  cx="32"
                  cy="32"
                  r="16"
                />
                <circle
                  cx="32"
                  cy="32"
                  r="24"
                />
              </g>
            </svg>
          </div>

          <div class="text-center mb-6">
            <span
              class="action-text text-3xl block mb-2"
              style="color:var(--accent-primary);"
            >
              FORGOT?
            </span>
            <p
              class="font-comic text-sm leading-relaxed"
              style="color:var(--text-muted);"
            >
              No worries — just drop your email and we'll<br />
              send a reset link your way.
            </p>
          </div>

          <form
            class="space-y-4"
            @submit.prevent="handleForgot"
          >
            <div>
              <label class="font-comic font-bold text-xs block mb-1">Your Email</label>
              <input
                v-model="forgotEmail"
                type="email"
                class="input-comic"
                placeholder="you@example.com"
                autocomplete="email"
              />
            </div>

            <!-- Success banner -->
            <Transition name="field-slide">
              <div
                v-if="forgotSent"
                class="font-comic text-sm px-3 py-3 border-2 border-black text-center"
                style="background:#FFD700;color:#000;"
              >
                Check your inbox! Reset link on its way.
              </div>
            </Transition>

            <!-- Error banner -->
            <Transition name="field-slide">
              <p
                v-if="forgotError"
                class="font-comic text-sm px-3 py-2 border-2 border-black"
                style="background:var(--color-error);color:#fff;"
              >
                ⚡ {{ forgotError }}
              </p>
            </Transition>

            <button
              type="submit"
              class="btn-comic w-full font-display text-xl text-white"
              style="background:var(--accent-primary);border-color:#000;box-shadow:5px 5px 0 #000;"
              :disabled="forgotLoading || forgotSent"
            >
              <span v-if="forgotLoading">⏳ Sending...</span>
              <span v-else-if="forgotSent">✓ Email Sent!</span>
              <span v-else>Send Reset Link →</span>
            </button>
          </form>

          <!-- Back flip -->
          <div class="text-center mt-6">
            <button
              class="font-comic text-sm underline underline-offset-2 hover:opacity-70 transition-opacity"
              style="color:var(--text-muted);"
              @click="flipToLogin"
            >
              ← Back to Log In
            </button>
          </div>
        </div><!-- end flip-back -->
      </div><!-- end flip-scene -->

      <div class="text-center mt-6">
        <NuxtLink
          to="/"
          class="font-comic text-sm no-underline hover:opacity-70 transition-opacity"
          style="color:var(--text-muted);"
        >
          ← Back to home
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'blank' })
useHead({ title: 'Login | Linkdung' })

const route = useRoute()
const mode = ref<'signup' | 'login'>(route.query.mode === 'login' ? 'login' : 'signup')

// ── Form state ───────────────────────────────────────────
const form = reactive({ username: '', email: '', password: '' })
const showPassword = ref(false)
const errorMsg = ref('')

// ── Username availability check (signup only) ────────────
const { data: usernameAvailable, isFetching: checkingUsername } = useUsernameCheck(
  computed(() => form.username),
)

const usernameStatus = computed(() => {
  if (form.username.length < 3) return { label: '', color: '' }
  if (checkingUsername.value) return { label: 'Checking...', color: 'color:var(--text-muted);' }
  if (usernameAvailable.value === true) return { label: '✓ Available', color: 'color:#16a34a;' }
  if (usernameAvailable.value === false) return { label: '✗ Taken', color: 'color:#dc2626;' }
  // Hasil belum kembali — jangan tampilkan status menyesatkan
  return { label: '', color: '' }
})

// ── Forgot password ──────────────────────────────────────
const showForgot = ref(false)
const forgotEmail = ref('')
const forgotLoading = ref(false)
const forgotSent = ref(false)
const forgotError = ref('')

function flipToForgot() {
  forgotEmail.value = form.email
  forgotSent.value = false
  forgotError.value = ''
  showForgot.value = true
}
function flipToLogin() {
  showForgot.value = false
}

async function handleForgot() {
  forgotError.value = ''
  if (!forgotEmail.value.trim()) { forgotError.value = 'Please enter your email.'; return }
  forgotLoading.value = true
  // TODO: $fetch('/api/auth/forgot-password', { method:'POST', body:{ email:forgotEmail.value } })
  await new Promise(r => setTimeout(r, 900))
  forgotLoading.value = false
  forgotSent.value = true
}

// ── Web geometry ─────────────────────────────────────────
const webLines = Array.from({ length: 12 }, (_, i) => (i * Math.PI * 2) / 12)
const webRings = [60, 130, 210, 300, 400]
const webPaths = (() => {
  const paths: string[] = []
  ;[60, 130, 210, 300, 400].forEach((r) => {
    for (let i = 0; i < 12; i++) {
      const a1 = (i * Math.PI * 2) / 12, a2 = ((i + 1) * Math.PI * 2) / 12
      const x1 = 400 + Math.cos(a1) * r, y1 = 400 + Math.sin(a1) * r
      const x2 = 400 + Math.cos(a2) * r, y2 = 400 + Math.sin(a2) * r
      const mx = 400 + Math.cos((a1 + a2) / 2) * (r * 0.92)
      const my = 400 + Math.sin((a1 + a2) / 2) * (r * 0.92)
      paths.push(`M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`)
    }
  })
  return paths
})()

// ── Auth mutations ───────────────────────────────────────
const { mutate: register, isPending: registerPending, error: registerError } = useRegisterMutation()
const { mutate: login, isPending: loginPending, error: loginError } = useLoginMutation()

const isLoading = computed(() => registerPending.value || loginPending.value)

watch([registerError, loginError], ([regErr, logErr]) => {
  const err = regErr || logErr
  if (err) errorMsg.value = (err as Error).message ?? 'Something went wrong.'
})

async function handleEmail() {
  errorMsg.value = ''

  if (!form.email || !form.password) {
    errorMsg.value = 'Email and password are required.'
    return
  }

  if (mode.value === 'signup') {
    if (!form.username || form.username.length < 3) { errorMsg.value = 'Username min. 3 characters.'; return }
    if (usernameAvailable.value === false) { errorMsg.value = 'Username already taken.'; return }

    register({ username: form.username, email: form.email, password: form.password })
  }
  else {
    // username tidak dipakai saat login, kirim string kosong
    login({ username: '', email: form.email, password: form.password })
  }
}

function handleOAuth(provider: 'google' | 'github' | 'discord') {
  navigateTo(`/api/auth/${provider}`, { external: true })
}
</script>

<style scoped>
/* ── Card flip ──────────────────────────────────────────── */
.flip-scene {
  perspective: 1200px;
  position: relative;
}

.flip-front,
.flip-back {
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  transition: transform 0.65s cubic-bezier(0.4, 0.2, 0.2, 1);
  transform-style: preserve-3d;
  width: 100%;
}

/* Front: tampak normal, relative supaya container mengikuti tingginya */
.flip-front { transform: rotateY(0deg); position: relative; }

/* Back: tersembunyi di belakang, absolute supaya overlap front */
.flip-back  { transform: rotateY(180deg); position: absolute; inset: 0; }

/* Flipped state */
.flipped .flip-front { transform: rotateY(-180deg); position: absolute; inset: 0; }
.flipped .flip-back  { transform: rotateY(0deg);    position: relative; }

/* ── Misc animations ────────────────────────────────────── */
@keyframes pop-in {
  from { opacity: 0; transform: scale(0.92) translateY(16px); }
  to   { opacity: 1; transform: scale(1) translateY(0); }
}
.field-slide-enter-active { transition: all 0.25s ease; }
.field-slide-leave-active { transition: all 0.2s ease; }
.field-slide-enter-from   { opacity: 0; transform: translateY(-8px); }
.field-slide-leave-to     { opacity: 0; transform: translateY(8px); }
</style>
