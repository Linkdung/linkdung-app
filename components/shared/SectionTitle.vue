<template>
  <div
  class="wow fadeInUp w-full"
  :class="{ 'mx-auto text-center': center }"
  data-wow-delay=".1s"
  :style="{ maxWidth: width, marginBottom: mb }"
>
    <h2 class="mb-4 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl md:text-[45px]">
      {{ title }}
    </h2>
    <p class="text-base leading-relaxed text-body-color md:text-lg">
      {{ paragraph }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    paragraph: {
      type: String,
      required: true,
    },
    width: {
      type: String,
      default: "570px",
    },
    center: {
      type: Boolean,
      default: false,
    },
    mb: {
      type: String,
      default: "100px",
    },
  },
};
</script>
