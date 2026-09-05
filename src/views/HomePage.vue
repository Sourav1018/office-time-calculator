<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center relative overflow-hidden font-sans transition-colors duration-500 bg-slate-50 dark:bg-[#09090b]"
  >
    <!-- Background Subtle Radial Gradient Grid -->
    <div
      class="absolute inset-0 z-0 pointer-events-none opacity-30 dark:opacity-20"
      style="
        background-image: radial-gradient(
          circle at 50% 50%,
          rgba(var(--accent-rgb), 0.15) 0%,
          transparent 60%
        );
      "
    ></div>

    <!-- MAIN CONTENT CONTAINER -->
    <div
      class="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 pt-4 sm:pt-8 pb-32 sm:pb-36 transition-all duration-700 ease-out"
      :class="showFocusMode ? 'scale-[0.99]' : 'scale-100'"
    >
      <!-- ================= SETUP MODE ================= -->
      <div
        class="transition-all duration-500 ease-out flex flex-col items-center justify-center"
        :class="
          showFocusMode
            ? 'opacity-0 scale-95 pointer-events-none absolute inset-0'
            : 'opacity-100 scale-100 relative'
        "
      >
        <!-- Modern Bento Header -->
        <div class="text-center mb-6 sm:mb-10">
          <div
            class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card mb-3 sm:mb-4 text-xs font-bold uppercase tracking-widest text-slate-600 dark:text-slate-300 shadow-sm border border-slate-200/80 dark:border-white/10"
          >
            <span
              class="w-2 h-2 rounded-full animate-pulse"
              :style="{ backgroundColor: 'var(--accent-color)' }"
            ></span>
            <span>{{ currentDayName }} Shift</span>
          </div>

          <h1
            class="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white mb-2"
          >
            Office Time <span class="gradient-text-lime">Calculator</span>
          </h1>
          <p
            class="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto font-medium"
          >
            Set your check-in time to accurately compute your mandatory checkout hour.
          </p>
        </div>

        <!-- Format Toggle Bar & Preview Trigger -->
        <div class="mb-5 sm:mb-6 flex items-center justify-center gap-3 flex-wrap">
          <button
            @click="toggleTimeFormat"
            class="text-[10px] sm:text-[11px] font-black uppercase tracking-widest px-3.5 sm:px-4 py-1.5 rounded-full glass-card border transition-all duration-300 shadow-sm active:scale-95 flex items-center gap-2 cursor-pointer"
            :class="
              is24Hour
                ? ''
                : 'text-slate-600 dark:text-slate-400 border-slate-200 dark:border-white/10 hover:border-slate-300'
            "
            :style="
              is24Hour
                ? {
                    color: 'var(--accent-color)',
                    borderColor: 'rgba(var(--accent-rgb), 0.6)',
                    backgroundColor: 'rgba(var(--accent-rgb), 0.1)',
                  }
                : {}
            "
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
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{{ is24Hour ? '24-Hour Format' : '12-Hour Format' }}</span>
          </button>

          <!-- Preview Sarcastic Celebration Popup Button -->
          <button
            @click="isShiftEndedModalOpen = true"
            class="text-[10px] sm:text-[11px] font-black uppercase tracking-widest px-3.5 sm:px-4 py-1.5 rounded-full glass-card border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 transition-all duration-300 shadow-sm active:scale-95 flex items-center gap-1.5 cursor-pointer hover:border-amber-400/50 hover:bg-amber-400/10"
          >
            <span>Preview Celebration</span>
            <span>🥳</span>
          </button>
        </div>

        <!-- Bento Grid Inputs Container -->
        <div
          class="grid gap-3 sm:gap-4 w-full max-w-2xl mb-6 sm:mb-8"
          :class="!is24Hour ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-2 md:grid-cols-3'"
        >
          <!-- Hours Card Input -->
          <div
            class="glass-panel rounded-3xl p-4 sm:p-5 flex flex-col justify-between relative group transition-all duration-300 shadow-xl"
          >
            <div
              class="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1 sm:mb-2"
            >
              <span>In Hour</span>
              <span class="font-mono transition-colors" :style="{ color: 'var(--accent-color)' }"
                >HH</span
              >
            </div>

            <input
              id="hours"
              v-model.number="hours"
              type="number"
              :min="is24Hour ? 0 : 1"
              :max="is24Hour ? 23 : 12"
              class="no-spinner w-full bg-transparent text-center text-3xl sm:text-5xl font-black outline-none tracking-tight text-slate-900 dark:text-white placeholder-slate-300 dark:placeholder-zinc-700 font-mono py-1 sm:py-2"
              placeholder="09"
            />

            <div
              class="text-[9px] text-center font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest mt-1"
            >
              {{ is24Hour ? '(00 - 23)' : '(01 - 12)' }}
            </div>
          </div>

          <!-- Minutes Card Input -->
          <div
            class="glass-panel rounded-3xl p-4 sm:p-5 flex flex-col justify-between relative group transition-all duration-300 shadow-xl"
          >
            <div
              class="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1 sm:mb-2"
            >
              <span>In Minute</span>
              <span class="font-mono transition-colors" :style="{ color: 'var(--accent-color)' }"
                >MM</span
              >
            </div>

            <input
              id="minutes"
              v-model.number="minutes"
              type="number"
              min="0"
              max="59"
              class="no-spinner w-full bg-transparent text-center text-3xl sm:text-5xl font-black outline-none tracking-tight text-slate-900 dark:text-white placeholder-slate-300 dark:placeholder-zinc-700 font-mono py-1 sm:py-2"
              placeholder="30"
            />

            <div
              class="text-[9px] text-center font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest mt-1"
            >
              (00 - 59)
            </div>
          </div>

          <!-- AM / PM Toggle Card (Hidden in 24h mode) -->
          <div
            class="glass-panel rounded-3xl p-4 sm:p-5 flex flex-col justify-between relative group transition-all duration-300 shadow-xl"
            v-if="!is24Hour"
          >
            <div
              class="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1 sm:mb-2 text-center"
            >
              Period
            </div>

            <button
              id="period"
              @click="period = period === 'AM' ? 'PM' : 'AM'"
              class="w-full flex-1 rounded-2xl border transition-all duration-300 flex flex-col items-center justify-center gap-0.5 sm:gap-1 active:scale-95 py-1.5 sm:py-2 bg-slate-100/80 border-slate-200 text-slate-900 dark:bg-zinc-800/60 dark:border-zinc-700/60 dark:text-white"
            >
              <span
                class="text-2xl sm:text-3xl font-black tracking-wider font-mono transition-colors"
                :style="{ color: 'var(--accent-color)' }"
                >{{ period }}</span
              >
              <span
                class="text-[9px] font-extrabold uppercase tracking-widest text-slate-600 dark:text-slate-400"
                >Click Switch</span
              >
            </button>

            <div
              class="text-[9px] text-center font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest mt-1"
            >
              Meridiem
            </div>
          </div>

          <!-- Shift Mode Toggle Card (Full/Half Day) -->
          <div
            class="glass-panel rounded-3xl p-4 sm:p-5 flex flex-col justify-between relative group transition-all duration-300 shadow-xl"
            v-if="!isSaturday"
          >
            <div
              class="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1 sm:mb-2"
            >
              <span>Shift Type</span>
              <span
                class="px-1.5 py-0.5 rounded text-[9px] font-extrabold transition-colors border"
                :style="{
                  backgroundColor: 'rgba(var(--accent-rgb), 0.2)',
                  color: 'var(--accent-color)',
                  borderColor: 'rgba(var(--accent-rgb), 0.3)',
                }"
              >
                {{ decimalHours }}h
              </span>
            </div>

            <button
              @click="isHalfDay = !isHalfDay"
              class="w-full flex-1 rounded-2xl border transition-all duration-300 flex flex-col items-center justify-center gap-0.5 sm:gap-1 active:scale-95 py-1.5 sm:py-2 bg-slate-100/80 border-slate-200 text-slate-900 dark:bg-zinc-800/60 dark:border-zinc-700/60 dark:text-white"
            >
              <span
                class="text-lg sm:text-xl font-black uppercase tracking-wider text-slate-900 dark:text-white"
                >{{ isHalfDay ? 'HALF DAY' : 'FULL DAY' }}</span
              >
              <span
                class="text-[9px] font-extrabold uppercase tracking-widest text-slate-600 dark:text-slate-400"
                >Toggle Mode</span
              >
            </button>

            <div
              class="text-[9px] text-center font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest mt-1"
            >
              {{ isHalfDay ? '4.3 Hours' : '8.8 Hours' }}
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-col gap-3 items-center w-full max-w-sm">
          <!-- Big Pulsing Launch CTA Button -->
          <button
            @click="isTimerRunning ? (showFocusMode = true) : startTimer()"
            class="w-full relative inline-flex items-center justify-center px-8 py-3.5 sm:py-4 overflow-hidden font-black text-slate-950 transition-all duration-300 rounded-2xl hover:scale-[1.02] active:scale-[0.98] group cursor-pointer"
            :style="{
              backgroundColor: 'var(--accent-color)',
              borderColor: 'var(--accent-color)',
              boxShadow: '0 0 30px rgba(var(--accent-rgb), 0.35)',
            }"
          >
            <span
              class="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-20 transition-opacity bg-white"
            ></span>
            <span
              class="relative text-xs sm:text-sm uppercase tracking-[0.2em] flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clip-rule="evenodd"
                />
              </svg>
              <span>{{ isTimerRunning ? 'Return to Countdown' : 'Calculate Checkout' }}</span>
            </span>
          </button>

          <!-- Secondary Reset Button -->
          <button
            v-if="isTimerRunning"
            @click="resetForm"
            class="text-[11px] font-extrabold uppercase tracking-widest text-rose-500 hover:text-rose-600 dark:text-rose-400 dark:hover:text-rose-300 transition-colors flex items-center gap-1.5 px-4 py-2 rounded-xl border border-transparent hover:border-rose-500/20 hover:bg-rose-500/10"
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
            <span>Reset Timer Data</span>
          </button>
        </div>
      </div>

      <!-- ================= FOCUS MODE ================= -->
      <div
        class="transition-all duration-700 ease-out flex flex-col items-center justify-center relative z-20 py-4 sm:py-6"
        :class="
          showFocusMode
            ? 'opacity-100 scale-100 relative'
            : 'opacity-0 scale-90 pointer-events-none absolute inset-0'
        "
      >
        <!-- Floating Back Button (Generous margin below to prevent overlap) -->
        <button
          @click.stop="showFocusMode = false"
          class="relative z-50 mb-10 sm:mb-14 px-6 py-2.5 sm:py-3 rounded-full glass-card border transition-all duration-300 flex items-center gap-2 group active:scale-95 hover:scale-105 shadow-xl cursor-pointer text-slate-800 border-slate-300 hover:border-slate-400 dark:text-slate-100 dark:border-white/20 dark:hover:border-white/40"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 transform group-hover:-translate-x-1 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2.5"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          <span class="text-xs uppercase tracking-widest font-black">Adjust Setup</span>
        </button>

        <!-- Animated Timer Gauge (Clean margin & fluid scaling) -->
        <AnimatedTimer
          :time-left="remainingTime"
          :progress="progressPercentage"
          :is-active="isTimerRunning"
        />
      </div>
    </div>

    <!-- DATA DECK (Bottom Floating HUD) -->
    <transition
      enter-active-class="transition duration-500 ease-out"
      enter-from-class="translate-y-full opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition duration-300 ease-in"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="translate-y-full opacity-0"
    >
      <DataDeck
        v-if="showFocusMode"
        :end-time="formattedCheckoutTime"
        :is-24-hour="is24Hour"
        :is-reminder-active="isReminderActive"
        @reset="resetForm"
        @toggle-sound="setReminder"
        @toggle-format="toggleTimeFormat"
      />
    </transition>
    <!-- Shift Ended Sarcastic Modal Popup -->
    <ShiftEndedModal
      :is-open="isShiftEndedModalOpen"
      :checkout-time="formattedCheckoutTime"
      @close="isShiftEndedModalOpen = false"
    />
  </div>
</template>

<script setup>
import AnimatedTimer from '@/components/AnimatedTimer.vue'
import DataDeck from '@/components/DataDeck.vue'
import ShiftEndedModal from '@/components/ShiftEndedModal.vue'
import { onMounted, ref, watch } from 'vue'

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
const isReminderActive = ref(false)
const isShiftEndedModalOpen = ref(false)

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
  isReminderActive.value = false
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

function toggleTimeFormat() {
  is24Hour.value = !is24Hour.value
  calculateCheckoutTime()
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

function saveTimerDataState() {
  const timerData = JSON.parse(localStorage.getItem('timerData')) || {}
  timerData.isReminderActive = isReminderActive.value
  localStorage.setItem('timerData', JSON.stringify(timerData))
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
      isReminderActive: isReminderActive.value,
      formState: {
        hours: hours.value,
        minutes: minutes.value,
        period: period.value,
        decimalHours: decimalHours.value,
        is24Hour: is24Hour.value,
        isHalfDay: isHalfDay.value,
      },
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
      progressPercentage.value = 100
      isTimerRunning.value = false
      isReminderActive.value = false
      isShiftEndedModalOpen.value = true
      notifyUser(
        'Shift Completed!',
        `Your shift has officially ended at ${formattedCheckoutTime.value}. Time to check out!`,
      )
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
      progressPercentage.value = 100 - (timeDiff / totalDuration) * 100
    } else {
      progressPercentage.value = 100
    }
  }, 1000)
}

function clearTimerData() {
  localStorage.removeItem('timerData')
}

function clearExistingDate() {
  const allKeys = Object.keys(localStorage)
  allKeys.forEach((key) => {
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
      if (timerData.formState.isHalfDay !== undefined)
        isHalfDay.value = timerData.formState.isHalfDay
    }

    if (timerData.isReminderActive !== undefined) {
      isReminderActive.value = timerData.isReminderActive
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

import { scheduleNotification, notifyUser } from '@/composables/notification'

function setReminder() {
  // Toggle reminder active state
  isReminderActive.value = !isReminderActive.value

  if (!isReminderActive.value) {
    resetNotification()
    saveTimerDataState()
    return
  }

  const now = new Date().getTime()
  const checkoutTimeMs = calculateCheckoutTime().getTime()

  // 1. Notification 5 minutes before checkout
  const fiveMinDelay = Math.max(0, checkoutTimeMs - now - 5 * 60 * 1000)
  scheduleNotification(
    '5-Minute Checkout Warning',
    {
      body: `Your session will end in 5 minutes at ${formattedCheckoutTime.value}`,
      vibrate: [200, 100, 200],
      icon: '/office-time-calculator/notification-icon.png',
      badge: '/office-time-calculator/badge-icon.png',
    },
    fiveMinDelay,
  )

  // 2. Notification AT checkout time (0 minutes left)
  const finalDelay = Math.max(0, checkoutTimeMs - now)
  scheduleNotification(
    'Shift Completed!',
    {
      body: `Your shift has officially ended at ${formattedCheckoutTime.value}. Time to check out!`,
      vibrate: [300, 100, 300, 100, 300],
      icon: '/office-time-calculator/notification-icon.png',
      badge: '/office-time-calculator/badge-icon.png',
    },
    finalDelay,
  )

  saveTimerDataState()
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
