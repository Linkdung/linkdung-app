<template>
  <div>
    <slot />
    <Footer v-if="shouldShowFooter" />
    <ScrollToTop />
  </div>
</template>

<script>
export default {
  computed: {
    shouldShowFooter() {
      return !this.$route.path.includes('guest');
      // return !['/guest', '/login'].includes(this.$route.path);
    },
  },
};
</script>
