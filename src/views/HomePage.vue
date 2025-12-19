<template>
  <div class="min-h-screen flex flex-col items-center justify-center relative overflow-hidden transition-colors duration-500 font-sans selection:bg-lime-400 selection:text-black bg-gray-50 dark:bg-black">
    
    <!-- Background Grid -->
    <div class="absolute inset-0 z-0 pointer-events-none opacity-20 text-lime-900/10 dark:text-white/5"
         style="background-image: linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px); background-size: 50px 50px;">
    </div>
    
    <!-- Large Background Accents -->
    <div class="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-lime-500/20 dark:bg-lime-400/5 rounded-full blur-[120px] pointer-events-none transition-all duration-[2s]" :class="{ 'opacity-0': showFocusMode }"></div>
    <div class="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-purple-500/20 dark:bg-purple-500/5 rounded-full blur-[100px] pointer-events-none transition-all duration-[2s]" :class="{ 'opacity-0': showFocusMode }"></div>

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
             <h1 class="text-4xl md:text-5xl font-bold mb-2 tracking-tight text-gray-900 dark:text-white transition-colors">Focus Timer</h1>
             <div class="flex items-center justify-center gap-2 uppercase tracking-widest text-xs text-gray-500 dark:text-gray-500">
                <span>Configure your session</span>
                <span class="w-1 h-1 rounded-full bg-lime-500 dark:bg-lime-400"></span>
                <span class="font-bold text-lime-600 dark:text-lime-400 transition-colors">{{ currentDayName }}</span>
             </div>
          </div>

          <!-- Header: 12/24h Toggle -->
          <div class="mb-4 flex justify-center">
             <button 
               @click="toggleTimeFormat"
               class="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border transition-all"
               :class="is24Hour ? 'text-lime-600 border-lime-500/50 bg-lime-100 dark:text-lime-400 dark:border-lime-400/50 dark:bg-lime-400/10' : 'text-gray-500 border-gray-300 hover:border-gray-500 dark:text-gray-500 dark:border-white/10 dark:hover:border-white/30'"
             >
               {{ is24Hour ? '24-Hour Mode' : '12-Hour Mode' }}
             </button>
          </div>

          <!-- Floating Inputs Grid -->
          <div class="grid gap-4 w-full mb-12" :class="is24Hour ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-2 md:grid-cols-4'">
             <!-- Hours -->
             <div class="group relative">
                <input 
                  id="hours"
                  v-model.number="hours"
                  type="number" 
                  :min="is24Hour ? 0 : 1" 
                  :max="is24Hour ? 23 : 12"
                  class="peer no-spinner w-full h-32 rounded-2xl border text-center text-4xl font-bold outline-none transition-all placeholder-transparent
                         bg-white border-gray-200 text-gray-900 hover:border-lime-500/50 focus:border-lime-500 focus:bg-white
                         dark:bg-white/5 dark:border-white/10 dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10 dark:hover:border-lime-400/50 dark:focus:border-lime-400"
                  placeholder="00"
                />
                <label for="hours" class="absolute top-4 left-0 right-0 text-center text-[10px] font-bold uppercase tracking-widest pointer-events-none transition-colors text-gray-400 peer-focus:text-lime-600 dark:text-gray-500 dark:peer-focus:text-lime-400">Hours</label>
             </div>

             <!-- Minutes -->
             <div class="group relative">
                <input 
                  id="minutes"
                  v-model.number="minutes"
                  type="number" 
                  min="0" max="59"
                  class="peer no-spinner w-full h-32 rounded-2xl border text-center text-4xl font-bold outline-none transition-all placeholder-transparent
                         bg-white border-gray-200 text-gray-900 hover:border-lime-500/50 focus:border-lime-500 focus:bg-white
                         dark:bg-white/5 dark:border-white/10 dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10 dark:hover:border-lime-400/50 dark:focus:border-lime-400"
                  placeholder="00"
                />
                <label for="minutes" class="absolute top-4 left-0 right-0 text-center text-[10px] font-bold uppercase tracking-widest pointer-events-none transition-colors text-gray-400 peer-focus:text-lime-600 dark:text-gray-500 dark:peer-focus:text-lime-400">Minutes</label>
             </div>

             <!-- AM/PM Toggle (Hidden in 24h mode) -->
             <div class="group relative" v-if="!is24Hour">
                <button 
                  id="period"
                  @click="period = period === 'AM' ? 'PM' : 'AM'"
                  class="peer w-full h-32 rounded-2xl border outline-none transition-all flex flex-col items-center justify-center gap-2 group/btn
                         bg-white border-gray-200 text-gray-900 hover:border-lime-500/50 focus:border-lime-500 focus:bg-white
                         dark:bg-white/5 dark:border-white/10 dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10 dark:hover:border-lime-400/50 dark:focus:border-lime-400"
                >
                  <span class="text-4xl font-bold">{{ period }}</span>
                  <div class="flex items-center gap-1 text-[10px] uppercase tracking-widest transition-colors text-gray-400 group-hover/btn:text-lime-600 dark:text-gray-500 dark:group-hover/btn:text-lime-400">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                    <span>Switch</span>
                  </div>
                </button>
                <label for="period" class="absolute top-4 left-0 right-0 text-center text-[10px] font-bold uppercase tracking-widest pointer-events-none transition-colors text-gray-400 peer-focus:text-lime-600 dark:text-gray-500 dark:peer-focus:text-lime-400">Period</label>
             </div>

             <!-- Full/Half Toggle (Hidden on Saturday) -->
             <div class="group relative flex flex-col h-32" v-if="!isSaturday">
                <button 
                  @click="isHalfDay = !isHalfDay"
                  class="peer w-full flex-1 rounded-2xl border outline-none transition-all flex flex-col items-center justify-center gap-1 group/btn relative overflow-hidden
                         bg-white border-gray-200 text-gray-900 hover:border-lime-500/50 focus:border-lime-500 focus:bg-white
                         dark:bg-white/5 dark:border-white/10 dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10 dark:hover:border-lime-400/50 dark:focus:border-lime-400"
                >
                  <!-- Neon Duration Badge -->
                  <div class="absolute top-3 px-2 py-0.5 rounded-md border text-[10px] font-bold tracking-widest shadow-[0_0_10px_rgba(163,230,53,0.2)]
                              bg-lime-100 border-lime-500 text-lime-700
                              dark:bg-lime-400/10 dark:border-lime-400 dark:text-lime-400">
                    {{ decimalHours }}H
                  </div>

                  <span class="text-2xl font-bold uppercase tracking-wider mt-4">{{ isHalfDay ? 'HALF' : 'FULL' }}</span>
                  <div class="flex items-center gap-1 text-[10px] uppercase tracking-widest transition-colors text-gray-400 group-hover/btn:text-lime-600 dark:text-gray-500 dark:group-hover/btn:text-lime-400">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                    <span>Switch</span>
                  </div>
                </button>
                <label class="absolute top-[-25px] left-0 right-0 text-center text-[10px] font-bold uppercase tracking-widest pointer-events-none transition-colors text-gray-400 peer-focus:text-lime-600 dark:text-gray-500 dark:peer-focus:text-lime-400 opacity-0">Session</label>
             </div>
          </div>

          <!-- Actions -->
          <div class="flex flex-col gap-4 items-center">
            <!-- Big Launcher/Resume Button -->
            <!-- If timer is running, this returns to focus (Highlight). If not, it starts. -->
            <button 
                @click="isTimerRunning ? showFocusMode = true : startTimer()"
                class="group relative inline-flex items-center justify-center px-12 py-6 overflow-hidden font-bold text-black transition-all duration-300 bg-lime-400 rounded-full hover:bg-lime-300 hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(163,230,53,0.3)]"
            >
                <span class="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-black"></span>
                <span class="relative text-lg uppercase tracking-[0.2em]">{{ isTimerRunning ? 'Return to Focus' : 'Initiate Sequence' }}</span>
            </button>

            <!-- Reset Button (Secondary, only if running) -->
            <button 
                v-if="isTimerRunning"
                @click="resetForm"
                class="text-[10px] uppercase tracking-widest text-red-400 hover:text-red-300 transition-colors flex items-center gap-2 px-4 py-2 rounded-full border border-transparent hover:border-red-400/20 hover:bg-red-400/10"
            >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span>Reset Timer</span>
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
           class="absolute top-[-80px] left-0 text-lime-600 dark:text-lime-400/70 hover:text-lime-700 dark:hover:text-lime-400 transition-all flex items-center gap-2 group 
                  border border-lime-500/30 hover:border-lime-500 hover:bg-lime-500/10 dark:border-lime-400/20 dark:hover:border-lime-400/50 dark:hover:bg-lime-400/10 
                  rounded-full px-4 py-2 
                  shadow-[0_0_15px_rgba(163,230,53,0.1)] hover:shadow-[0_0_25px_rgba(163,230,53,0.4)]"
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
        :is-24-hour="is24Hour"
        @reset="resetForm" 
        @toggle-sound="setReminder"
        @toggle-format="is24Hour = !is24Hour; calculateCheckoutTime()"
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
const is24Hour = ref(false)
const isHalfDay = ref(false)
const isSaturday = ref(false)
const currentDayName = ref('')

// Timer and checkout time
const formattedCheckoutTime = ref('--:--')
const remainingTime = ref('00:00:00')
const progressPercentage = ref(0)
const isTimerRunning = ref(false) 
const showFocusMode = ref(false) 

let timerInterval = null

// --- Smart Duration Logic ---
function setCurrentDay() {
  const date = new Date()
  const day = date.getDay() // 0=Sun, 6=Sat
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  currentDayName.value = days[day]
}

function detectDayAndDefaults() {
  const day = new Date().getDay()
  
  // Check specifically for Saturday (6)
  if (day === 6) {
    isSaturday.value = true
    isHalfDay.value = false
    decimalHours.value = 3.9
  } 
  // Mon(1) to Fri(5)
  else if (day >= 1 && day <= 5) {
    isSaturday.value = false
    isHalfDay.value = false
    decimalHours.value = 8.8
  } 
  // Sunday (0)
  else {
    isSaturday.value = false
    isHalfDay.value = false
    decimalHours.value = 8.8
  }
}

// Watch toggle to update duration on weekdays
watch(isHalfDay, (newVal) => {
  if (isSaturday.value) return // Should be hidden/disabled anyway
  if (newVal) {
    decimalHours.value = 4.3
  } else {
    decimalHours.value = 8.8
  }
})
// ----------------------------

// --- Input Validation ---
import { watch } from 'vue'
watch(minutes, (newVal) => {
  if (newVal === '') return
  if (newVal > 59) minutes.value = 59
  if (newVal < 0) minutes.value = 0
})
watch(hours, (newVal) => {
  if (newVal === '') return
  // Inputs are always 12h for ease of use
  if (newVal > 12) hours.value = 12
  if (newVal < 1) hours.value = 1
})
// ------------------------

function resetForm() {
  isTimerRunning.value = false
  showFocusMode.value = false 
  detectDayAndDefaults() // Reset back to smart defaults
  
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
  
  let formatted = ''
  if (is24Hour.value) {
      formatted = `${checkoutHours.toString().padStart(2, '0')}:${checkoutMinutes.toString().padStart(2, '0')}:${checkoutSeconds.toString().padStart(2, '0')}`
  } else {
      const checkoutPeriod = checkoutHours >= 12 ? 'PM' : 'AM'
      const displayHours = checkoutHours % 12 || 12
      formatted = `${displayHours}:${checkoutMinutes.toString().padStart(2, '0')}:${checkoutSeconds.toString().padStart(2, '0')} ${checkoutPeriod}`
  }

  formattedCheckoutTime.value = formatted

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
        decimalHours: decimalHours.value,
        is24Hour: is24Hour.value,
        isHalfDay: isHalfDay.value
      }
    }),
  )

  runTimer(checkoutDate.getTime(), totalDuration)
}

function runTimer(checkoutTime, totalDuration) {
  if (timerInterval) clearInterval(timerInterval)
  
  isTimerRunning.value = true
  showFocusMode.value = true 

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
        // Inverted: Start at 0, fill to 100
        progressPercentage.value = 100 - ((timeDiff / totalDuration) * 100)
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
        if (timerData.formState.is24Hour !== undefined) is24Hour.value = timerData.formState.is24Hour
        if (timerData.formState.isHalfDay !== undefined) isHalfDay.value = timerData.formState.isHalfDay
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
  } else {
    // Only detect defaults if NO active timer found
    detectDayAndDefaults()
  }
}

// ... rest of checking logic ...

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

import { scheduleNotification } from '@/composables/notification'

function setReminder() {
  const delay = Math.max(0, calculateCheckoutTime().getTime() - new Date().getTime() - (5 * 60 * 1000))
  
  scheduleNotification(
    'Checkout Reminder',
    {
        body: `Your session will end in 5 minutes at ${formattedCheckoutTime.value}`,
        vibrate: [200, 100, 200],
        icon: '/office-time-calculator/notification-icon.png',
        badge: '/office-time-calculator/badge-icon.png'
    },
    delay
  )
}

function resetNotification() {
  if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage({
      type: 'CANCEL_NOTIFICATION',
    })
  }
}

onMounted(() => {
  setCurrentDay() // Always set the day name
  resumeTimer()
  checkAndRestoreCheckoutTime()
})
</script>
