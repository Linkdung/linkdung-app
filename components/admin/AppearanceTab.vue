<template>
  <div class="space-y-5">
    <div class="comic-panel p-6">
      <h2 class="font-display text-2xl mb-5" style="color:var(--accent-primary);">🎨 APPEARANCE</h2>

      <!-- Theme mode -->
      <div class="mb-7">
        <h3 class="font-display text-lg mb-3">Theme Mode</h3>
        <div class="flex gap-3">
          <button class="btn-comic px-6 py-3 font-display text-base"
                  :class="!isDark ? 'text-white' : 'btn-ghost'"
                  :style="!isDark ? 'background:var(--accent-primary);border-color:#000;box-shadow:4px 4px 0 #000;' : ''"
                  @click="themeStore.setTheme('light')">
                  <IconSun :size="28" color="#FFD700" />
                  Light
          </button>
          <button class="btn-comic px-6 py-3 font-display text-base"
                  :class="isDark ? 'text-white' : 'btn-ghost'"
                  :style="isDark ? 'background:var(--accent-primary);border-color:#000;box-shadow:4px 4px 0 #000;' : ''"
                  @click="themeStore.setTheme('dark')">
                  <IconMoon :size="28" color="#00D4FF" />
                  Dark
          </button>
        </div>
      </div>

      <!-- Accent color -->
      <div>
        <h3 class="font-display text-lg mb-1">Primary Accent Color</h3>
        <p class="font-comic text-xs mb-4" style="color:var(--text-muted);">
          Mengubah semua elemen primary di seluruh app — buttons, shadows, marquee, hero, chart, dan lebih.
        </p>

        <div class="flex flex-wrap gap-3 mb-5">
          <button v-for="color in ACCENT_COLORS" :key="color.value"
                  class="flex flex-col items-center gap-1 group" :title="color.label"
                  @click="applyAccentColor(color.value)">
            <span class="w-10 h-10 border-3 border-black block transition-all group-hover:scale-110 group-hover:-translate-y-1"
                  :style="{
                    background: color.value,
                    boxShadow: profile.accentColor === color.value
                      ? '0 0 0 3px '+color.value+', 0 0 0 6px #000'
                      : '3px 3px 0 #000',
                  }" />
            <span class="font-comic text-center leading-tight" style="color:var(--text-muted); font-size:10px; max-width:44px;">
              {{ color.label }}
            </span>
          </button>
        </div>

        <div class="flex items-center gap-3 mb-6">
          <label class="font-comic font-bold text-sm flex-shrink-0">Custom:</label>
          <input type="color" :value="profile.accentColor"
                 class="w-10 h-10 border-3 border-black cursor-pointer p-0.5"
                 style="box-shadow:3px 3px 0 #000;"
                 @input="(e) => applyAccentColor((e.target as HTMLInputElement).value)" />
          <input :value="profile.accentColor"
                 class="input-comic w-28 text-sm font-mono uppercase"
                 placeholder="#E23636" maxlength="7"
                 @change="(e) => applyAccentColor((e.target as HTMLInputElement).value)" />
        </div>

        <!-- Live preview -->
        <div class="border-3 border-black p-4" style="background:var(--bg-secondary);">
          <p class="font-comic text-xs font-bold mb-3" style="color:var(--text-muted);">Live preview:</p>
          <div class="flex flex-wrap gap-3 items-center mb-3">
            <button class="btn-comic font-display text-base px-5 py-2"
                    style="background:var(--accent-primary);color:#fff;border-color:#000;box-shadow:4px 4px 0 #000;">
              Button
            </button>
            <span class="action-text text-3xl" style="color:var(--accent-primary);">POW!</span>
            <div class="comic-panel px-4 py-2 font-comic text-sm" style="box-shadow:5px 5px 0 var(--accent-primary);">
              Card Shadow
            </div>
          </div>
          <div class="overflow-hidden border-2 border-black py-2" style="background:var(--accent-primary);">
            <div class="marquee-mini whitespace-nowrap">
              <span v-for="n in 4" :key="n" class="font-display text-white text-sm tracking-widest mx-4 inline-block">
                LINKDUNG · ⚡ YOUR LINKS ·
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Roadmap -->
    <div class="comic-panel p-6">
      <h2 class="font-display text-2xl mb-5 flex flex-row" style="color:var(--accent-primary);">
        <IconRocket :size="28" class="inline-block mb-1" />
        <span>COMING SOON</span>
      </h2>
      <div class="space-y-3">
        <div v-for="item in roadmap" :key="item.title"
             class="flex items-start gap-3 p-3 border-2 border-black"
             :style="{ background: item.bg }">
          <span class="text-2xl flex-shrink-0">{{ item.icon }}</span>
          <div>
            <p class="font-display text-base tracking-wide text-black">{{ item.title }}</p>
            <p class="font-comic text-xs" style="color:#444;">{{ item.desc }}</p>
          </div>
          <span class="ml-auto flex-shrink-0 font-comic text-xs px-2 py-0.5 border-2 border-black font-bold"
                :style="{ background: item.badge === 'Soon' ? '#FFD700' : '#E8E8E8', color: '#000' }">
            {{ item.badge }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ACCENT_COLORS } from '~/composables/useLinkStyles'
import { useAccentColor } from '~/composables/useAccentColor'
import { useProfileStore } from '~/stores/profile'
import { useThemeStore } from '~/stores/theme'

const { applyAccentColor } = useAccentColor()
const { profile } = storeToRefs(useProfileStore())
const themeStore = useThemeStore()
const { isDark } = storeToRefs(themeStore)

const roadmap = [
  { icon: '🔐', title: 'Authentication & Login',  desc: 'Multi-user support dengan OAuth (Google, GitHub)',     badge: 'Soon',    bg: '#fff3cd' },
  { icon: '🌐', title: 'Custom Domain',           desc: 'Point yourdomain.com ke profil Linkdung kamu',      badge: 'Soon',    bg: '#d1ecf1' },
  { icon: '📧', title: 'Email Capture Widget',    desc: 'Tambahkan newsletter signup langsung di profil',      badge: 'Soon',    bg: '#d4edda' },
  { icon: '🎬', title: 'Embedded Media Blocks',   desc: 'YouTube preview, Spotify player, tweet embed inline', badge: 'Planned', bg: '#f8d7da' },
  { icon: '💳', title: 'Payments & Tip Jar',      desc: 'Terima donasi atau jual produk digital via Stripe',  badge: 'Planned', bg: '#fff3cd' },
  { icon: '📅', title: 'Scheduled Links',         desc: 'Auto show/hide link berdasarkan jadwal',             badge: 'Planned', bg: '#d1ecf1' },
  { icon: '📲', title: 'QR Code Generator',       desc: 'QR code branded untuk profil kamu',                 badge: 'Ideas',   bg: '#e8e8e8' },
  { icon: '🤝', title: 'Team / Agency Profiles',  desc: 'Kelola banyak profil dalam satu akun',              badge: 'Ideas',   bg: '#e8e8e8' },
]
</script>

<style scoped>
.marquee-mini { display: inline-block; animation: marquee-mini 6s linear infinite; }
@keyframes marquee-mini { from { transform: translateX(0); } to { transform: translateX(-50%); } }
</style>
