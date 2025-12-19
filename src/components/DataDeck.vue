<template>
  <div class="fixed bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 w-[95%] max-w-2xl z-50">
    <div class="backdrop-blur-2xl rounded-[2rem] lg:rounded-full p-4 lg:p-2 lg:pl-8 lg:pr-2 flex flex-col lg:flex-row items-center justify-between shadow-2xl relative overflow-hidden group border transition-all duration-300 gap-4 lg:gap-0
               bg-white/70 border-black hover:border-black hover:shadow-[0_0_25px_rgba(163,230,53,0.3)] shadow-xl
               dark:bg-black/80 dark:border-white/10 dark:hover:border-lime-400/50 dark:hover:shadow-[0_0_30px_rgba(163,230,53,0.15)]">
      
      <!-- Ambient Glow (Subtler in light mode) -->
      <div class="absolute inset-0 bg-gradient-to-r from-lime-400/10 via-transparent to-transparent opacity-50 pointer-events-none dark:from-lime-400/5"></div>

      <!-- Left Data: Times -->
      <div class="flex items-center justify-between w-full lg:w-auto gap-4 relative z-10">
        <!-- Current Time -->
        <div class="flex flex-col items-start min-w-[80px]">
            <span class="text-[9px] font-bold uppercase tracking-widest leading-none mb-1 text-gray-400 dark:text-gray-500">Current Time</span>
            <span class="text-base md:text-xl lg:text-2xl font-bold tracking-tight tabular-nums font-mono leading-none text-gray-700 dark:text-gray-300 whitespace-nowrap">{{ currentTime }}</span>
        </div>

        <!-- Divider (Hidden on small mobile if needed, but useful vertical separator) -->
        <div class="w-[1px] h-8 bg-gray-200 dark:bg-white/10 mx-2"></div>

        <!-- End Time -->
        <div class="flex flex-col items-start min-w-[80px]">
            <span class="text-[9px] font-bold uppercase tracking-widest leading-none mb-1 text-lime-600 dark:text-lime-400">Out Time</span>
            <span class="text-base md:text-xl lg:text-2xl font-bold tracking-tight tabular-nums font-mono leading-none text-gray-900 dark:text-white whitespace-nowrap">{{ endTime }}</span>
        </div>
      </div>

      <!-- Controls -->
      <div class="flex items-center justify-between w-full lg:w-auto gap-2 relative z-10 border-t pt-3 lg:border-0 lg:pt-0 border-white/5 mt-0">
         
         <!-- Left side controls wrapper for mobile justification -->
         <div class="flex items-center gap-2">
             <!-- 12h/24h Toggle -->
             <button 
                v-if="isPM"
                @click="$emit('toggle-format')"
                class="flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all text-[10px] uppercase font-bold tracking-widest"
                :class="is24Hour ? 'bg-lime-400 text-black border-lime-400 shadow-[0_0_10px_rgba(163,230,53,0.3)]' : 'bg-transparent text-gray-400 border-gray-300 hover:border-lime-500 hover:text-lime-600 dark:text-gray-500 dark:border-white/10 dark:hover:border-lime-400/50 dark:hover:text-white'"
             >
               <span>{{ is24Hour ? '24H' : '12H' }}</span>
             </button>

             <button 
               @click="$emit('toggle-sound')"
               class="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all border
                      bg-gray-100 border-gray-200 text-gray-400 
                      hover:bg-white hover:border-lime-500 hover:text-lime-600 hover:shadow-[0_0_15px_rgba(163,230,53,0.4)]
                      dark:bg-white/5 dark:border-white/5 dark:text-gray-400 
                      dark:hover:bg-lime-400/10 dark:hover:border-lime-400 dark:hover:text-lime-400 dark:hover:shadow-[0_0_20px_rgba(163,230,53,0.2)]"
               title="Toggle Sound"
             >
               <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 md:h-4 md:w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
               </svg>
             </button>
         </div>

         <!-- Abort Button (Right aligned on mobile) -->
         <button 
           @click="$emit('reset')"
           class="h-8 md:h-10 px-4 md:px-6 rounded-full font-bold text-[10px] md:text-xs uppercase tracking-widest border transition-all flex items-center gap-2
                  bg-lime-50 text-lime-600 border-lime-200 hover:bg-lime-400 hover:text-white
                  dark:bg-lime-400/10 dark:text-lime-400 dark:border-lime-400/20 dark:hover:bg-lime-400 dark:hover:text-black"
         >
           <span>Abort</span>
         </button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

const props = defineProps({
  endTime: {
    type: String,
    required: true
  },
  is24Hour: {
    type: Boolean,
    default: false
  }
})

defineEmits(['reset', 'toggle-sound', 'toggle-format'])

const currentTime = ref('')
const currentHours = ref(0)
let interval = null

// Check if PM (Checking current hours >= 12 OR if endTime contains 'PM' or is > 12h-ish)
const isPM = computed(() => {
    // Check Current Time
    if (currentHours.value >= 12 && currentHours.value < 24) return true
    
    // Check Out Time (Simple string check for 12h mode, or basic assumption if 24h mode?)
    // Actually simplicity: if current time is PM, the button appears. 
    // If out time is PM (e.g. 5:48 PM), we definitely want to see it too.
    if (props.endTime.includes('PM')) return true
    
    // If in 24h mode, endTime is like 17:48. 
    // We can just rely on user toggling it back if they want.
    // The requirement was "if current or out time is in PM".
    return false
})

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
