<template>
  <div class="container mx-auto p-4">
    <!-- Form Card -->
    <BaseCard title="Setup Timer" class="max-w-lg mx-auto">
      <template #header>
        <div class="text-gray-600">setting up the timer as per your need</div>
      </template>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <!-- Hours Input -->
        <div>
          <label for="hours" class="block text-sm font-medium text-gray-700">Hours</label>
          <input
            id="hours"
            v-model.number="hours"
            type="number"
            min="1"
            max="12"
            class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="HH"
          />
        </div>

        <!-- Minutes Input -->
        <div>
          <label for="minutes" class="block text-sm font-medium text-gray-700">Minutes</label>
          <input
            id="minutes"
            v-model.number="minutes"
            type="number"
            min="0"
            max="59"
            class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="MM"
          />
        </div>

        <!-- Dropdown for AM/PM -->
        <div>
          <label for="period" class="block text-sm font-medium text-gray-700">AM/PM</label>
          <select
            id="period"
            v-model="period"
            class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </select>
        </div>

        <!-- Decimal Hours Input -->
        <div class="col-span-full">
          <label for="decimal-hours" class="block text-sm font-medium text-gray-700"
            >Decimal Hours</label
          >
          <input
            id="decimal-hours"
            v-model.number="decimalHours"
            type="number"
            step="0.01"
            min="0"
            class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., 8.56"
          />
        </div>
      </div>

      <template #footer>
        <div class="grid grid-cols-2 gap-4 mx-auto">
          <!-- Confirm Button -->
          <button
            class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
            @click="startTimer"
          >
            Start Timer
          </button>
          <!-- Reset Button -->
          <button
            @click="resetForm"
            type="button"
            class="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 w-full"
          >
            Reset
          </button>
        </div>
      </template>
    </BaseCard>

    <!-- Timer and Checkout Time Layout -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6 mx-auto">
      <!-- Timer Card -->
      <BaseCard title="Timer" class="w-full">
        <template #header>
          <div class="text-gray-600">Countdown Timer</div>
        </template>
        <p class="text-center text-xl font-semibold text-gray-700">
          <span id="timer">{{ remainingTime }}</span>
        </p>
      </BaseCard>

      <!-- Checkout Time Card -->
      <BaseCard title="End Time" class="w-full">
        <template #header>
          <div class="flex justify-between">
            <div class="text-gray-600">calculated end time</div>
            <button
              @click="setReminder"
              class="bg-purple-500 hover:bg-purple-600 text-white rounded-full p-2"
              title="Set Reminder"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"
                />
              </svg>
            </button>
          </div>
        </template>
        <p class="text-center text-xl font-semibold text-gray-700">
          <span id="checkout-time">{{ formattedCheckoutTime }}</span>
        </p>
      </BaseCard>
    </div>
  </div>
</template>

<script setup>
import BaseCard from '@/components/BaseCard.vue'
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
const remainingTime = ref('--:--')
let timerInterval = null

function resetForm() {
  hours.value = ''
  minutes.value = ''
  period.value = 'AM'
  decimalHours.value = ''
  formattedCheckoutTime.value = '--:--'
  remainingTime.value = '--:--'
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
  const checkoutPeriod = checkoutHours >= 12 ? 'PM' : 'AM'
  const displayHours = checkoutHours % 12 || 12

  formattedCheckoutTime.value = `${displayHours}:${checkoutMinutes.toString().padStart(2, '0')} ${checkoutPeriod}`

  return checkoutDate
}

function saveCheckoutTime() {
  const currentDateKey = `date_${new Date().toISOString().split('T')[0]}` // Get current date in YYYY-MM-DD format
  localStorage.setItem(currentDateKey, formattedCheckoutTime.value) // Store checkout time for today
}

function startTimer() {
  const startHours = (hours.value % 12) + (period.value === 'PM' ? 12 : 0)
  const startMinutes = minutes.value
  const startTime = new Date()
  startTime.setHours(startHours, startMinutes, 0)

  const checkoutDate = calculateCheckoutTime()

  saveCheckoutTime()

  localStorage.setItem(
    'timerData',
    JSON.stringify({
      startTime: startTime.getTime(),
      checkoutDate: checkoutDate.getTime(),
    }),
  )

  if (timerInterval) clearInterval(timerInterval)

  timerInterval = setInterval(() => {
    const now = new Date()
    const timeDiff = checkoutDate - now

    if (timeDiff <= 0) {
      clearInterval(timerInterval)
      remainingTime.value = '00:00:00'
      clearTimerData()
      return
    }

    const hoursLeft = Math.floor(timeDiff / (1000 * 60 * 60))
    const minutesLeft = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60))
    const secondsLeft = Math.floor((timeDiff % (1000 * 60)) / 1000)

    remainingTime.value = `${hoursLeft.toString().padStart(2, '0')}:${minutesLeft
      .toString()
      .padStart(2, '0')}:${secondsLeft.toString().padStart(2, '0')}`
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
    const currentTime = new Date().getTime()
    const remainingTimeInMillis = timerData.checkoutDate - currentTime

    if (remainingTimeInMillis > 0) {
      // Restore the countdown
      const hoursLeft = Math.floor(remainingTimeInMillis / (1000 * 60 * 60))
      const minutesLeft = Math.floor((remainingTimeInMillis % (1000 * 60 * 60)) / (1000 * 60))
      const secondsLeft = Math.floor((remainingTimeInMillis % (1000 * 60)) / 1000)

      remainingTime.value = `${hoursLeft.toString().padStart(2, '0')}:${minutesLeft
        .toString()
        .padStart(2, '0')}:${secondsLeft.toString().padStart(2, '00')}`

      // Restart the timer countdown
      timerInterval = setInterval(() => {
        const now = new Date()
        const timeDiff = timerData.checkoutDate - now

        if (timeDiff <= 0) {
          clearInterval(timerInterval)
          remainingTime.value = '00:00:00'
          clearTimerData()
          return
        }

        const hoursLeft = Math.floor(timeDiff / (1000 * 60 * 60))
        const minutesLeft = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60))
        const secondsLeft = Math.floor((timeDiff % (1000 * 60)) / 1000)

        remainingTime.value = `${hoursLeft.toString().padStart(2, '0')}:${minutesLeft
          .toString()
          .padStart(2, '0')}:${secondsLeft.toString().padStart(2, '00')}`
      }, 1000)
    } else {
      // Timer is finished, clear localStorage
      remainingTime.value = '00:00:00'
      clearTimerData()
    }
  }
}

function checkAndRestoreCheckoutTime() {
  const currentDateKey = `date_${new Date().toISOString().split('T')[0]}` // Current date in YYYY-MM-DD format
  const savedCheckoutTime = localStorage.getItem(currentDateKey)


  // Get all the keys in localStorage
  const allKeys = Object.keys(localStorage)

  allKeys.forEach((key) => {
    // If the key starts with 'date_' (we know it's a date-related key)
    if (key.startsWith('date_')) {
      const storedDate = key.split('_')[1] // Extract the date part (YYYY-MM-DD)
      const currentDate = new Date().toISOString().split('T')[0] // Get the current date in YYYY-MM-DD format

      // If the stored date is before today (lexicographical comparison of the date strings)
      if (storedDate < currentDate) {
        localStorage.removeItem(key)
      }
    }
  })

  // Now check if we have today's checkout time stored
  if (savedCheckoutTime) {
    formattedCheckoutTime.value = savedCheckoutTime // Use the saved checkout time
  } else {
    // Reset to default checkout time if no value exists for today
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

<style></style>
