import { createPersistedState } from 'pinia-plugin-persistedstate'

export default defineNuxtPlugin((nuxtApp) => {
  // @ts-expect-error - pinia is available via nuxt
  nuxtApp.$pinia.use(createPersistedState({
    storage: import.meta.client
      ? localStorage
      : {
          getItem: () => null,
          setItem: () => {},
          removeItem: () => {},
        },
  }))
})
