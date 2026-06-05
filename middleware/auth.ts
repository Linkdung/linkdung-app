/**
 * auth middleware — proteksi halaman yang butuh login (/admin, /account).
 *
 * Auth state (token + user) di-persist ke localStorage lewat Pinia, jadi
 * hanya tersedia di client. Di server isAuthenticated selalu false, maka
 * enforcement dilakukan client-side saja untuk menghindari false redirect
 * saat SSR (user yang sudah login tidak ikut ke-redirect).
 */
export default defineNuxtRouteMiddleware(() => {
  if (import.meta.server) return

  const authStore = useAuthStore()
  if (!authStore.isAuthenticated) {
    return navigateTo('/login?mode=login')
  }
})
