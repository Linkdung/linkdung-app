<template>
  <section id="guest" class="overflow-hidden py-16 md:py-20 lg:py-28">
    <div class="container">
      <div class="-mx-4 flex flex-wrap">
        <div class="w-full px-4">
          <div class="w-full px-4">
            <button
              class="m-2 shadow-submit dark:shadow-submit-dark rounded-md bg-primary px-7 py-3 text-base font-medium text-white duration-300 hover:bg-primary/90"
              @click="setPreview"
            >
              {{ isPreview ? "Create" : "Preview" }}
            </button>
          </div>
          <GuestCreate :isPreview="isPreview" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import GuestCreate from "./create/GuestCreate.vue";
import { ref } from "vue";

export default {
  components: {
    GuestCreate,
  },
  setup() {
    const isPreview = ref(false);

    const setPreview = () => {
      isPreview.value = !isPreview.value;
    };

    return {
      isPreview,
      setPreview,
    };
  },
};
</script>
