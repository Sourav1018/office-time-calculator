<template>
  <div
    class="relative flex items-center justify-center w-72 h-72 sm:w-88 sm:h-88 md:w-[380px] md:h-[380px] select-none mx-auto"
  >
    <!-- Ambient Glow Orb behind the timer -->
    <div
      class="absolute inset-0 rounded-full blur-3xl transition-all duration-1000"
      :class="
        isActive
          ? 'bg-lime-400/20 dark:bg-lime-400/15 scale-110 animate-pulse'
          : 'bg-slate-400/10 dark:bg-zinc-700/10 scale-95'
      "
    ></div>

    <!-- Outer Tick Marks Ring -->
    <div class="absolute inset-0 z-0">
      <svg class="w-full h-full opacity-60 dark:opacity-40" viewBox="0 0 100 100">
        <g transform="translate(50, 50)">
          <!-- 60 Minute Ticks -->
          <line
            v-for="i in 60"
            :key="i"
            y1="-45"
            y2="-48"
            stroke="currentColor"
            stroke-width="0.6"
            class="text-slate-300 dark:text-white/20"
            :transform="`rotate(${i * 6})`"
          />
          <!-- 12 Major Hour Ticks -->
          <line
            v-for="i in 12"
            :key="`m-${i}`"
            y1="-43"
            y2="-48"
            stroke="currentColor"
            stroke-width="1.2"
            class="text-slate-500 dark:text-lime-400/60"
            :transform="`rotate(${i * 30})`"
          />
        </g>
      </svg>
    </div>

    <!-- Main SVG Gauge Ring -->
    <svg
      class="w-full h-full transform -rotate-90 relative z-10 drop-shadow-[0_0_20px_rgba(163,230,53,0.3)]"
    >
      <!-- Outer Decorative Accent Ring -->
      <circle
        cx="50%"
        cy="50%"
        r="42%"
        stroke="currentColor"
        stroke-width="1"
        stroke-dasharray="4 4"
        fill="transparent"
        class="text-slate-300/40 dark:text-white/10"
      />

      <!-- Background Track -->
      <circle
        cx="50%"
        cy="50%"
        r="39%"
        stroke="currentColor"
        stroke-width="7"
        fill="transparent"
        class="text-slate-200/80 dark:text-zinc-800/80"
      />

      <!-- Animated Progress Circle Track -->
      <circle
        cx="50%"
        cy="50%"
        r="39%"
        stroke="currentColor"
        stroke-width="7"
        fill="transparent"
        stroke-linecap="round"
        class="text-lime-500 dark:text-lime-400 transition-all duration-1000 ease-linear"
        :style="{ strokeDasharray: circumference, strokeDashoffset: dashOffset }"
      />
    </svg>

    <!-- Center Digit Content -->
    <div class="absolute inset-0 flex flex-col items-center justify-center text-center z-20">
      <div
        class="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-[0.25em] text-slate-600 dark:text-slate-300 mb-1 sm:mb-2"
      >
        Remaining Session
      </div>

      <!-- Big Mono Time Readout -->
      <div
        class="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight font-mono tabular-nums text-slate-900 dark:text-white drop-shadow-lg"
      >
        {{ formattedTime }}
      </div>

      <!-- Live Status Badge -->
      <div
        v-if="isActive"
        class="mt-4 inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-lime-500/10 border border-lime-500/30 backdrop-blur-md"
      >
        <span class="relative flex h-2 w-2">
          <span
            class="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75"
          ></span>
          <span class="relative inline-flex rounded-full h-2 w-2 bg-lime-500"></span>
        </span>
        <span
          class="text-[10px] font-black uppercase tracking-[0.2em] text-lime-600 dark:text-lime-400"
          >Countdown Active</span
        >
      </div>

      <div
        v-else
        class="mt-4 inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-200/50 dark:bg-zinc-800/50 border border-slate-300 dark:border-zinc-700/50"
      >
        <span class="w-2 h-2 rounded-full bg-slate-400 dark:bg-zinc-500"></span>
        <span
          class="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600 dark:text-slate-300"
          >Ready to Start</span
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  timeLeft: {
    type: String,
    required: true,
  },
  progress: {
    type: Number,
    default: 100,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
})

// Radius is 39% now.
const circumference = 2 * Math.PI * 39

const dashOffset = computed(() => {
  const progressPercent = Math.max(0, Math.min(100, props.progress))
  return circumference - (progressPercent / 100) * circumference
})

const formattedTime = computed(() => props.timeLeft)
</script>

<style scoped>
circle {
  transition: stroke-dashoffset 0.5s linear;
}
</style>
