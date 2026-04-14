/**
 * useAuth.ts
 *
 * Auth composables: Register, Login, Logout.
 * Pola sama dengan useProfile.ts — Apollo execute → TanStack mutation → store sync.
 *
 * Backend schema:
 *   input UserInput { name, email, password }  ← satu input untuk keduanya
 *   type User { name, accessToken }
 *   AuthOps.register(input: UserInput!): Any!
 *   AuthOps.login(input: UserInput!):    Any!
 *
 * Flow:
 *   Form submit → useMutation.mutate(input)
 *     → Apollo GraphQL mutation (return Any — di-cast ke AuthResponse)
 *     → onSuccess: onLogin(accessToken) + update authStore → redirect /admin
 */

import { useMutation } from '@tanstack/vue-query'
import { useApolloClient } from '@vue/apollo-composable'
import type { AuthUser } from '~/stores/auth'
import { useAuthStore } from '~/stores/auth'
import REGISTER from '~/graphql/mutations/register.gql'
import LOGIN from '~/graphql/mutations/login.gql'

// ─── Types ────────────────────────────────────────────────────────────────────

// Sesuai UserInput di backend — satu input untuk register & login
export interface UserInput {
  name: string
  email: string
  password: string
}

// Sesuai User type di backend — Any! di-cast ke ini
interface AuthResponse {
  name: string
  accessToken: string
}

// ─── Helper: Apollo → Promise ─────────────────────────────────────────────────

function useApolloExecute() {
  const { client } = useApolloClient()
  return {
    mutate: <T>(doc: unknown, variables?: Record<string, unknown>) =>
      client
        .mutate<T>({ mutation: doc as never, variables })
        .then(r => r.data as T),
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// REGISTER
// ═══════════════════════════════════════════════════════════════════════════

export function useRegisterMutation() {
  const apollo = useApolloExecute()
  const authStore = useAuthStore()
  const { onLogin } = useApollo()
  const router = useRouter()

  return useMutation({
    mutationFn: async (input: UserInput) => {
      // Return Any! — Apollo beri data mentah, cast manual
      const data = await apollo.mutate<{ auth: { register: AuthResponse } }>(
        REGISTER,
        { input },
      )
      return data.auth.register
    },
    onSuccess: async ({ name, accessToken }) => {
      // Simpan token ke cookie Apollo — semua request berikutnya pakai Bearer token
      await onLogin(accessToken)
      authStore.setAuth(accessToken, { name } satisfies AuthUser)
      await router.push('/admin')
    },
  })
}

// ═══════════════════════════════════════════════════════════════════════════
// LOGIN
// ═══════════════════════════════════════════════════════════════════════════

export function useLoginMutation() {
  const apollo = useApolloExecute()
  const authStore = useAuthStore()
  const { onLogin } = useApollo()
  const router = useRouter()

  return useMutation({
    mutationFn: async (input: UserInput) => {
      const data = await apollo.mutate<{ auth: { login: AuthResponse } }>(
        LOGIN,
        { input },
      )
      return data.auth.login
    },
    onSuccess: async ({ name, accessToken }) => {
      await onLogin(accessToken)
      authStore.setAuth(accessToken, { name } satisfies AuthUser)
      await router.push('/admin')
    },
  })
}

// ═══════════════════════════════════════════════════════════════════════════
// LOGOUT
// ═══════════════════════════════════════════════════════════════════════════

export function useLogout() {
  const authStore = useAuthStore()
  const { onLogout } = useApollo()
  const router = useRouter()

  return async () => {
    await onLogout()
    authStore.clearAuth()
    await router.push('/login?mode=login')
  }
}
