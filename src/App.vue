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
  <div
    class="relative min-h-screen bg-slate-50 dark:bg-[#09090b] text-slate-900 dark:text-slate-100 transition-colors duration-500 font-sans"
  >
    <!-- Background Ambient Orbs & Mesh Glow -->
    <div class="fixed inset-0 z-0 overflow-hidden pointer-events-none select-none">
      <!-- Top Left Lime Glow -->
      <div
        class="absolute -top-32 -left-32 w-[550px] h-[550px] rounded-full bg-lime-400/20 dark:bg-lime-400/10 blur-[130px] animate-float-slow"
      ></div>

      <!-- Bottom Right Cyan/Violet Glow -->
      <div
        class="absolute -bottom-32 -right-32 w-[600px] h-[600px] rounded-full bg-cyan-400/20 dark:bg-emerald-500/10 blur-[140px] animate-float-slow"
        style="animation-delay: -6s"
      ></div>

      <!-- Center Soft Violet Accent -->
      <div
        class="absolute top-1/3 right-1/4 w-[350px] h-[350px] rounded-full bg-indigo-400/15 dark:bg-violet-600/10 blur-[100px]"
      ></div>

      <!-- Subtle Grid Pattern -->
      <div
        class="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
        style="
          background-image: radial-gradient(#ffffff 1px, transparent 1px);
          background-size: 32px 32px;
        "
      ></div>
    </div>

    <!-- Main Content View -->
    <RouterView />

    <!-- Floating Glass Theme Toggle Button -->
    <button
      @click="toggleTheme"
      class="fixed top-6 right-6 z-[999] p-3 rounded-2xl transition-all duration-300 backdrop-blur-xl border flex items-center justify-center group shadow-xl active:scale-95"
      :class="
        isDark
          ? 'bg-zinc-900/80 border-zinc-700/60 text-lime-400 hover:border-lime-400/60 hover:shadow-[0_0_25px_rgba(163,230,53,0.25)]'
          : 'bg-white/80 border-slate-200 text-slate-700 hover:border-lime-500/60 hover:text-lime-600 hover:shadow-[0_10px_25px_-5px_rgba(163,230,53,0.3)]'
      "
      :title="isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
    >
      <!-- Sun Icon (Show in Dark Mode -> Click to go Light) -->
      <svg
        v-if="isDark"
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5 transform group-hover:rotate-90 transition-transform duration-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
      <!-- Moon Icon (Show in Light Mode -> Click to go Dark) -->
      <svg
        v-else
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5 transform group-hover:-rotate-12 transition-transform duration-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
        />
      </svg>
    </button>
  </div>
</template>

<style scoped>
/* Removed colorful blob animations for a static, elegant look */
</style>
