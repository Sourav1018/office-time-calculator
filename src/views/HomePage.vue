<template>
  <div class="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-black selection:bg-lime-400 selection:text-black font-sans">
    
    <!-- Background Grid -->
    <div class="absolute inset-0 z-0 pointer-events-none opacity-20"
         style="background-image: linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px); background-size: 50px 50px;">
    </div>
    
    <!-- Large Background Accents -->
    <div class="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-lime-400/5 rounded-full blur-[120px] pointer-events-none transition-all duration-[2s]" :class="{ 'opacity-0': showFocusMode }"></div>
    <div class="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[100px] pointer-events-none transition-all duration-[2s]" :class="{ 'opacity-0': showFocusMode }"></div>

    <!-- MAIN CONTENT CONTAINER -->
    <div class="relative z-10 w-full max-w-4xl mx-auto px-6 transition-all duration-1000 ease-in-out transform"
         :class="showFocusMode ? 'translate-y-[-5vh]' : 'translate-y-0'">

      <!-- ================= SETUP MODE ================= -->
      <div 
        class="transition-all duration-700 ease-out absolute inset-0 flex flex-col items-center justify-center"
        :class="showFocusMode ? 'opacity-0 scale-90 pointer-events-none delay-0' : 'opacity-100 scale-100 delay-300 relative'"
      >
          <!-- Header -->
          <div class="text-center mb-12">
             <h1 class="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">Focus Timer</h1>
             <p class="text-gray-500 uppercase tracking-widest text-xs">Configure your session</p>
          </div>

          <!-- Floating Inputs Grid -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 w-full mb-12">
             <!-- Hours -->
             <div class="group relative">
                <input 
                  id="hours"
                  v-model.number="hours"
                  type="number" 
                  min="1" max="12"
                  class="peer no-spinner w-full h-32 bg-white/5 hover:bg-white/10 focus:bg-white/10 rounded-2xl border border-white/10 hover:border-lime-400/50 focus:border-lime-400 text-center text-4xl font-bold text-white outline-none transition-all placeholder-transparent"
                  placeholder="00"
                />
                <label for="hours" class="absolute top-4 left-0 right-0 text-center text-[10px] font-bold text-gray-500 uppercase tracking-widest pointer-events-none peer-focus:text-lime-400 transition-colors">Hours</label>
             </div>

             <!-- Minutes -->
             <div class="group relative">
                <input 
                  id="minutes"
                  v-model.number="minutes"
                  type="number" 
                  min="0" max="59"
                  class="peer no-spinner w-full h-32 bg-white/5 hover:bg-white/10 focus:bg-white/10 rounded-2xl border border-white/10 hover:border-lime-400/50 focus:border-lime-400 text-center text-4xl font-bold text-white outline-none transition-all placeholder-transparent"
                  placeholder="00"
                />
                <label for="minutes" class="absolute top-4 left-0 right-0 text-center text-[10px] font-bold text-gray-500 uppercase tracking-widest pointer-events-none peer-focus:text-lime-400 transition-colors">Minutes</label>
             </div>

             <!-- AM/PM Toggle -->
             <div class="group relative">
                <button 
                  id="period"
                  @click="period = period === 'AM' ? 'PM' : 'AM'"
                  class="peer w-full h-32 bg-white/5 hover:bg-white/10 focus:bg-white/10 rounded-2xl border border-white/10 hover:border-lime-400/50 focus:border-lime-400 text-center text-white outline-none transition-all flex flex-col items-center justify-center gap-2 group/btn"
                >
                  <span class="text-4xl font-bold">{{ period }}</span>
                  <div class="flex items-center gap-1 text-[10px] uppercase tracking-widest text-gray-500 group-hover/btn:text-lime-400 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                    <span>Switch</span>
                  </div>
                </button>
                <label for="period" class="absolute top-4 left-0 right-0 text-center text-[10px] font-bold text-gray-500 uppercase tracking-widest pointer-events-none peer-focus:text-lime-400 transition-colors">Period</label>
             </div>

             <!-- Decimal -->
             <div class="group relative">
                <input 
                  id="decimal"
                  v-model.number="decimalHours"
                  type="number" 
                  step="0.1"
                  class="peer no-spinner w-full h-32 bg-white/5 hover:bg-white/10 focus:bg-white/10 rounded-2xl border border-white/10 hover:border-lime-400/50 focus:border-lime-400 text-center text-4xl font-bold text-white outline-none transition-all placeholder-transparent"
                  placeholder="0.0"
                />
                <label for="decimal" class="absolute top-4 left-0 right-0 text-center text-[10px] font-bold text-gray-500 uppercase tracking-widest pointer-events-none peer-focus:text-lime-400 transition-colors">Decimal</label>
             </div>
          </div>

          <!-- Actions -->
          <div class="flex flex-col gap-4 items-center">
            <!-- Big Launcher Button (shown if NOT running or even if running to restart?) -->
            <button 
                @click="startTimer"
                class="group relative inline-flex items-center justify-center px-12 py-6 overflow-hidden font-bold text-black transition-all duration-300 bg-lime-400 rounded-full hover:bg-lime-300 hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(163,230,53,0.3)]"
            >
                <span class="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-black"></span>
                <span class="relative text-lg uppercase tracking-[0.2em]">{{ isTimerRunning ? 'Restart Timer' : 'Initiate Sequence' }}</span>
            </button>

            <!-- Resume Button (If timer is running) -->
            <button 
                v-if="isTimerRunning"
                @click="showFocusMode = true"
                class="text-xs uppercase tracking-widest text-gray-500 hover:text-white transition-colors flex items-center gap-2"
            >
                <span class="w-2 h-2 rounded-full bg-lime-400 animate-pulse"></span>
                <span>Timer Running - Return to Focus</span>
            </button>
          </div>
      </div>

      <!-- ================= FOCUS MODE ================= -->
      <div 
        class="transition-all duration-1000 ease-out flex flex-col items-center justify-center"
        :class="showFocusMode ? 'opacity-100 scale-100 delay-300 relative' : 'opacity-0 scale-75 pointer-events-none absolute inset-0'"
      >
         <!-- Back Button -->
         <button 
           @click="showFocusMode = false"
           class="absolute top-[-80px] left-0 text-lime-400/70 hover:text-lime-400 transition-all flex items-center gap-2 group border border-lime-400/20 hover:border-lime-400/50 hover:bg-lime-400/10 rounded-full px-4 py-2 shadow-[0_0_10px_rgba(163,230,53,0.1)] hover:shadow-[0_0_20px_rgba(163,230,53,0.3)]"
         >
           <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
           </svg>
           <span class="text-xs uppercase tracking-widest font-bold">Setup</span>
         </button>

         <AnimatedTimer 
            :time-left="remainingTime" 
            :progress="progressPercentage"
            :is-active="isTimerRunning"
            class="scale-110 sm:scale-125"
          />
      </div>

    </div>

    <!-- DATA DECK (Bottom HUD) -->
    <transition
      enter-active-class="transition duration-700 ease-out"
      enter-from-class="translate-y-full opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition duration-500 ease-in"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="translate-y-full opacity-0"
    >
      <DataDeck 
        v-if="showFocusMode" 
        :end-time="formattedCheckoutTime" 
        @reset="resetForm" 
        @toggle-sound="setReminder"
      />
    </transition>

  </div>
</template>

<script setup>
import AnimatedTimer from '@/components/AnimatedTimer.vue'
import DataDeck from '@/components/DataDeck.vue'
import { onMounted, ref } from 'vue'

defineOptions({
  name: 'HomePage',
})

// Form inputs
const hours = ref('')
const minutes = ref('')
const period = ref('AM')
const decimalHours = ref('')

// Timer and checkout time
const formattedCheckoutTime = ref('--:--')
const remainingTime = ref('00:00:00')
const progressPercentage = ref(0)
const isTimerRunning = ref(false) // Tracks if logic is running
const showFocusMode = ref(false) // Tracks visible UI state

let timerInterval = null

function resetForm() {
  // Clearing kills the timer logic
  isTimerRunning.value = false
  showFocusMode.value = false // Exit focus mode
  
  setTimeout(() => {
      remainingTime.value = '00:00:00'
      progressPercentage.value = 0
  }, 500)
  
  if (timerInterval) clearInterval(timerInterval)
  clearTimerData()
  resetNotification()
  clearExistingDate()
}

function calculateCheckoutTime() {
  let startHours = hours.value % 12
  if (period.value === 'PM') startHours += 12

  const startMinutes = minutes.value

  const addHours = Math.floor(decimalHours.value)
  const addMinutes = Math.round((decimalHours.value - addHours) * 60)

  const checkoutDate = new Date()
  checkoutDate.setHours(startHours, startMinutes, 0)
  checkoutDate.setMinutes(checkoutDate.getMinutes() + addHours * 60 + addMinutes)

  const checkoutHours = checkoutDate.getHours()
  const checkoutMinutes = checkoutDate.getMinutes()
  const checkoutSeconds = checkoutDate.getSeconds() // Usually 0 but good to be explicit or just 00
  const checkoutPeriod = checkoutHours >= 12 ? 'PM' : 'AM'
  const displayHours = checkoutHours % 12 || 12

  formattedCheckoutTime.value = `${displayHours}:${checkoutMinutes.toString().padStart(2, '0')}:${checkoutSeconds.toString().padStart(2, '0')} ${checkoutPeriod}`

  return checkoutDate
}

function saveCheckoutTime() {
  const currentDateKey = `date_${new Date().toISOString().split('T')[0]}`
  localStorage.setItem(currentDateKey, formattedCheckoutTime.value)
}

function startTimer() {
  if (!hours.value && !minutes.value && !decimalHours.value) return

  const startHours = (hours.value % 12) + (period.value === 'PM' ? 12 : 0)
  const startMinutes = minutes.value
  const startTime = new Date()
  startTime.setHours(startHours, startMinutes, 0)

  const checkoutDate = calculateCheckoutTime()

  saveCheckoutTime()

  const totalDuration = checkoutDate.getTime() - startTime.getTime()

  // Save Timer Data + Form State
  localStorage.setItem(
    'timerData',
    JSON.stringify({
      startTime: startTime.getTime(),
      checkoutDate: checkoutDate.getTime(),
      totalDuration: totalDuration,
      formState: {
        hours: hours.value,
        minutes: minutes.value,
        period: period.value,
        decimalHours: decimalHours.value
      }
    }),
  )

  runTimer(checkoutDate.getTime(), totalDuration)
}

function runTimer(checkoutTime, totalDuration) {
  if (timerInterval) clearInterval(timerInterval)
  
  isTimerRunning.value = true
  showFocusMode.value = true // Switch to focus view on start/restart

  timerInterval = setInterval(() => {
    const now = new Date().getTime()
    const timeDiff = checkoutTime - now

    if (timeDiff <= 0) {
      clearInterval(timerInterval)
      remainingTime.value = '00:00:00'
      progressPercentage.value = 0
      isTimerRunning.value = false 
      clearTimerData()
      return
    }

    // Update Time String
    const hoursLeft = Math.floor(timeDiff / (1000 * 60 * 60))
    const minutesLeft = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60))
    const secondsLeft = Math.floor((timeDiff % (1000 * 60)) / 1000)
    remainingTime.value = `${hoursLeft.toString().padStart(2, '0')}:${minutesLeft.toString().padStart(2, '0')}:${secondsLeft.toString().padStart(2, '0')}`

    // Update Progress Percentage
    if (totalDuration > 0) {
        progressPercentage.value = (timeDiff / totalDuration) * 100
    } else {
        progressPercentage.value = 100 
    }

  }, 1000)
}

function clearTimerData() {
  localStorage.removeItem('timerData')
}

function clearExistingDate(){
  const allKeys = Object.keys(localStorage)
  allKeys.forEach(key => {
    if (key.startsWith('date_')) {
      localStorage.removeItem(key)
    }
  })
}

function resumeTimer() {
  const timerData = JSON.parse(localStorage.getItem('timerData'))
  if (timerData) {
    // Restore Form State
    if (timerData.formState) {
        hours.value = timerData.formState.hours
        minutes.value = timerData.formState.minutes
        period.value = timerData.formState.period
        decimalHours.value = timerData.formState.decimalHours
    }

    const currentTime = new Date().getTime()
    const remainingTimeInMillis = timerData.checkoutDate - currentTime

    if (remainingTimeInMillis > 0) {
        let total = timerData.totalDuration
        if (!total) total = remainingTimeInMillis 
        
        // Initial set
        const hoursLeft = Math.floor(remainingTimeInMillis / (1000 * 60 * 60))
        const minutesLeft = Math.floor((remainingTimeInMillis % (1000 * 60 * 60)) / (1000 * 60))
        const secondsLeft = Math.floor((remainingTimeInMillis % (1000 * 60)) / 1000)
        remainingTime.value = `${hoursLeft.toString().padStart(2, '0')}:${minutesLeft.toString().padStart(2, '0')}:${secondsLeft.toString().padStart(2, '0')}`
        
        runTimer(timerData.checkoutDate, total)
        showFocusMode.value = true
    } else {
      clearTimerData()
    }
  }
}

function checkAndRestoreCheckoutTime() {
  const currentDateKey = `date_${new Date().toISOString().split('T')[0]}`
  
  // Cleanup old dates
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith('date_')) {
      const storedDate = key.split('_')[1]
      const currentDate = new Date().toISOString().split('T')[0]
      if (storedDate < currentDate) {
        localStorage.removeItem(key)
      }
    }
  })

  const savedCheckoutTime = localStorage.getItem(currentDateKey)
  if (savedCheckoutTime) {
    formattedCheckoutTime.value = savedCheckoutTime
  } else {
    formattedCheckoutTime.value = '--:--'
  }
}

function setReminder() {
  if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage({
      type: 'SCHEDULE_NOTIFICATION',
      title: 'Checkout Reminder',
      options: {
        body: `Time to checkout at ${formattedCheckoutTime.value}`,
        vibrate: [200, 100, 200],
        icon: '/office-time-calculator/notification-icon.png',
        badge: '/office-time-calculator/badge-icon.png'
      },
      delay: calculateCheckoutTime().getTime() - new Date().getTime(),
    })
  }
}

function resetNotification() {
  if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage({
      type: 'CANCEL_NOTIFICATION',
    })
  }
}

onMounted(() => {
  resumeTimer()
  checkAndRestoreCheckoutTime()
})
</script>
