<template>
  <div
    class="landing-page"
    style="color:var(--text-primary);"
  >
    <LandingNavbar />
    <LandingHero />
    <LandingMiddleSections />
    <LandingBottomSections />
  </div>
</template>

<script setup lang="ts">
import { useAccentColor } from '~/composables/useAccentColor'

useHead({
  title: 'Linkdung — One Link to Rule Them All',
  meta: [{ name: 'description', content: 'Link-in-bio platform.' }],
})

// Ensure accent color is applied on this page too
const { initAccentColor } = useAccentColor()
onMounted(() => initAccentColor())
</script>
