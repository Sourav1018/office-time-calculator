<script setup>
import { onMounted, ref } from 'vue'
import { RouterView } from 'vue-router'
import { requestNotificationPermission } from '@/composables/notification'

const isDark = ref(true)

function toggleTheme() {
  isDark.value = !isDark.value
  updateThemeClass()
}

function updateThemeClass() {
  if (isDark.value) {
    document.documentElement.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  }
}

onMounted(() => {
  requestNotificationPermission()
  
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme) {
    isDark.value = savedTheme === 'dark'
  } else {
    isDark.value = true
  }
  updateThemeClass()
})
</script>

<template>
  <div class="relative min-h-screen">
    <!-- Background Elements -->
    <div class="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-black">
      <!-- Large Circle Top Left -->
      <div class="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-white/5 blur-[80px] border border-white/5"></div>
      
      <!-- Rounded Square Bottom Right -->
      <div class="absolute bottom-[5%] right-[-5%] w-[400px] h-[400px] rounded-[3rem] bg-white/5 blur-[60px] transform rotate-12 border border-white/5"></div>
      
      <!-- Small Circle Center Right -->
      <div class="absolute top-[30%] right-[10%] w-[200px] h-[200px] rounded-full bg-gray-800/20 blur-[40px] border border-white/5"></div>
      
      <!-- Capsule shape Bottom Left -->
      <div class="absolute bottom-[20%] left-[10%] w-[150px] h-[300px] rounded-full bg-white/5 blur-[50px] transform -rotate-45 border border-white/5"></div>
    </div>

    <RouterView />
    
    <!-- Global Theme Toggle -->
    <button 
      @click="toggleTheme" 
      class="fixed top-6 right-6 z-[9999] p-2.5 rounded-full transition-all duration-300 shadow-lg border backdrop-blur-md group"
      :class="isDark 
        ? 'bg-black/50 border-lime-400 text-lime-400 shadow-[0_0_15px_rgba(163,230,53,0.3)] hover:bg-lime-400/10 hover:shadow-[0_0_25px_rgba(163,230,53,0.5)]' 
        : 'bg-white/80 border-gray-200 text-gray-400 hover:text-lime-600 hover:border-lime-400 hover:shadow-[0_0_15px_rgba(163,230,53,0.3)]'"
      title="Switch Theme"
    >
      <!-- Sun Icon (Show in Dark Mode -> Click to go Light) -->
      <svg v-if="isDark" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 transform group-hover:rotate-90 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
      <!-- Moon Icon (Show in Light Mode -> Click to go Dark) -->
      <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 transform group-hover:-rotate-12 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      </svg>
    </button>
  </div>
</template>

<style scoped>
/* Removed colorful blob animations for a static, elegant look */
</style>
