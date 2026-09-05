<template>
  <Teleport to="body">
    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="isOpen"
        class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto select-none"
      >
        <!-- Backdrop Blur overlay -->
        <div
          class="fixed inset-0 bg-slate-950/70 backdrop-blur-md transition-opacity"
          @click="closeModal"
        ></div>

        <!-- Floating Sarcastic Confetti / Particle FX background -->
        <div class="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <span
            v-for="(emoji, index) in floatingEmojis"
            :key="index"
            class="absolute text-2xl sm:text-3xl animate-float-emoji opacity-75"
            :style="emoji.style"
          >
            {{ emoji.char }}
          </span>
        </div>

        <!-- Modal Dialog Box -->
        <div
          class="relative z-10 w-full max-w-lg glass-panel rounded-3xl p-6 sm:p-8 shadow-2xl border transition-all duration-300 text-center overflow-hidden group"
          :style="{
            borderColor: 'rgba(var(--accent-rgb), 0.4)',
            boxShadow: '0 25px 60px -15px rgba(var(--accent-rgb), 0.25)',
          }"
        >
          <!-- Top Ambient Glow Badge -->
          <div
            class="absolute -top-24 left-1/2 transform -translate-x-1/2 w-48 h-48 rounded-full blur-3xl pointer-events-none opacity-40"
            :style="{ backgroundColor: 'var(--accent-color)' }"
          ></div>

          <!-- Top Badge Indicator -->
          <div
            class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card mb-4 text-[10px] sm:text-xs font-black uppercase tracking-widest text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-white/10 shadow-sm"
          >
            <span
              class="w-2.5 h-2.5 rounded-full animate-ping"
              :style="{ backgroundColor: 'var(--accent-color)' }"
            ></span>
            <span>Shift Completed {{ checkoutTime ? `@ ${checkoutTime}` : '' }}</span>
          </div>

          <!-- Big Sarcastic Animated Sticker Container -->
          <div class="my-3 sm:my-5 flex justify-center">
            <div
              class="relative w-24 h-24 sm:w-28 sm:h-28 rounded-3xl flex items-center justify-center text-5xl sm:text-6xl glass-card shadow-inner transform transition-transform duration-500 hover:rotate-6 hover:scale-110 border"
              :style="{
                borderColor: 'rgba(var(--accent-rgb), 0.3)',
                backgroundColor: 'rgba(var(--accent-rgb), 0.08)',
              }"
            >
              <span class="animate-bounce">{{ currentJoke.sticker }}</span>

              <!-- Extra mini badge sticker -->
              <span
                class="absolute -top-2 -right-2 text-xl px-2 py-0.5 rounded-full bg-slate-900 text-white border border-white/20 shadow-md"
              >
                ⚡️
              </span>
            </div>
          </div>

          <!-- Joke Title -->
          <h2
            class="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white mb-2"
          >
            {{ currentJoke.title }}
          </h2>

          <!-- Joke Punchline Box -->
          <div
            class="rounded-2xl p-4 sm:p-5 my-4 text-xs sm:text-sm font-medium leading-relaxed text-slate-700 dark:text-slate-300 glass-card border relative transition-all duration-300"
            :style="{ borderColor: 'rgba(var(--accent-rgb), 0.2)' }"
          >
            <p class="italic">"{{ currentJoke.joke }}"</p>
            <div
              class="mt-3 pt-2 border-t border-slate-200/50 dark:border-white/5 flex items-center justify-between text-[10px] uppercase font-bold tracking-wider text-slate-500 dark:text-slate-400"
            >
              <span>Status: {{ currentJoke.subtext }}</span>
              <button
                @click="copyJoke"
                class="hover:text-slate-900 dark:hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span>{{ copied ? 'Copied!' : 'Copy Joke' }}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-3 w-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 012-2v-8a2 2 0 01-2-2h-8a2 2 0 01-2 2v8a2 2 0 012 2z"
                  />
                </svg>
              </button>
            </div>
          </div>

          <!-- Bottom Action Buttons -->
          <div class="flex flex-col sm:flex-row items-center gap-3 mt-6">
            <!-- Shuffle Another Joke Button -->
            <button
              @click="nextJoke"
              class="w-full sm:w-1/2 py-3 px-4 rounded-xl glass-card border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200 text-xs font-bold uppercase tracking-wider hover:bg-slate-100 dark:hover:bg-white/10 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Shuffle Joke</span>
              <span class="text-sm">🎲</span>
            </button>

            <!-- Main Dismiss / Go Home Button -->
            <button
              @click="closeModal"
              class="w-full sm:w-1/2 py-3 px-4 rounded-xl text-slate-950 text-xs font-black uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-95 shadow-lg cursor-pointer flex items-center justify-center gap-2"
              :style="{
                backgroundColor: 'var(--accent-color)',
                boxShadow: '0 0 20px rgba(var(--accent-rgb), 0.4)',
              }"
            >
              <span>I'm Outta Here!</span>
              <span class="text-sm">🚀</span>
            </button>
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'

defineOptions({
  name: 'ShiftEndedModal',
})

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  checkoutTime: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['close'])

const copied = ref(false)
const jokeIndex = ref(0)

const jokesList = [
  {
    title: 'Mission Accomplished! 🏃‍♂️💨',
    joke: 'Log off NOW before management discovers your secret technique of staring intensely at spreadsheets while deciding what to eat for dinner.',
    sticker: '🚪🏃‍♂️',
    subtext: 'Wifi status: Disconnected',
  },
  {
    title: 'Meeting Survivor 🏆📧',
    joke: 'Congrats! You survived another 8 hours of "quick syncs" that could have easily been a 2-word Slack message.',
    sticker: '☕🔥',
    subtext: 'Coffee level: 0% | Freedom: 100%',
  },
  {
    title: 'Danger Zone Ahead! 🚨💼',
    joke: 'Warning: Remaining in the office past checkout increases your risk of hearing "Hey, real quick before you go..." by 400%!',
    sticker: '🏃⚡️',
    subtext: 'Tactical exit sequence initiated',
  },
  {
    title: 'Unplug Protocol Active 💻😴',
    joke: 'Your laptop monitor called a union meeting — it officially refuses to look at your face for another single minute today.',
    sticker: '🖥️💤',
    subtext: 'Screen time quota exceeded',
  },
  {
    title: 'Overtime Illusion 🎮🚫',
    joke: 'Remember: Extra hours at work do NOT earn you extra respawns in real life. Pack your bag and step outside!',
    sticker: '📦🚀',
    subtext: 'Shift completion verified',
  },
  {
    title: 'Pretending Champion 📊🥇',
    joke: 'Give yourself a standing ovation for 8.8 hours of masterclass performance in typing furiously whenever someone walked past your desk.',
    sticker: '⌨️🤡',
    subtext: 'Keyboard noise level: Maximum',
  },
  {
    title: 'Out Of Office Enabled 🏖️✌️',
    joke: '"Out of office" isn\'t just a calendar setting — it\'s a sacred state of mind. Go claim your freedom!',
    sticker: '🍹🌴',
    subtext: 'Work mode deactivated',
  },
  {
    title: 'Escape Velocity Reached 🚀🌌',
    joke: 'Gravity in the office is weak, but the pull towards your couch is infinite. Move before someone asks for a status update!',
    sticker: '🛋️🎉',
    subtext: 'Destination: Home Sweet Home',
  },
  {
    title: 'The Coffee Machine Misses You ☕💨',
    joke: 'You have officially consumed enough office caffeine to power a small rocket engine. Time to go purge the jitters at home.',
    sticker: '🧪⚡️',
    subtext: 'Caffeine intake: Critical',
  },
  {
    title: 'Bravo! You Made It! 🎬✨',
    joke: 'Close the tabs, shut down the laptop, and walk away slowly. No sudden movements or someone might hand you an urgent task.',
    sticker: '🕵️‍♂️💼',
    subtext: 'Stealth exit activated',
  },
]

const currentJoke = ref(jokesList[0])

const floatingEmojis = ref([])

function generateFloatingEmojis() {
  const chars = ['🎉', '🚀', '🥳', '🎈', '💼', '☕', '🏃‍♂️', '✨', '🏆', '🏖️']
  const items = []
  for (let i = 0; i < 15; i++) {
    const randomChar = chars[Math.floor(Math.random() * chars.length)]
    const left = Math.floor(Math.random() * 90) + 5
    const delay = (Math.random() * 3).toFixed(1)
    const duration = (Math.random() * 3 + 3).toFixed(1)
    items.push({
      char: randomChar,
      style: {
        left: `${left}%`,
        bottom: `-10%`,
        animation: `floatUp ${duration}s linear infinite`,
        animationDelay: `${delay}s`,
      },
    })
  }
  floatingEmojis.value = items
}

function getRandomJoke() {
  const nextIdx = Math.floor(Math.random() * jokesList.length)
  jokeIndex.value = nextIdx
  currentJoke.value = jokesList[nextIdx]
}

function nextJoke() {
  copied.value = false
  jokeIndex.value = (jokeIndex.value + 1) % jokesList.length
  currentJoke.value = jokesList[jokeIndex.value]
}

function copyJoke() {
  const textToCopy = `"${currentJoke.value.joke}" - Shift Completed!`
  navigator.clipboard.writeText(textToCopy)
  copied.value = true
  setTimeout(() => {
    copied.value = false
  }, 2000)
}

function closeModal() {
  emit('close')
}

watch(
  () => props.isOpen,
  (newVal) => {
    if (newVal) {
      getRandomJoke()
      generateFloatingEmojis()
    }
  },
)

onMounted(() => {
  getRandomJoke()
})
</script>

<style scoped>
@keyframes floatUp {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 0.8;
  }
  100% {
    transform: translateY(-110vh) rotate(360deg);
    opacity: 0;
  }
}
.animate-float-emoji {
  will-change: transform, opacity;
}
</style>
