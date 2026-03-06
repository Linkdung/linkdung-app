<template>
  <!-- TEMPLATES -->
  <section
    id="templates"
    class="py-24 px-4 border-y-3"
    style="border-color:var(--border-color); background:var(--bg-secondary);"
  >
    <div class="max-w-6xl mx-auto">
      <div class="text-center mb-16">
        <span
          class="action-text text-5xl block mb-2"
          style="color:var(--accent-primary);"
        >TEMPLATES</span>
        <p
          class="font-comic text-lg"
          style="color:var(--text-muted);"
        >
          Pick a theme. Make it yours.
        </p>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        <div
          v-for="template in templates"
          :key="template.name"
          class="comic-panel overflow-hidden group cursor-pointer transition-transform hover:-translate-y-2"
        >
          <div
            class="h-32 flex items-center justify-center text-5xl"
            :style="`background:${template.bg};`"
          >
            {{ template.icon }}
          </div>
          <div
            class="p-3 border-t-3"
            style="border-color:var(--border-color);"
          >
            <p
              class="font-display text-base tracking-wide"
              style="color:var(--text-primary);"
            >
              {{ template.name }}
            </p>
            <p
              class="font-comic text-xs"
              style="color:var(--text-muted);"
            >
              {{ template.desc }}
            </p>
            <span
              v-if="template.badge"
              class="inline-block mt-1 px-2 py-0.5 text-xs font-comic font-bold border-2 border-black"
              :style="`background:${template.badgeColor}; color:${template.badgeText};`"
            >{{ template.badge }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- TESTIMONIALS -->
  <section class="py-24 px-4">
    <div class="max-w-6xl mx-auto">
      <div class="text-center mb-16">
        <span
          class="action-text text-5xl block mb-2"
          style="color:var(--accent-primary);"
        >THEY LOVE IT</span>
        <p
          class="font-comic text-lg"
          style="color:var(--text-muted);"
        >
          Don't take our word for it.
        </p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="review in testimonials"
          :key="review.name"
          class="comic-panel p-6 hover:-translate-y-1 transition-transform duration-200"
          :style="`box-shadow:6px 6px 0 ${review.shadowColor};`"
        >
          <div class="flex gap-1 mb-3">
            <span
              v-for="s in 5"
              :key="s"
              class="text-lg"
            >⭐</span>
          </div>
          <p class="font-comic text-sm leading-relaxed mb-4">
            "{{ review.text }}"
          </p>
          <div class="flex items-center gap-3">
            <div
              class="w-10 h-10 rounded-full border-2 border-black flex items-center justify-center text-lg font-bold text-white"
              :style="`background:${review.avatarBg};`"
            >
              {{ review.name.charAt(0) }}
            </div>
            <div>
              <p
                class="font-display text-base"
                style="color:var(--text-primary);"
              >
                {{ review.name }}
              </p>
              <p
                class="font-comic text-xs"
                style="color:var(--text-muted);"
              >
                {{ review.role }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- PRICING -->
  <section
    id="pricing"
    class="py-24 px-4 border-y-3"
    style="border-color:var(--border-color); background:var(--bg-secondary);"
  >
    <div class="max-w-5xl mx-auto">
      <div class="text-center mb-16">
        <span
          class="action-text text-5xl block mb-2"
          style="color:#FFD700; -webkit-text-stroke:2px #000;"
        >PRICING</span>
        <p
          class="font-comic text-lg"
          style="color:var(--text-muted);"
        >
          Transparent. Simple. Actually fair.
        </p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          v-for="plan in pricingPlans"
          :key="plan.name"
          class="comic-panel p-6 relative"
          :style="plan.featured ? 'box-shadow:8px 8px 0 var(--accent-primary); border-color:var(--accent-primary);' : ''"
        >
          <div
            v-if="plan.badge"
            class="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 font-display text-sm border-3 border-black"
            style="background:var(--accent-primary); color:#fff; box-shadow:2px 2px 0 #000;"
          >
            {{ plan.badge }}
          </div>
          <div class="text-3xl mb-3">
            {{ plan.icon }}
          </div>
          <h3
            class="font-display text-2xl tracking-wide mb-1"
            style="color:var(--text-primary);"
          >
            {{ plan.name }}
          </h3>
          <div class="flex items-baseline gap-1 mb-4">
            <span
              class="font-display text-4xl"
              :style="plan.featured ? 'color:var(--accent-primary);' : 'color:var(--text-primary);'"
            >
              {{ plan.price }}
            </span>
            <span
              class="font-comic text-sm"
              style="color:var(--text-muted);"
            >{{ plan.period }}</span>
          </div>
          <ul class="space-y-2 mb-6">
            <li
              v-for="feat in plan.features"
              :key="feat"
              class="flex items-start gap-2 font-comic text-sm"
            >
              <span :style="feat.startsWith('✗') ? 'color:#aaa;' : 'color:#16A34A;'">{{ feat.startsWith('✗') ? '✗' : '✓' }}</span>
              <span :style="feat.startsWith('✗') ? 'color:var(--text-muted);' : 'color:var(--text-primary);'">{{ feat.replace('✗ ', '') }}</span>
            </li>
          </ul>
          <button
            class="btn-comic w-full font-display text-base py-3"
            :style="plan.featured ? 'background:var(--accent-primary); color:#fff; border-color:#000; box-shadow:4px 4px 0 #000;' : ''"
          >
            {{ plan.cta }}
          </button>
        </div>
      </div>
    </div>
  </section>

  <!-- FAQ -->
  <section
    id="faq"
    class="py-24 px-4"
  >
    <div class="max-w-3xl mx-auto">
      <div class="text-center mb-16">
        <span
          class="action-text text-5xl block mb-2"
          style="color:var(--accent-primary);"
        >GOT QUESTIONS?</span>
        <p
          class="font-comic text-lg"
          style="color:var(--text-muted);"
        >
          We got answers. Obviously.
        </p>
      </div>
      <div class="space-y-4">
        <div
          v-for="(item, i) in faqs"
          :key="i"
          class="comic-panel overflow-hidden"
        >
          <button
            class="w-full text-left px-6 py-4 flex items-center justify-between gap-4 font-display text-base tracking-wide"
            style="color:var(--text-primary); background:transparent; border:none; cursor:pointer;"
            @click="openFaq = openFaq===i ? null : i"
          >
            <span>{{ item.q }}</span>
            <span
              class="text-xl flex-shrink-0 transition-transform duration-200"
              :class="openFaq===i ? 'rotate-45' : ''"
            >+</span>
          </button>
          <Transition name="accordion">
            <div
              v-if="openFaq===i"
              class="px-6 pb-5 font-comic text-sm leading-relaxed border-t-2"
              style="border-color:var(--border-color); color:var(--text-muted);"
            >
              {{ item.a }}
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section
    class="py-24 px-4 border-y-3"
    style="border-color:var(--border-color); background:var(--accent-primary);"
  >
    <div class="max-w-3xl mx-auto text-center">
      <span
        class="action-text text-6xl block mb-4 text-white"
        style="text-shadow:4px 4px 0 #000;"
      >READY?</span>
      <p class="font-comic text-xl text-white mb-8 opacity-90">
        Your audience is waiting. Your links are scattered. Fix that — right now.
      </p>
      <NuxtLink
        to="/admin"
        class="btn-comic font-display text-2xl px-10 py-5 no-underline"
        style="background:#FFD700; color:#000; border-color:#000; box-shadow:6px 6px 0 #000;"
      >
        Create Your Linkdung — FREE
      </NuxtLink>
      <p class="font-comic text-sm text-white mt-4 opacity-70">
        No credit card. No catch. Just your links.
      </p>
    </div>
  </section>

  <!-- FOOTER -->
  <footer
    class="py-12 px-4 border-t-3"
    style="border-color:var(--border-color);"
  >
    <div class="max-w-6xl mx-auto">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
        <div>
          <p
            class="font-display text-2xl mb-3"
            style="color:var(--accent-primary);"
          >
            Linkdung
          </p>
          <p
            class="font-comic text-sm leading-relaxed"
            style="color:var(--text-muted);"
          >
            The Collected Link link-in-bio tool. Built different.
          </p>
        </div>
        <div
          v-for="col in footerCols"
          :key="col.title"
        >
          <p
            class="font-display text-base tracking-wide mb-3"
            style="color:var(--text-primary);"
          >
            {{ col.title }}
          </p>
          <ul class="space-y-2">
            <li
              v-for="link in col.links"
              :key="link"
            >
              <a
                href="#"
                class="font-comic text-sm no-underline transition-opacity hover:opacity-70"
                style="color:var(--text-muted);"
              >{{ link }}</a>
            </li>
          </ul>
        </div>
      </div>
      <div
        class="border-t-3 pt-6 flex flex-col md:flex-row items-center justify-between gap-4"
        style="border-color:var(--border-color);"
      >
        <p
          class="font-comic text-sm"
          style="color:var(--text-muted);"
        >
          © 2023 Linkdung. Made with Nolep Corp.
        </p>
        <div class="flex gap-4">
          <a
            href="#"
            class="font-comic text-sm no-underline"
            style="color:var(--text-muted);"
          >Privacy</a>
          <a
            href="#"
            class="font-comic text-sm no-underline"
            style="color:var(--text-muted);"
          >Terms</a>
          <a
            href="#"
            class="font-comic text-sm no-underline"
            style="color:var(--text-muted);"
          >Contact</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const openFaq = ref<number | null>(null)

const templates = [
  { name: 'Main', icon: '😎', bg: '#E23636', desc: 'Bold red & comic book', badge: 'Default', badgeColor: '#FFD700', badgeText: '#000' },
  { name: 'Noir', icon: '🌃', bg: '#0A0A0A', desc: 'Dark & mysterious', badge: null, badgeColor: '', badgeText: '' },
  { name: 'Gwen', icon: '🩷', bg: '#FF2D78', desc: 'Pink & pastel vibes', badge: 'Popular', badgeColor: '#E23636', badgeText: '#fff' },
  { name: '2099', icon: '🔮', bg: '#00D4FF', desc: 'Futuristic cyan blue', badge: null, badgeColor: '', badgeText: '' },
  { name: 'City Night', icon: '🏙️', bg: '#1A3A6B', desc: 'Deep navy classic', badge: null, badgeColor: '', badgeText: '' },
  { name: 'Web Gold', icon: '✨', bg: '#FFD700', desc: 'Bold golden energy', badge: null, badgeColor: '', badgeText: '' },
  { name: 'Noir Purple', icon: '🟣', bg: '#7B2FBE', desc: 'Elegant purple tones', badge: 'New', badgeColor: '#16A34A', badgeText: '#fff' },
  { name: 'Ink Green', icon: '🌿', bg: '#16A34A', desc: 'Fresh & organic', badge: null, badgeColor: '', badgeText: '' },
]
const testimonials = [
  { name: 'Asep K.', role: 'Content Creator', text: 'Finally a link-in-bio tool that doesn\'t look like every other boring white card. My followers keep asking how I made it.', shadowColor: 'var(--accent-primary)', avatarBg: '#E23636' },
  { name: 'Memet P.', role: 'Freelance Designer', text: 'The drag-and-drop is buttery smooth. I reorder my links every week and it takes literally 5 seconds.', shadowColor: '#1A3A6B', avatarBg: '#1A3A6B' },
  { name: 'Dimas T.', role: 'Musician', text: 'I switched from another tool and my click rate went up 40%. Just makes people want to click.', shadowColor: '#FF2D78', avatarBg: '#FF2D78' },
  { name: 'Budiono S.', role: 'Startup Founder', text: 'The analytics dashboard alone is worth it. Bar, line, and pie chart — I can see exactly which links drive traffic.', shadowColor: '#FFD700', avatarBg: '#7B2FBE' },
  { name: 'Mega W.', role: 'Instagram Influencer', text: 'The emoji + color picker is such a fun combo. I spent way too long styling my links but the result is 🔥', shadowColor: '#16A34A', avatarBg: '#16A34A' },
  { name: 'Mul Ono.', role: 'Photographer', text: 'Dark mode looks INSANE. My whole aesthetic is dark and gritty and this was the first link-in-bio tool that actually matched.', shadowColor: '#0A0A0A', avatarBg: '#0A0A0A' },
]
const pricingPlans = [
  { name: 'Free', icon: '🕸️', price: '$0', period: 'forever', featured: false, badge: null,
    cta: 'Start Free', features: ['Unlimited links', 'Basic analytics', '5 card styles + custom color', 'Dark & light mode', '✗ Custom domain', '✗ Priority support'] },
  { name: 'Pro', icon: '🕷️', price: '$5', period: '/month', featured: true, badge: '⭐ Most Popular',
    cta: 'Go Pro', features: ['Everything in Free', 'Advanced analytics (bar/line/pie)', 'Custom domain', 'Remove branding', 'Priority support', 'Early template access'] },
  { name: 'Team', icon: '🕸️🕷️', price: '$15', period: '/month', featured: false, badge: null,
    cta: 'Contact Us', features: ['Everything in Pro', 'Up to 5 profiles', 'Team dashboard', 'Shared analytics', 'API access', 'Dedicated support'] },
]
const faqs = [
  { q: 'Is Linkdung really free?', a: 'Yes! The Free plan is genuinely free forever. No trial, no credit card. Unlimited links and basic analytics at no cost.' },
  { q: 'Can I use a custom domain?', a: 'Custom domains are on the Pro plan. Point any domain you own to your Linkdung profile.' },
  { q: 'How does the drag-and-drop work?', a: 'Grab the ☰ handle on any link card and drag it up or down. The order saves automatically.' },
  { q: 'What chart types are in analytics?', a: 'Bar, Line, and Pie — switchable with one click. Each link\'s color in the chart matches its card style.' },
  { q: 'Can I use any color for my links?', a: 'Yes! Choose from 5 preset styles or use the custom color picker for any hex color you want, per link.' },
  { q: 'Does the accent color change everything?', a: 'Yes — changing your accent color in Admin → Look updates buttons, shadows, marquee, hero section, charts, and every primary-colored element site-wide, instantly.' },
]
const footerCols = [
  { title: 'Product', links: ['Features', 'Templates', 'Pricing', 'Changelog'] },
  { title: 'Company', links: ['About', 'Blog', 'Careers', 'Press Kit'] },
  { title: 'Support', links: ['Help Center', 'Contact', 'Status', 'Community'] },
]
</script>

<style scoped>
.accordion-enter-active, .accordion-leave-active {
  transition: max-height 0.3s ease, opacity 0.3s ease;
  overflow: hidden; max-height: 200px;
}
.accordion-enter-from, .accordion-leave-to { max-height: 0; opacity: 0; }
</style>
