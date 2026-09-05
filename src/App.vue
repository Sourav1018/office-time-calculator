<script setup>
import { onMounted, ref } from 'vue'
import { RouterView } from 'vue-router'
import { requestNotificationPermission } from '@/composables/notification'

const isDark = ref(true)
const isColorMenuOpen = ref(false)
const currentAccentHex = ref('#a3e635')

const presetColors = [
  { name: 'Neon Green', hex: '#a3e635' },
  { name: 'Electric Cyan', hex: '#06b6d4' },
  { name: 'Neon Violet', hex: '#a855f7' },
  { name: 'Hot Pink', hex: '#ec4899' },
  { name: 'Sunset Orange', hex: '#f97316' },
  { name: 'Electric Blue', hex: '#3b82f6' },
  { name: 'Emerald', hex: '#10b981' },
  { name: 'Golden Yellow', hex: '#eab308' },
  { name: 'Crimson Red', hex: '#f43f5e' },
]

function hexToRgb(hex) {
  let c = hex.replace('#', '')
  if (c.length === 3)
    c = c
      .split('')
      .map((x) => x + x)
      .join('')
  const num = parseInt(c, 16)
  if (isNaN(num)) return '163, 230, 53'
  return `${(num >> 16) & 255}, ${(num >> 8) & 255}, ${num & 255}`
}

function setAccentColor(hex) {
  currentAccentHex.value = hex
  const rgb = hexToRgb(hex)
  document.documentElement.style.setProperty('--accent-color', hex)
  document.documentElement.style.setProperty('--accent-rgb', rgb)
  localStorage.setItem('accentColor', hex)
}

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

  const savedAccent = localStorage.getItem('accentColor')
  if (savedAccent) {
    setAccentColor(savedAccent)
  } else {
    setAccentColor('#a3e635')
  }
})
</script>

<template>
  <div
    class="relative min-h-screen bg-slate-50 dark:bg-[#09090b] text-slate-900 dark:text-slate-100 transition-colors duration-500 font-sans"
  >
    <!-- Background Ambient Orbs & Mesh Glow -->
    <div class="fixed inset-0 z-0 overflow-hidden pointer-events-none select-none">
      <!-- Top Left Dynamic Glow -->
      <div
        class="absolute -top-32 -left-32 w-[550px] h-[550px] rounded-full blur-[130px] animate-float-slow transition-colors duration-700"
        :style="{ backgroundColor: currentAccentHex, opacity: isDark ? 0.12 : 0.2 }"
      ></div>

      <!-- Bottom Right Glow -->
      <div
        class="absolute -bottom-32 -right-32 w-[600px] h-[600px] rounded-full bg-cyan-400/20 dark:bg-emerald-500/10 blur-[140px] animate-float-slow"
        style="animation-delay: -6s"
      ></div>

      <!-- Center Soft Accent -->
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

    <!-- Top Right Floating Controls Wrapper -->
    <div class="fixed top-6 right-6 z-[999] flex items-center gap-2.5">
      <!-- Palette Popover Toggle Button -->
      <div class="relative">
        <button
          @click="isColorMenuOpen = !isColorMenuOpen"
          class="p-3 rounded-2xl transition-all duration-300 backdrop-blur-xl border flex items-center justify-center group shadow-xl active:scale-95 cursor-pointer"
          :class="
            isDark
              ? 'bg-zinc-900/80 border-zinc-700/60 text-slate-200 hover:border-slate-400/60'
              : 'bg-white/80 border-slate-200 text-slate-700 hover:border-slate-400/60 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.08)]'
          "
          title="Customize Theme Accent Color"
        >
          <!-- Color Swatch Circle Indicator -->
          <span
            class="w-5 h-5 rounded-full shadow-inner border border-white/40 transform group-hover:scale-110 transition-transform duration-300"
            :style="{ backgroundColor: currentAccentHex }"
          ></span>
        </button>

        <!-- Color Palette Dropdown Menu -->
        <transition
          enter-active-class="transition duration-200 ease-out"
          enter-from-class="opacity-0 scale-95 -translate-y-2"
          enter-to-class="opacity-100 scale-100 translate-y-0"
          leave-active-class="transition duration-150 ease-in"
          leave-from-class="opacity-100 scale-100 translate-y-0"
          leave-to-class="opacity-0 scale-95 -translate-y-2"
        >
          <div
            v-if="isColorMenuOpen"
            class="absolute right-0 mt-3 w-72 rounded-3xl p-5 shadow-2xl glass-panel border z-[1000]"
          >
            <div class="flex items-center justify-between mb-4">
              <span
                class="text-xs font-black uppercase tracking-widest text-slate-700 dark:text-slate-200 flex items-center gap-1.5"
              >
                <span>🎨 Accent Color</span>
              </span>
              <button
                @click="isColorMenuOpen = false"
                class="text-slate-400 hover:text-slate-600 dark:hover:text-white text-xs font-bold"
              >
                ✕
              </button>
            </div>

            <!-- Preset Swatches Grid -->
            <div class="grid grid-cols-5 gap-2.5 mb-4">
              <button
                v-for="color in presetColors"
                :key="color.hex"
                @click="setAccentColor(color.hex)"
                class="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 relative group active:scale-90 border border-white/20 shadow-md"
                :style="{ backgroundColor: color.hex }"
                :title="color.name"
              >
                <svg
                  v-if="currentAccentHex === color.hex"
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 text-slate-950 font-bold"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </div>

            <!-- Custom Hex Picker -->
            <div
              class="pt-3 border-t border-slate-200/60 dark:border-white/10 flex items-center justify-between"
            >
              <span
                class="text-[10px] font-extrabold uppercase tracking-widest text-slate-500 dark:text-slate-400"
                >Custom Picker</span
              >
              <div class="flex items-center gap-2">
                <span
                  class="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 uppercase"
                  >{{ currentAccentHex }}</span
                >
                <input
                  type="color"
                  :value="currentAccentHex"
                  @input="setAccentColor($event.target.value)"
                  class="w-7 h-7 rounded-lg border-0 cursor-pointer bg-transparent"
                  title="Pick Any Custom Color"
                />
              </div>
            </div>
          </div>
        </transition>
      </div>

      <!-- Floating Glass Theme Toggle Button -->
      <button
        @click="toggleTheme"
        class="p-3 rounded-2xl transition-all duration-300 backdrop-blur-xl border flex items-center justify-center group shadow-xl active:scale-95 cursor-pointer"
        :class="
          isDark
            ? 'bg-zinc-900/80 border-zinc-700/60 text-slate-200 hover:border-slate-400/60'
            : 'bg-white/80 border-slate-200 text-slate-700 hover:border-slate-400/60 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.08)]'
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
  </div>
</template>

<style scoped>
/* Removed colorful blob animations for a static, elegant look */
</style>
