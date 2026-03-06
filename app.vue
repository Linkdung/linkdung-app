<template>
  <div :class="isDark ? 'dark' : ''" class="min-h-screen halftone-bg">
    <SpiderWebCorners />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { useThemeStore } from '~/stores/theme'
import { _setCssVars } from '~/composables/useAccentColor'
import { useProfileStore } from '~/stores/profile'

const themeStore = useThemeStore()
const profileStore = useProfileStore()
const { isDark } = storeToRefs(themeStore)

// Re-apply accent vars setiap kali theme berubah (dark class reset CSS cascade)
watch(isDark, () => {
  _setCssVars(profileStore.profile.accentColor || '#E23636')
}, { immediate: false })

onMounted(() => {
  themeStore.initTheme()
  _setCssVars(profileStore.profile.accentColor || '#E23636')
})
</script>
