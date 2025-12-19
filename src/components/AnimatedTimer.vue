<template>
  <div class="relative flex items-center justify-center w-80 h-80 sm:w-96 sm:h-96">
    <!-- Outer Glow Circle (Pulse) -->
    <div class="absolute inset-0 rounded-full bg-lime-400/5 blur-3xl animate-pulse"></div>
    
    <!-- Ticks Ring -->
    <div class="absolute inset-0 z-0">
        <svg class="w-full h-full" viewBox="0 0 100 100">
            <g transform="translate(50, 50)">
                <line 
                    v-for="i in 60" 
                    :key="i"
                    y1="-44"
                    y2="-49"
                    stroke="currentColor"
                    stroke-width="0.5"
                    class="text-gray-300 dark:text-white/10"
                    :transform="`rotate(${i * 6})`"
                />
                 <!-- Major Ticks -->
                 <line 
                    v-for="i in 12" 
                    :key="`m-${i}`"
                    y1="-42"
                    y2="-49"
                    stroke="currentColor"
                    stroke-width="1"
                    class="text-gray-400 dark:text-white/30"
                    :transform="`rotate(${i * 30})`"
                />
            </g>
        </svg>
    </div>

    <!-- SVG Timer -->
    <svg class="w-full h-full transform -rotate-90 drop-shadow-[0_0_15px_rgba(163,230,53,0.4)] relative z-10">
      <!-- Background Track -->
      <circle
        cx="50%"
        cy="50%"
        r="42%"
        stroke="currentColor"
        stroke-width="5"
        fill="transparent"
        class="text-gray-200 dark:text-white/10"
      />
      <!-- Progress Circle -->
      <circle
        cx="50%"
        cy="50%"
        r="42%"
        stroke="currentColor"
        stroke-width="5"
        fill="transparent"
        stroke-linecap="round"
        class="text-lime-500 dark:text-lime-400 transition-all duration-1000 ease-linear"
        :style="{ strokeDasharray: circumference, strokeDashoffset: dashOffset }"
      />
    </svg>

    <!-- Center Content -->
    <div class="absolute inset-0 flex flex-col items-center justify-center text-center z-20">
      <div class="text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-3 font-medium">Time Remaining</div>
      <div class="text-6xl sm:text-7xl font-bold text-gray-900 dark:text-white tabular-nums tracking-tighter drop-shadow-2xl font-mono">
        {{ formattedTime }}
      </div>
      <div v-if="isActive" class="mt-4 flex gap-2 items-center">
         <span class="w-2 h-2 rounded-full bg-lime-500 animate-ping"></span>
         <span class="text-[10px] text-lime-400 font-bold uppercase tracking-[0.2em]">Active</span>
      </div>
      <div v-else class="mt-4 text-[10px] text-gray-600 uppercase tracking-[0.2em]">
        Standby
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
    default: false
  }
})

// Radius is 42% now.
const circumference = 2 * Math.PI * 42

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
