<template>
  <!-- MARQUEE -->
  <div
    class="border-y-3 overflow-hidden py-3"
    style="border-color:var(--border-color); background:var(--accent-primary);"
  >
    <div class="marquee-track whitespace-nowrap">
      <span
        v-for="i in 3"
        :key="i"
        class="inline-block"
      >
        <div
          v-for="item in marqueeItems"
          :key="item.label + i"
          class="font-display text-white text-xl tracking-widest mx-6 inline-block"
        >
          <ClientOnly>
            <component
              :is="iconMap[item.icon as keyof typeof iconMap]"
              :size="36"
              class="inline-block"
            />
            {{ item.label }}
          </ClientOnly>
        </div>
      </span>
    </div>
  </div>

  <!-- FEATURES -->
  <section
    id="features"
    class="py-24 px-4"
  >
    <div class="max-w-6xl mx-auto">
      <div class="text-center mb-16">
        <span
          class="action-text text-6xl block mb-2"
          style="color:var(--accent-primary);"
        >FEATURES</span>
        <p
          class="font-comic text-lg"
          style="color:var(--text-muted);"
        >
          Everything you need. Nothing you don't.
        </p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="feature in features"
          :key="feature.title"
          class="comic-panel p-6 group hover:-translate-y-1 transition-transform duration-200"
        >
          <ClientOnly>
            <div class="text-4xl mb-4">
              <component
                :is="iconMap[feature.icon as keyof typeof iconMap]"
                :size="36"
              />
            </div>
          </ClientOnly>
          <h3
            class="font-display text-2xl mb-2 tracking-wide"
            style="color:var(--text-primary);"
          >
            {{ feature.title }}
          </h3>
          <p
            class="font-comic text-sm leading-relaxed"
            style="color:var(--text-muted);"
          >
            {{ feature.desc }}
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- HOW IT WORKS -->
  <section
    id="how-it-works"
    class="py-24 px-4 border-y-3"
    style="border-color:var(--border-color); background:var(--bg-secondary);"
  >
    <div class="max-w-5xl mx-auto">
      <div class="text-center mb-16">
        <span
          class="action-text text-5xl block mb-2"
          style="color:var(--accent-primary);"
        >HOW IT WORKS</span>
        <p
          class="font-comic text-lg"
          style="color:var(--text-muted);"
        >
          Three steps. That's it. For real.
        </p>
      </div>
      <ClientOnly>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            v-for="(step, i) in howItWorks"
            :key="step.title"
            class="text-center relative"
          >
            <div
              class="w-16 h-16 border-3 border-black font-display text-3xl flex items-center justify-center mx-auto mb-4"
              :style="`background:${['var(--accent-primary)', '#1A3A6B', '#FFD700'][i]}; color:${i === 2 ? '#000' : '#fff'}; box-shadow:4px 4px 0 #000;`"
            >
              {{ i + 1 }}
            </div>
            <div
              v-if="i < 2"
              class="hidden md:block absolute top-8 left-[60%] font-display text-3xl"
              style="color:var(--text-muted);"
            >
              →
            </div>
            <h3 class="font-display text-xl mb-2 tracking-wide">
              {{ step.title }}
            </h3>
            <p
              class="font-comic text-sm"
              style="color:var(--text-muted);"
            >
              {{ step.desc }}
            </p>
          </div>
        </div>
      </ClientOnly>
    </div>
  </section>

  <!-- DEMO -->
  <section
    id="demo"
    class="py-24 px-4"
  >
    <div class="max-w-6xl mx-auto">
      <div class="text-center mb-16">
        <span
          class="action-text text-5xl block mb-2"
          style="color:var(--accent-primary);"
        >SEE IT IN ACTION</span>
        <p
          class="font-comic text-lg"
          style="color:var(--text-muted);"
        >
          Your profile lives at linkdung.app/@you
        </p>
      </div>
      <div
        class="comic-panel overflow-hidden"
        style="background:var(--bg-card);"
      >
        <div
          class="flex items-center gap-3 px-4 py-3 border-b-3"
          style="border-color:var(--border-color); background:var(--bg-secondary);"
        >
          <div class="flex gap-2">
            <span
              class="w-3 h-3 rounded-full border-2 border-black"
              style="background:var(--accent-primary);"
            />
            <span
              class="w-3 h-3 rounded-full border-2 border-black"
              style="background:#FFD700;"
            />
            <span
              class="w-3 h-3 rounded-full border-2 border-black"
              style="background:#16A34A;"
            />
          </div>
          <div
            class="flex-1 border-2 border-black px-3 py-1 font-comic text-sm"
            style="background:var(--bg-card);"
          >
            linkdung.app/@nolep
          </div>
        </div>
        <div class="p-8 grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div class="max-w-xs mx-auto w-full space-y-3">
            <div class="text-center mb-4">
              <div
                class="w-20 h-20 rounded-full border-3 border-black mx-auto flex items-center justify-center text-3xl font-bold text-white mb-2"
                style="background:var(--accent-primary); box-shadow:4px 4px 0 #000;"
              >
                M
              </div>
              <p
                class="font-display text-2xl"
                style="color:var(--text-primary);"
              >
                John Doe
              </p>
              <p
                class="font-comic text-xs"
                style="color:var(--text-muted);"
              >
                @nolep · Photographer & Artist
              </p>
            </div>
            <div
              v-for="ml in demoLinks"
              :key="ml.label"
              class="flex items-center gap-3 border-3 border-black px-4 py-3 font-display text-base cursor-pointer transition-transform hover:-translate-x-1"
              :style="`background:${ml.bg}; color:${ml.text}; box-shadow:5px 5px 0 #000;`"
            >
              <span class="text-xl">{{ ml.emoji }}</span>
              <span>{{ ml.label }}</span>
              <span class="ml-auto opacity-60">→</span>
            </div>
          </div>
          <div class="space-y-4">
            <h3
              class="font-display text-2xl"
              style="color:var(--text-primary);"
            >
              Your Analytics Dashboard
            </h3>
            <div class="grid grid-cols-3 gap-3">
              <div
                class="comic-panel p-3 text-center"
                style="background:var(--accent-primary);"
              >
                <div class="font-display text-2xl text-white">
                  523
                </div>
                <div class="font-comic text-xs text-white opacity-80">
                  Clicks
                </div>
              </div>
              <div
                class="comic-panel p-3 text-center"
                style="background:#1A3A6B;"
              >
                <div class="font-display text-2xl text-white">
                  4
                </div>
                <div class="font-comic text-xs text-white opacity-80">
                  Links
                </div>
              </div>
              <div
                class="comic-panel p-3 text-center"
                style="background:#FFD700;"
              >
                <div class="font-display text-2xl text-black">
                  3
                </div>
                <div class="font-comic text-xs text-black opacity-80">
                  Active
                </div>
              </div>
            </div>
            <div class="comic-panel p-4">
              <p
                class="font-display text-base mb-2"
                style="color:var(--text-primary);"
              >
                Top Link This Week:
              </p>
              <div
                class="flex items-center gap-3 border-2 border-black px-3 py-2"
                style="background:var(--accent-primary);"
              >
                <span class="text-xl">🎨</span>
                <span class="font-display text-base text-white flex-1">My Art Portfolio</span>
                <span class="font-comic text-sm text-white font-bold">247 clicks</span>
              </div>
            </div>
            <div class="comic-panel p-4 space-y-1">
              <p
                class="font-comic text-sm"
                style="color:var(--text-muted);"
              >
                <IconArrowUpDown
                  :size="20"
                  class="inline-block"
                /> Reorder anytime
              </p>
              <p
                class="font-comic text-sm"
                style="color:var(--text-muted);"
              >
                <IconEye
                  :size="20"
                  class="inline-block"
                /> Hide/show links instantly
              </p>
              <p
                class="font-comic text-sm"
                style="color:var(--text-muted);"
              >
                <IconPalette
                  :size="20"
                  class="inline-block"
                /> Change colors & themes live
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import {
  Link, ArrowUpDown, Palette, BarChart2,
  Eye, Star, Smartphone, Moon, Rocket, Shell, Crown,
} from 'lucide-vue-next'

const iconMap = markRaw({ Link, ArrowUpDown, Palette, BarChart2, Eye, Star, Smartphone, Moon, Rocket, Shell, Crown })

const marqueeItems = [
  { icon: 'Crown', label: 'LINK IN BIO' },
  { icon: 'ArrowUpDown', label: 'REORDER LINK' },
  { icon: 'Palette', label: 'FULL CUSTOMIZATION' },
  { icon: 'BarChart2', label: 'ANALYTICS' },
  { icon: 'Moon', label: 'DARK MODE' },
  { icon: 'Link', label: 'UNLIMITED LINKS' },
  { icon: 'Shell', label: 'COMIC STYLE' },
]
const features = [
  { icon: 'Link', title: 'Unlimited Links', desc: 'Add as many links as you want. No limits, no caps, no excuses.' },
  { icon: 'ArrowUpDown', title: 'Reorder Link', desc: 'Reorder links with a simple move. Your layout, your way.' },
  { icon: 'Palette', title: 'Custom Themes', desc: 'Pick your accent color, toggle dark/light, choose card styles — even custom hex.' },
  { icon: 'BarChart2', title: 'Click Analytics', desc: 'Track every click with bar, line, or pie charts on your dashboard.' },
  { icon: 'Eye', title: 'Show / Hide Links', desc: 'Toggle individual links on or off without deleting them.' },
  { icon: 'Star', title: 'Highlight Links', desc: 'Star your most important links so they stand out instantly.' },
  { icon: 'Smartphone', title: 'Mobile First', desc: 'Looks incredible on every device. Built responsive from day 1.' },
  { icon: 'Moon', title: 'Dark & Light Mode', desc: 'Full dark mode support. Your visitors pick what they prefer.' },
  { icon: 'Rocket', title: 'Deploy to Netlify', desc: 'One click deploy. Your profile is live in under 60 seconds.' },
]

const howItWorks = [
  { title: 'Create Your Profile', desc: 'Add your name, bio, and avatar in under 2 minutes.' },
  { title: 'Add Your Links', desc: 'Paste your URLs, pick an emoji, choose a color style, done.' },
  { title: 'Share Your URL', desc: 'Drop linkdung.app/@you in your bio and you\'re instantly live.' },
]
const demoLinks = [
  { emoji: '🎨', label: 'My Art Portfolio', bg: 'var(--accent-primary)', text: '#fff' },
  { emoji: '😎', label: 'Adit Merch', bg: '#1A3A6B', text: '#fff' },
  { emoji: '🎵', label: 'My Spotify', bg: '#FFD700', text: '#000' },
  { emoji: '📸', label: 'Instagram', bg: '#0A0A0A', text: '#fff' },
]
</script>

<style scoped>
.marquee-track {
  display: inline-block;
  animation: marquee 20s linear infinite;
}

@keyframes marquee {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(-33.33%);
  }
}
</style>
