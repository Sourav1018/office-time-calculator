<template>
  <div
    class="relative flex items-center justify-center w-72 h-72 sm:w-88 sm:h-88 md:w-[380px] md:h-[380px] select-none mx-auto"
  >
    <!-- Ambient Glow Orb behind the timer -->
    <div
      class="absolute inset-0 rounded-full blur-3xl transition-all duration-1000"
      :style="{
        backgroundColor: isActive ? 'var(--accent-color)' : 'transparent',
        opacity: isActive ? 0.2 : 0.08,
      }"
      :class="isActive ? 'scale-110 animate-pulse' : 'scale-95'"
    ></div>

    <!-- Rotating Radar Scanner Sweep Accent -->
    <div
      v-if="isActive"
      class="absolute inset-1.5 rounded-full border border-transparent animate-[spin_8s_linear_infinite] pointer-events-none opacity-80 z-10"
      :style="{ borderTopColor: 'var(--accent-color)' }"
    ></div>

    <!-- Outer Tick Marks Ring (Slow continuous rotation when active) -->
    <div class="absolute inset-0 z-0">
      <svg
        class="w-full h-full opacity-60 dark:opacity-40 transition-transform duration-1000"
        :class="isActive ? 'animate-[spin_120s_linear_infinite]' : ''"
        viewBox="0 0 100 100"
      >
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
            class="text-slate-500 dark:text-white/40"
            :transform="`rotate(${i * 30})`"
          />
        </g>
      </svg>
    </div>

    <!-- Main SVG Gauge Ring -->
    <svg
      class="w-full h-full transform -rotate-90 relative z-10 drop-shadow-[0_0_25px_rgba(var(--accent-rgb),0.35)]"
      viewBox="0 0 100 100"
    >
      <defs>
        <linearGradient id="limeProgressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="var(--accent-color)" />
          <stop offset="100%" stop-color="var(--accent-color)" stop-opacity="0.8" />
        </linearGradient>
      </defs>

      <!-- Outer Decorative Accent Ring -->
      <circle
        cx="50"
        cy="50"
        r="44"
        stroke="currentColor"
        stroke-width="0.8"
        stroke-dasharray="3 3"
        fill="transparent"
        class="text-slate-300/40 dark:text-white/10"
      />

      <!-- Background Track -->
      <circle
        cx="50"
        cy="50"
        r="39"
        stroke="currentColor"
        stroke-width="7"
        fill="transparent"
        class="text-slate-200/80 dark:text-zinc-800/80"
      />

      <!-- Animated Progress Circle Track -->
      <circle
        cx="50"
        cy="50"
        r="39"
        stroke="url(#limeProgressGradient)"
        stroke-width="7"
        fill="transparent"
        stroke-linecap="round"
        class="transition-all duration-1000 ease-linear"
        :style="{ strokeDasharray: circumference, strokeDashoffset: dashOffset }"
      />

      <!-- Leading Glowing Orbital Particle Head (Travels along green arc) -->
      <g v-if="isActive && progress > 0 && progress < 100">
        <!-- Outer Glowing Pulsing Aura -->
        <circle
          :cx="headX"
          :cy="headY"
          r="4.5"
          fill="var(--accent-color)"
          class="animate-ping opacity-80"
        />
        <!-- Solid Bright Particle Point -->
        <circle :cx="headX" :cy="headY" r="3" fill="var(--accent-color)" />
        <!-- Center Core Light -->
        <circle :cx="headX" :cy="headY" r="1.5" fill="#ffffff" />
      </g>
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
        class="mt-4 inline-flex items-center gap-2 px-3.5 py-1 rounded-full border backdrop-blur-md transition-colors duration-500"
        :style="{
          backgroundColor: 'rgba(var(--accent-rgb), 0.12)',
          borderColor: 'rgba(var(--accent-rgb), 0.4)',
        }"
      >
        <span class="relative flex h-2 w-2">
          <span
            class="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
            :style="{ backgroundColor: 'var(--accent-color)' }"
          ></span>
          <span
            class="relative inline-flex rounded-full h-2 w-2"
            :style="{ backgroundColor: 'var(--accent-color)' }"
          ></span>
        </span>
        <span
          class="text-[10px] font-black uppercase tracking-[0.2em]"
          :style="{ color: 'var(--accent-color)' }"
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

// Radius is 39 in SVG (100x100 viewBox). Circumference = 2 * PI * 39
const circumference = 2 * Math.PI * 39

const dashOffset = computed(() => {
  const progressPercent = Math.max(0, Math.min(100, props.progress))
  return circumference - (progressPercent / 100) * circumference
})

// Calculate exact (x, y) coordinates of leading arc head for orbital particle dot
const headX = computed(() => {
  const progressPercent = Math.max(0, Math.min(100, props.progress))
  const angleDeg = (progressPercent / 100) * 360 - 90
  const rad = (angleDeg * Math.PI) / 180
  return 50 + 39 * Math.cos(rad)
})

const headY = computed(() => {
  const progressPercent = Math.max(0, Math.min(100, props.progress))
  const angleDeg = (progressPercent / 100) * 360 - 90
  const rad = (angleDeg * Math.PI) / 180
  return 50 + 39 * Math.sin(rad)
})

const formattedTime = computed(() => props.timeLeft)
</script>

<style scoped>
circle {
  transition: stroke-dashoffset 0.5s linear;
}
</style>
