<template>
  <section
    id="home"
    class="dark:bg-gray-dark relative z-10 overflow-hidden bg-white pb-16 pt-[215px] md:pb-[215px] md:pt-[245px] xl:pb-[255px] xl:pt-[275px] 2xl:pb-[295px] 2xl:pt-[305px]"
  >
    <div class="container">
      <div class="-mx-4 flex flex-wrap">
        <div class="w-full px-4">
          <div
            class="wow fadeInUp mx-auto max-w-[800px] text-center"
            data-wow-delay=".2s"
          >
            <h1
              class="mb-5 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight"
            >
              Selamat Datang di
              <span class="text-primary">Linkdung [{{ data?.name }}]</span>
            </h1>
            <p
              class="dark:text-body-color-dark mb-12 text-base !leading-relaxed text-body-color sm:text-lg md:text-xl"
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Non rerum
              minima beatae velit fuga, ex iure temporibus error consequuntur.
              Nam ipsa veniam, autem reiciendis ab optio accusamus illum impedit
              commodi earum consequatur est quam? Doloremque, natus veniam
              magnam voluptates eos quidem? Nemo consectetur dolorem tempora
              corporis, laudantium minima maiores perspiciatis.
            </p>
            <div
              class="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0"
            >
              <a
                href=""
                class="rounded-sm bg-primary px-8 py-4 text-base font-semibold text-white duration-300 ease-in-out hover:bg-primary/80"
              >
                🔥 Get Linkdung Pro
              </a>
              <a
                href=""
                class="inline-block rounded-sm bg-black px-8 py-4 text-base font-semibold text-white duration-300 ease-in-out hover:bg-black/90 dark:bg-white/10 dark:text-white dark:hover:bg-white/5"
              >
                Start With Login
              </a>
              <a
                href=""
                class="inline-block rounded-sm bg-black px-8 py-4 text-base font-semibold text-white duration-300 ease-in-out hover:bg-black/90 dark:bg-white/10 dark:text-white dark:hover:bg-white/5"
              >
                Start With Guest Mode 😒
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <HeroCircleBg />
  </section>
</template>

<script setup lang="ts">
const { data } = await useFetch("/api/hello");
</script>
