<template>
  <div></div>
</template>

<script lang="ts">
export default {
  mounted() {
    this.$nextTick(() => {
      window.document.scrollingElement?.scrollTo(0, 0);
    });
  }
};
</script>