<template>
  <section id="guest" class="overflow-hidden py-16 md:py-20 lg:py-28">
    <div class="container">
      <div class="-mx-4 flex flex-wrap">
        <div class="w-full px-4">
          <GuestCreate/>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import GuestCreate from './create/GuestCreate.vue';
export default {
  components: {
    GuestCreate,
  },
};
</script>
