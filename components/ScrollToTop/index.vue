<template>
  <div class="fixed bottom-8 right-8 z-50">
    <div v-if="isVisible" @click="scrollToTop" aria-label="scroll to top"
      class="flex h-10 w-10 cursor-pointer items-center justify-center rounded-md bg-primary text-white shadow-md transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp"
    >
      <span class="mt-[6px] h-3 w-3 rotate-45 border-l border-t border-white"></span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isVisible: false,
    };
  },
  methods: {
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
    toggleVisibility() {
      this.isVisible = window.pageYOffset > 300;
    },
  },
  mounted() {
    window.addEventListener("scroll", this.toggleVisibility);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.toggleVisibility);
  },
};
</script>
