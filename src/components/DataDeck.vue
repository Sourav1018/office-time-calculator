<template>
  <div class="fixed bottom-8 left-1/2 transform -translate-x-1/2 w-[90%] max-w-2xl">
    <div class="bg-black/60 backdrop-blur-2xl border border-white/10 rounded-full p-2 pl-8 pr-2 flex items-center justify-between shadow-2xl relative overflow-hidden group">
      
      <!-- Ambient Glow -->
      <div class="absolute inset-0 bg-gradient-to-r from-lime-400/5 via-transparent to-transparent opacity-50 pointer-events-none"></div>

      <!-- Left Data: Times -->
      <div class="flex items-center gap-6 relative z-10">
        <!-- Current Time -->
        <div class="flex flex-col">
            <span class="text-[10px] font-bold text-gray-500 uppercase tracking-widest leading-none mb-1">Current Time</span>
            <span class="text-2xl font-bold text-gray-300 tracking-tight tabular-nums font-mono leading-none">{{ currentTime }}</span>
        </div>

        <!-- Divider -->
        <div class="w-[1px] h-8 bg-white/10"></div>

        <!-- End Time -->
        <div class="flex flex-col">
            <span class="text-[10px] font-bold text-lime-400 uppercase tracking-widest leading-none mb-1">Out Time</span>
            <span class="text-2xl font-bold text-white tracking-tight tabular-nums font-mono leading-none">{{ endTime }}</span>
        </div>
      </div>

      <!-- Controls -->
      <div class="flex items-center gap-2 relative z-10">
         <button 
           @click="$emit('toggle-sound')"
           class="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all border border-white/5"
           title="Toggle Sound"
         >
           <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
           </svg>
         </button>

         <button 
           @click="$emit('reset')"
           class="h-10 px-6 rounded-full bg-lime-400/10 hover:bg-lime-400 hover:text-black text-lime-400 font-bold text-xs uppercase tracking-widest border border-lime-400/20 transition-all flex items-center gap-2"
         >
           <span>Abort</span>
         </button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

defineProps({
  endTime: {
    type: String,
    required: true
  }
})

defineEmits(['reset', 'toggle-sound'])

const currentTime = ref('')
let interval = null

function updateTime() {
    const now = new Date()
    let hours = now.getHours()
    const minutes = now.getMinutes()
    const seconds = now.getSeconds()
    const period = hours >= 12 ? 'PM' : 'AM'
    hours = hours % 12 || 12
    currentTime.value = `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${period}`
}

onMounted(() => {
    updateTime()
    interval = setInterval(updateTime, 1000)
})

onUnmounted(() => {
    if (interval) clearInterval(interval)
})
</script>
