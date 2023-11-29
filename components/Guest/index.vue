<template>
  <section
    id="home"
    class="dark:bg-white relative z-10 overflow-hidden bg-gray-dark pb-16 pt-[160px] md:pb-[160px] md:pt-[190px] xl:pb-[200px] xl:pt-[240px] 2xl:pb-[240px] 2xl:pt-[250px]"
  >
    <div class="container">
      <div class="-mx-4 flex flex-wrap">
        <div class="w-full px-4 py-60">
          <div
            class="wow fadeInUp mx-auto max-w-[800px] text-center"
            data-wow-delay=".2s"
          >
            <div
              class="absolute left-1/2 top-1/2 h-96 w-80 -translate-x-1/2 -translate-y-1/2 rotate-6 rounded-2xl bg-gray-400"
            ></div>
            <!-- This is the shadow -->

            <div
              class="absolute left-1/2 top-1/2 h-96 w-80 -translate-x-1/2 -translate-y-1/2 rotate-6 space-y-6 rounded-2xl bg-gray-100 p-6 transition duration-300 hover:rotate-0"
            >
              <!-- This is the card -->
              <div class="flex justify-end">
                <div class="h-4 w-4 rounded-full bg-gray-400"></div>
                <!-- This is the dot -->
              </div>

              <header class="text-center text-xl font-extrabold text-gray-600">
                Empty Paper Link
              </header>

              <div>
                <p class="text-center text-5xl font-extrabold text-gray-900">
                  Try out Linkdung
                </p>
                <p class="text-center text-4xl font-extrabold text-primary">
                  Easy way wrap your link
                </p>
              </div>

              <footer class="mb-10 flex justify-center">
                <button
                  class="flex items-baseline gap-2 rounded-lg bg-primary px-4 py-2.5 text-xl font-bold text-white hover:bg-opacity-80 transition duration-300 ease-in-out"
                >
                  <span>Start</span>
                  <i class="fas fa-hand-peace text-xl"></i>
                </button>
              </footer>
            </div>  
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts"></script>
