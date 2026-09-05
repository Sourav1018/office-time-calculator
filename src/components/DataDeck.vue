<template>
  <div
    class="fixed bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 w-[92%] max-w-2xl z-50 select-none"
  >
    <div
      class="glass-panel rounded-3xl lg:rounded-full p-4 lg:py-3 lg:px-8 flex flex-col sm:flex-row items-center justify-between shadow-2xl relative overflow-hidden group transition-all duration-500 gap-4 sm:gap-0"
    >
      <!-- Subtle Ambient Glow -->
      <div
        class="absolute inset-0 opacity-60 pointer-events-none transition-all duration-500"
        :style="{
          background:
            'linear-gradient(to right, rgba(var(--accent-rgb), 0.1), transparent, rgba(56, 189, 248, 0.1))',
        }"
      ></div>

      <!-- Left Data: Current & Out Times -->
      <div class="flex items-center justify-between w-full sm:w-auto gap-6 relative z-10">
        <!-- Current Time Block -->
        <div class="flex flex-col items-start min-w-[90px]">
          <span
            class="text-[9px] font-black uppercase tracking-[0.2em] leading-none mb-1 text-slate-600 dark:text-slate-400"
            >Current</span
          >
          <span
            class="text-lg md:text-xl font-black tracking-tight tabular-nums font-mono leading-none text-slate-800 dark:text-slate-200"
            >{{ currentTime }}</span
          >
        </div>

        <!-- Vertical Divider -->
        <div class="w-[1px] h-8 bg-slate-200 dark:bg-zinc-800"></div>

        <!-- Out Time Block -->
        <div class="flex flex-col items-start min-w-[90px]">
          <span
            class="text-[9px] font-black uppercase tracking-[0.2em] leading-none mb-1 transition-colors duration-500"
            :style="{ color: 'var(--accent-color)' }"
            >Checkout Time</span
          >
          <span
            class="text-lg md:text-xl font-black tracking-tight tabular-nums font-mono leading-none text-slate-900 dark:text-white"
            >{{ endTime }}</span
          >
        </div>
      </div>

      <!-- Right Controls -->
      <div
        class="flex items-center justify-between w-full sm:w-auto gap-3 relative z-10 border-t pt-3 sm:border-0 sm:pt-0 border-slate-200/50 dark:border-zinc-800"
      >
        <div class="flex items-center gap-2">
          <!-- 12H / 24H Toggle Chip (Always visible) -->
          <button
            @click="$emit('toggle-format')"
            class="px-3 py-1.5 rounded-full border transition-all duration-300 text-[10px] font-black tracking-widest uppercase shadow-sm active:scale-95"
            :class="
              is24Hour
                ? 'text-slate-950 font-black'
                : 'bg-slate-100 dark:bg-zinc-800/80 text-slate-600 dark:text-slate-300 border-slate-300 dark:border-zinc-700 hover:border-slate-400'
            "
            :style="
              is24Hour
                ? {
                    backgroundColor: 'var(--accent-color)',
                    borderColor: 'var(--accent-color)',
                    boxShadow: '0 0 12px rgba(var(--accent-rgb), 0.4)',
                  }
                : {}
            "
          >
            {{ is24Hour ? '24H' : '12H' }}
          </button>

          <!-- Reminder Sound / Bell Button -->
          <button
            @click="$emit('toggle-sound')"
            class="px-3 py-1.5 rounded-full transition-all duration-300 border backdrop-blur-md shadow-sm active:scale-95 flex items-center gap-1.5 font-bold"
            :class="
              isReminderActive
                ? 'text-slate-950 font-black'
                : 'bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-900 dark:bg-zinc-800/80 dark:border-zinc-700/80 dark:text-slate-300'
            "
            :style="
              isReminderActive
                ? {
                    backgroundColor: 'var(--accent-color)',
                    borderColor: 'var(--accent-color)',
                    boxShadow: '0 0 15px rgba(var(--accent-rgb), 0.5)',
                  }
                : {}
            "
            :title="
              isReminderActive
                ? 'Reminder Notifications Active'
                : 'Set 5-Min & Final Reminder Notifications'
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"
              />
            </svg>
            <span v-if="isReminderActive" class="text-[9px] font-black uppercase tracking-wider"
              >ON</span
            >
          </button>
        </div>

        <!-- Abort / Reset Button -->
        <button
          @click="$emit('reset')"
          class="px-4 py-2 rounded-full font-black text-[10px] uppercase tracking-widest border transition-all duration-300 flex items-center gap-1.5 shadow-sm active:scale-95 bg-rose-50 text-rose-600 border-rose-200 hover:bg-rose-500 hover:text-white hover:border-rose-500 hover:shadow-[0_0_15px_rgba(244,63,94,0.3)] dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/30 dark:hover:bg-rose-500 dark:hover:text-white dark:hover:border-rose-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-3.5 w-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          <span>Abort</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  endTime: {
    type: String,
    required: true,
  },
  is24Hour: {
    type: Boolean,
    default: false,
  },
  isReminderActive: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['reset', 'toggle-sound', 'toggle-format'])

const currentTime = ref('')
const currentHours = ref(0)
let interval = null

function updateTime() {
  const now = new Date()
  let hours = now.getHours()
  currentHours.value = hours // Store raw for Logic
  const minutes = now.getMinutes()
  const seconds = now.getSeconds()

  let period = ''
  let displayHours = hours

  if (!props.is24Hour) {
    period = hours >= 12 ? 'PM' : 'AM'
    displayHours = hours % 12 || 12
    currentTime.value = `${displayHours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${period}`
  } else {
    currentTime.value = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }
}

onMounted(() => {
  updateTime()
  interval = setInterval(updateTime, 1000)
})

onUnmounted(() => {
  if (interval) clearInterval(interval)
})
</script>
