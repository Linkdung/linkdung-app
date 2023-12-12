<template>
  <section class="relative z-10 py-16 md:py-20 lg:py-28">
    <div class="container">
      <SectionTitle
        title="Are You Ready To Get Started?"
        paragraph="There are many variant of style you can choose for youre collapse link"
        center
        mb="80px"
      />

      <div class="-mx-4 flex flex-wrap">
        <div class="w-full px-4">
          <div
            class="wow fadeInUp mx-auto max-w-[770px] overflow-hidden rounded-md"
            data-wow-delay=".15s"
          >
            <div class="relative aspect-[77/40] items-center justify-center">
              <div
                class="absolute right-0 top-0 flex h-full w-full items-center justify-center"
              >
                <button
                  aria-label="video play button"
                  @click="()=>this.$router.push('/guest')"
                  class="border flex h-[120px] w-[140px] items-center justify-center rounded-md bg-white text-primary transition-transform duration-300 ease-in-out transform-gpu hover:scale-110 hover:bg-primary hover:text-white"
                >
                  <svg
                    width="32"
                    height="36"
                    viewBox="0 0 16 18"
                    class="fill-current"
                  >
                    <path
                      d="M15.5 8.13397C16.1667 8.51888 16.1667 9.48112 15.5 9.86602L2 17.6603C1.33333 18.0452 0.499999 17.564 0.499999 16.7942L0.5 1.20577C0.5 0.43597 1.33333 -0.0451549 2 0.339745L15.5 8.13397Z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="absolute bottom-0 left-0 right-0 z-[-1] h-full w-full bg-[url(/img/shape-bg/shape.svg)] bg-cover bg-center bg-no-repeat"
    ></div>
  </section>
</template>

<script>
import SectionTitle from "../shared/SectionTitle.vue";

export default {
  components: {
    SectionTitle,
  },
};
</script>
