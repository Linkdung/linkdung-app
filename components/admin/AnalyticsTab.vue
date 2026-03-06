<template>
  <div class="comic-panel p-6">
    <h2
      class="font-display text-2xl mb-6"
      style="color:var(--accent-primary);"
    >
      ANALYTICS 📊
    </h2>

    <!-- Stat cards -->
    <div class="grid grid-cols-3 gap-4 mb-8">
      <div
        class="comic-panel p-4 text-center"
        style="background:var(--accent-primary);"
      >
        <div class="font-display text-4xl text-white">
          {{ totalClicks }}
        </div>
        <div class="font-comic text-xs text-white opacity-80">
          Total Clicks
        </div>
      </div>
      <div
        class="comic-panel p-4 text-center"
        style="background:#1A3A6B;"
      >
        <div class="font-display text-4xl text-white">
          {{ allLinks.length }}
        </div>
        <div class="font-comic text-xs text-white opacity-80">
          Total Links
        </div>
      </div>
      <div
        class="comic-panel p-4 text-center"
        style="background:#FFD700;"
      >
        <div class="font-display text-4xl text-black">
          {{ visibleLinks.length }}
        </div>
        <div class="font-comic text-xs text-black opacity-80">
          Active
        </div>
      </div>
    </div>

    <!-- Chart type switcher -->
    <div class="flex items-center justify-between mb-4 flex-wrap gap-3">
      <h3 class="font-display text-xl">
        Clicks Per Link
      </h3>
      <div class="flex gap-2">
        <button
          v-for="ct in chartTypes"
          :key="ct.value"
          class="btn-comic px-3 py-1 font-display text-sm"
          :style="chartType === ct.value
            ? 'background:var(--accent-primary);color:#fff;border-color:#000;box-shadow:3px 3px 0 #000;'
            : ''"
          @click="chartType = ct.value"
        >
          {{ ct.icon }} {{ ct.label }}
        </button>
      </div>
    </div>

    <ClientOnly>
      <VChart
        :option="chartOption"
        :theme="isDark ? 'dark' : ''"
        style="height:300px;width:100%;"
        autoresize
      />
    </ClientOnly>

    <!-- Breakdown bars -->
    <div class="mt-6 space-y-2">
      <h3 class="font-display text-lg mb-3">
        Link Breakdown
      </h3>
      <div
        v-for="link in allLinks"
        :key="link.id"
        class="flex items-center gap-3"
      >
        <span class="text-lg flex-shrink-0">{{ link.emoji || '🔗' }}</span>
        <div class="flex-1 min-w-0">
          <div class="font-comic text-sm font-bold truncate">
            {{ link.title }}
          </div>
          <div
            class="h-3 border-2 border-black mt-1 overflow-hidden"
            style="background:var(--bg-secondary);"
          >
            <ClientOnly>
              <div
                class="h-full transition-all duration-500"
                :style="{ width: maxClicks > 0 ? (link.clicks/maxClicks*100)+'%' : '0%', background: 'var(--accent-primary)' }"
              />
            </ClientOnly>
          </div>
        </div>
        <span
          class="font-display text-base flex-shrink-0"
          style="color:var(--accent-primary);"
        >{{ link.clicks }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { use } from 'echarts/core'
import { BarChart, LineChart, PieChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import VChart from 'vue-echarts'
import { getLinkBg } from '~/composables/useLinkStyles'
import { _rgba } from '~/composables/useAccentColor'
import { useProfileStore } from '~/stores/profile'
import { useThemeStore } from '~/stores/theme'

use([BarChart, LineChart, PieChart, GridComponent, TooltipComponent, LegendComponent, CanvasRenderer])

const store = useProfileStore()
const { allLinks, visibleLinks, totalClicks, profile } = storeToRefs(store)
const { isDark } = storeToRefs(useThemeStore())

const chartType = ref<'bar' | 'line' | 'pie'>('bar')
const chartTypes = [
  { value: 'bar', label: 'Bar', icon: '📊' },
  { value: 'line', label: 'Line', icon: '📈' },
  { value: 'pie', label: 'Pie', icon: '🥧' },
]
const maxClicks = computed(() => Math.max(...allLinks.value.map(l => l.clicks), 1))
const axisColor = computed(() => isDark.value ? '#F5F5F0' : '#0A0A0A')

const chartOption = computed(() => {
  const labels = allLinks.value.map(l => l.title.substring(0, 12) + (l.title.length > 12 ? '…' : ''))

  if (chartType.value === 'pie') {
    return {
      backgroundColor: 'transparent',
      tooltip: { trigger: 'item', formatter: '{b}: {c} clicks ({d}%)' },
      legend: { orient: 'horizontal', bottom: 0, textStyle: { color: axisColor.value, fontSize: 11 } },
      series: [{
        type: 'pie', radius: ['35%', '68%'], center: ['50%', '45%'],
        data: allLinks.value.map(l => ({
          name: l.title.substring(0, 14), value: l.clicks,
          itemStyle: { color: getLinkBg(l), borderColor: '#000', borderWidth: 2 },
        })),
        label: { fontSize: 13, color: axisColor.value },
      }],
    }
  }

  return {
    backgroundColor: 'transparent',
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    grid: { left: '5%', right: '5%', bottom: '3%', containLabel: true },
    xAxis: {
      type: 'category', data: labels,
      axisLabel: { fontSize: 12, color: axisColor.value, interval: 0, rotate: labels.length > 5 ? 30 : 0 },
      axisLine: { lineStyle: { color: axisColor.value, width: 2 } },
    },
    yAxis: {
      type: 'value',
      axisLabel: { color: axisColor.value },
      splitLine: { lineStyle: { color: isDark.value ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)' } },
    },
    series: [{
      type: chartType.value,
      data: allLinks.value.map(l => ({
        value: l.clicks,
        itemStyle: { color: getLinkBg(l), borderColor: '#000', borderWidth: 2 },
      })),
      ...(chartType.value === 'line'
        ? {
            smooth: true,
            lineStyle: { color: profile.value.accentColor, width: 3 },
            itemStyle: { color: profile.value.accentColor, borderColor: '#000', borderWidth: 2 },
            areaStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [
              { offset: 0, color: _rgba(profile.value.accentColor, 0.4) },
              { offset: 1, color: _rgba(profile.value.accentColor, 0.02) },
            ] } },
            symbol: 'circle', symbolSize: 10,
          }
        : { barMaxWidth: 60 }),
    }],
  }
})
</script>
