<template>
  <section
    id="home"
    class="relative overflow-hidden pt-20 pb-24 px-4"
  >
    <div class="absolute inset-0 pointer-events-none overflow-hidden">
      <div
        class="absolute top-10 left-10 w-72 h-72 rounded-full opacity-10 animate-float"
        style="background:var(--accent-primary); filter:blur(60px);"
      />
      <div
        class="absolute bottom-10 right-10 w-96 h-96 rounded-full opacity-10 animate-float"
        style="background:#1A3A6B; filter:blur(80px); animation-delay:1s;"
      />
      <div
        class="absolute top-1/2 left-1/2 w-48 h-48 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-10 animate-float"
        style="background:#FFD700; filter:blur(60px); animation-delay:2s;"
      />
    </div>
    <div class="max-w-6xl mx-auto relative z-10">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <div
            class="inline-flex items-center gap-2 border-3 border-black px-4 py-2 mb-6 font-comic font-bold text-sm"
            style="background:#FFD700; color:#000; box-shadow:3px 3px 0 #000;"
          >
            Linkdung · Free to Use
          </div>
          <h1
            class="font-display tracking-wide leading-none mb-6"
            style="font-size:clamp(3rem,8vw,5.5rem); color:var(--text-primary);"
          >
            ONE LINK<br />
            <span style="color:var(--accent-primary); -webkit-text-stroke:2px #000; text-shadow:5px 5px 0 #000;">
              TO RULE
            </span><br />
            THEM ALL
          </h1>
          <p
            class="font-comic text-lg mb-8 leading-relaxed"
            style="color:var(--text-secondary); max-width:480px;"
          >
            The most <strong>badass</strong> link-in-bio tool in the multiverse.
            Share all your links with a comic book flair that actually slaps.
          </p>
          <div class="flex flex-wrap gap-4">
            <NuxtLink
              to="/admin"
              class="btn-comic font-display text-xl px-8 py-4 no-underline text-white"
              style="background:var(--accent-primary); border-color:#000; box-shadow:6px 6px 0 #000;"
            >
              <IconRocket
                :size="28"
                class="inline-block"
              />
              Start for Free
            </NuxtLink>
            <a
              href="#demo"
              class="btn-ghost font-display text-xl px-8 py-4 no-underline"
            >
              <IconEye
                :size="28"
                class="inline-block"
              />
              See Demo
            </a>
          </div>
          <div class="flex gap-8 mt-10">
            <div
              v-for="stat in stats"
              :key="stat.label"
              class="text-center"
            >
              <div
                class="font-display text-3xl"
                style="color:var(--accent-primary);"
              >
                {{ stat.value }}
              </div>
              <div
                class="font-comic text-xs"
                style="color:var(--text-muted);"
              >
                {{ stat.label }}
              </div>
            </div>
          </div>
        </div>
        <!-- Phone mockup -->
        <div class="flex justify-center lg:justify-end">
          <div class="relative">
            <div
              class="relative w-64 comic-panel overflow-hidden"
              style="border-width:4px; border-radius:32px; box-shadow:10px 10px 0 #000; background:var(--bg-card);"
            >
              <div
                class="h-8 flex items-center justify-center"
                style="background:var(--accent-primary);"
              >
                <span class="font-comic text-xs text-white font-bold">linkdung.app/nolep</span>
              </div>
              <div class="p-4 space-y-3">
                <div class="text-center py-2">
                  <div
                    class="w-16 h-16 rounded-full border-3 border-black mx-auto flex items-center justify-center text-3xl font-bold text-white mb-2"
                    style="background:var(--accent-primary); box-shadow:3px 3px 0 #000;"
                  >
                    M
                  </div>
                  <p
                    class="font-display text-lg"
                    style="color:var(--text-primary);"
                  >
                    John Doe
                  </p>
                  <p
                    class="font-comic text-xs"
                    style="color:var(--text-muted);"
                  >
                    @nolep
                  </p>
                </div>
                <div
                  v-for="ml in mockLinks"
                  :key="ml.label"
                  class="flex items-center gap-2 border-2 border-black px-3 py-2 font-display text-sm"
                  :style="`background:${ml.bg}; color:${ml.text}; box-shadow:3px 3px 0 #000;`"
                >
                  <span>{{ ml.emoji }}</span><span class="truncate px-2">{{ ml.label }}</span>
                </div>
              </div>
            </div>
            <div
              class="absolute -top-4 -right-4 comic-panel px-3 py-2 font-display text-sm float-anim"
              style="background:#FFD700; color:#000; animation-delay:0.5s;"
            >
              247 clicks!
              <IconZap
                :size="18"
                class="inline-block"
              />
            </div>
            <div
              class="absolute -bottom-4 -left-4 comic-panel px-3 py-2 font-display text-sm float-anim"
              style="background:var(--accent-primary); color:#fff; animation-delay:1s;"
            >
              Drag & Drop!
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const stats = [
  { value: '50K+', label: 'Users' },
  { value: '2M+', label: 'Clicks tracked' },
  { value: '100%', label: 'Free to start' },
]
const mockLinks = [
  { emoji: '🎨', label: 'My Art Portfolio', bg: 'var(--accent-primary)', text: '#fff' },
  { emoji: '🛍️', label: 'Adit Merch', bg: '#1A3A6B', text: '#fff' },
  { emoji: '🎵', label: 'My Spotify', bg: '#FFD700', text: '#000' },
  { emoji: '📸', label: 'Instagram', bg: '#0A0A0A', text: '#fff' },
]
</script>
