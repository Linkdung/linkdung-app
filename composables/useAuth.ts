/**
 * useAuth.ts
 *
 * Auth composables: Register, Login, Logout, CheckUsername.
 *
 * Backend schema (updated):
 *   input UserInput { username, email, password }
 *   register/login returns: { username, accessToken, refreshToken }
 *   auth.checkUsername(input: String!): Boolean
 */

import { useQuery, useMutation } from '@tanstack/vue-query'
import { useApolloClient } from '@vue/apollo-composable'
import type { AuthUser } from '~/stores/auth'
import { useAuthStore } from '~/stores/auth'
import REGISTER from '~/graphql/mutations/register.gql'
import LOGIN from '~/graphql/mutations/login.gql'
import CHECK_USERNAME from '~/graphql/queries/checkUsername.gql'

// ─── Types ────────────────────────────────────────────────────────────────────

// Sesuai UserInput di backend
export interface UserInput {
  username: string
  email: string
  password: string
}

// Sesuai return type register/login
interface AuthResponse {
  username: string
  accessToken: string
  refreshToken: string
}

// ─── Helper ───────────────────────────────────────────────────────────────────

function useApolloExecute() {
  const { client } = useApolloClient()
  return {
    query: <T>(doc: unknown, variables?: Record<string, unknown>) =>
      client
        .query<T>({ query: doc as never, variables, fetchPolicy: 'network-only' })
        .then(r => r.data),
    mutate: <T>(doc: unknown, variables?: Record<string, unknown>) =>
      client
        .mutate<T>({ mutation: doc as never, variables })
        .then(r => r.data as T),
  }
}

// ─── Cache keys ───────────────────────────────────────────────────────────────

export const authKeys = {
  username: (u: string) => ['auth', 'username-check', u] as const,
}

// ═══════════════════════════════════════════════════════════════════════════
// CHECK USERNAME (signup form)
// ═══════════════════════════════════════════════════════════════════════════

export function useUsernameCheck(username: MaybeRef<string>) {
  const apollo = useApolloExecute()

  return useQuery({
    queryKey: computed(() => authKeys.username(unref(username))),
    queryFn: async () => {
      const data = await apollo.query<{ auth: { checkUsername: boolean } }>(
        CHECK_USERNAME,
        { input: unref(username) },
      )
      return data.auth.checkUsername
    },
    enabled: computed(() => unref(username).length >= 3),
    staleTime: 1000 * 10,
  })
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
      const data = await apollo.mutate<{ auth: { register: AuthResponse } }>(
        REGISTER,
        { input },
      )
      return data.auth.register
    },
    onSuccess: async ({ username, accessToken }) => {
      await onLogin(accessToken)
      authStore.setAuth(accessToken, { username } satisfies AuthUser)
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
    onSuccess: async ({ username, accessToken }) => {
      await onLogin(accessToken)
      authStore.setAuth(accessToken, { username } satisfies AuthUser)
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
