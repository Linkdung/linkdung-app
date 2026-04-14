import { defineStore } from 'pinia'

// Sesuai type User di backend schema
export interface AuthUser {
  name: string
}

export const useAuthStore = defineStore('auth', () => {
  const accessToken = ref<string | null>(null)
  const user = ref<AuthUser | null>(null)

  const isAuthenticated = computed(() => !!accessToken.value && !!user.value)

  function setAuth(token: string, newUser: AuthUser) {
    accessToken.value = token
    user.value = newUser
  }

  function clearAuth() {
    accessToken.value = null
    user.value = null
  }

  return { accessToken, user, isAuthenticated, setAuth, clearAuth }
}, {
  persist: {
    key: 'linkdung-auth',
    storage: import.meta.client ? localStorage : undefined,
    pick: ['accessToken', 'user'],
  },
})
