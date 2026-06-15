/**
 * useAccount.ts
 *
 * Composables untuk halaman /account — manage email & password.
 * Data user dari backend (email, name) diambil lewat query GetAccount
 * karena login/register hanya mengembalikan name + accessToken.
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import { useApolloClient } from '@vue/apollo-composable'
import GET_ACCOUNT from '~/graphql/queries/getAccount.gql'
import UPDATE_ACCOUNT from '~/graphql/mutations/updateAccount.gql'
import CHANGE_PASSWORD from '~/graphql/mutations/changePassword.gql'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface AccountDetail {
  name: string
  email: string
}

export interface UpdateAccountInput {
  name?: string
  email?: string
}

export interface ChangePasswordInput {
  currentPassword: string
  newPassword: string
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

// ─── Query Key ────────────────────────────────────────────────────────────────

export const accountKeys = {
  me: () => ['account', 'me'] as const,
}

// ═══════════════════════════════════════════════════════════════════════════
// GET ACCOUNT DETAIL
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Fetch email + name dari backend.
 * Dipanggil saat halaman /account dibuka, bukan saat login.
 */
export function useAccountQuery() {
  const apollo = useApolloExecute()

  return useQuery({
    queryKey: accountKeys.me(),
    queryFn: async () => {
      const data = await apollo.query<{ auth: { me: AccountDetail } }>(GET_ACCOUNT)
      return data.auth.me
    },
    staleTime: 1000 * 60, // 1 menit
  })
}

// ═══════════════════════════════════════════════════════════════════════════
// UPDATE ACCOUNT (name / email)
// ═══════════════════════════════════════════════════════════════════════════

export function useUpdateAccountMutation() {
  const apollo = useApolloExecute()
  const qc = useQueryClient()

  return useMutation({
    mutationFn: async (input: UpdateAccountInput) => {
      const data = await apollo.mutate<{ auth: { updateAccount: AccountDetail } }>(
        UPDATE_ACCOUNT,
        { input },
      )
      return data.auth.updateAccount
    },
    onSuccess: () => {
      // Invalidate agar query re-fetch data terbaru
      qc.invalidateQueries({ queryKey: accountKeys.me() })
    },
  })
}

// ═══════════════════════════════════════════════════════════════════════════
// CHANGE PASSWORD
// ═══════════════════════════════════════════════════════════════════════════

export function useChangePasswordMutation() {
  const apollo = useApolloExecute()

  return useMutation({
    mutationFn: async (input: ChangePasswordInput) => {
      await apollo.mutate(CHANGE_PASSWORD, { input })
    },
  })
}
