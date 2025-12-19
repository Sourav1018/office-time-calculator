<template>
  <div class="min-h-screen flex flex-col items-center justify-center relative overflow-hidden transition-colors duration-500 font-sans bg-gray-50 dark:bg-black selection:bg-lime-400 selection:text-black">
    
    <!-- Background Grid -->
    <div class="absolute inset-0 z-0 pointer-events-none opacity-20 text-lime-900/10 dark:text-white/10"
         style="background-image: linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px); background-size: 50px 50px;">
    </div>

    <!-- Ambient Glows (Subtler in Light Mode) -->
    <div class="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-lime-500/20 dark:bg-lime-400/5 rounded-full blur-[120px] pointer-events-none animate-pulse-slow"></div>
    <div class="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-purple-500/20 dark:bg-purple-500/5 rounded-full blur-[100px] pointer-events-none"></div>

    <!-- Login Card -->
    <div class="relative z-10 w-full max-w-md px-6">
      
      <!-- Logo / Title -->
      <div class="text-center mb-10">
        <h1 class="text-4xl md:text-5xl font-bold mb-2 tracking-tight text-gray-900 dark:text-white transition-colors">Focus Timer</h1>
        <p class="text-lime-600 dark:text-lime-400 uppercase tracking-[0.3em] text-xs font-bold">Access Terminal</p>
      </div>

      <div class="backdrop-blur-xl rounded-3xl p-8 shadow-2xl relative overflow-hidden transition-all duration-300 border bg-white/70 border-white/40 dark:bg-white/5 dark:border-white/10 dark:shadow-[0_0_50px_rgba(0,0,0,0.5)]">
        
        <!-- Top Neon Line -->
        <div class="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-lime-500 dark:via-lime-400 to-transparent opacity-50"></div>

        <!-- Toggle Switch -->
        <div class="flex p-1 rounded-full mb-8 relative bg-gray-100 dark:bg-black/40">
           <!-- Sliding Pill -->
           <div class="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white shadow-sm transition-all duration-300 ease-out border border-gray-100 dark:border-none dark:bg-lime-400"
                :class="isLogin ? 'left-1' : 'left-[calc(50%)]'"></div>
           
           <button @click="isLogin = true" class="flex-1 relative z-10 py-2 text-xs font-bold uppercase tracking-widest transition-colors duration-300" 
             :class="isLogin ? 'text-lime-600 dark:text-black' : 'text-gray-400 dark:text-gray-500 hover:text-lime-600 dark:hover:text-white'">
             Sign In
           </button>
           <button @click="isLogin = false" class="flex-1 relative z-10 py-2 text-xs font-bold uppercase tracking-widest transition-colors duration-300" 
             :class="!isLogin ? 'text-lime-600 dark:text-black' : 'text-gray-400 dark:text-gray-500 hover:text-lime-600 dark:hover:text-white'">
             Sign Up
           </button>
        </div>

        <!-- Form Fields -->
        <div class="space-y-6">
           <div class="group">
              <label class="block text-[10px] uppercase font-bold tracking-widest mb-2 transition-colors text-gray-500 group-focus-within:text-lime-600 dark:text-gray-500 dark:group-focus-within:text-lime-400">Email Access</label>
              <input type="email" placeholder="agent@timekeeper.ios" 
                class="w-full rounded-xl px-4 py-3 outline-none transition-all text-sm font-mono border 
                       text-gray-900 bg-gray-50 border-gray-200 focus:border-lime-500 focus:bg-white placeholder-gray-400
                       dark:text-white dark:bg-black/30 dark:border-white/10 dark:focus:border-lime-400/50 dark:focus:bg-lime-400/5 dark:placeholder-gray-700"
              />
           </div>

           <div class="group">
              <label class="block text-[10px] uppercase font-bold tracking-widest mb-2 transition-colors text-gray-500 group-focus-within:text-lime-600 dark:text-gray-500 dark:group-focus-within:text-lime-400">Passcode</label>
              <input type="password" placeholder="••••••••••••" 
                class="w-full rounded-xl px-4 py-3 outline-none transition-all text-sm font-mono border 
                       text-gray-900 bg-gray-50 border-gray-200 focus:border-lime-500 focus:bg-white placeholder-gray-400
                       dark:text-white dark:bg-black/30 dark:border-white/10 dark:focus:border-lime-400/50 dark:focus:bg-lime-400/5 dark:placeholder-gray-700" 
              />
           </div>

           <!-- Sign Up Extra Field -->
           <div v-if="!isLogin" class="group animate-fade-in-down">
              <label class="block text-[10px] uppercase font-bold tracking-widest mb-2 transition-colors text-gray-500 group-focus-within:text-lime-600 dark:text-gray-500 dark:group-focus-within:text-lime-400">Confirm Passcode</label>
              <input type="password" placeholder="••••••••••••" 
                class="w-full rounded-xl px-4 py-3 outline-none transition-all text-sm font-mono border 
                       text-gray-900 bg-gray-50 border-gray-200 focus:border-lime-500 focus:bg-white placeholder-gray-400
                       dark:text-white dark:bg-black/30 dark:border-white/10 dark:focus:border-lime-400/50 dark:focus:bg-lime-400/5 dark:placeholder-gray-700" 
              />
           </div>

           <!-- Remember Me (Sign In Only) -->
           <div v-if="isLogin" class="flex items-center gap-2 animate-fade-in-down">
              <label class="flex items-center gap-2 cursor-pointer group">
                  <div class="relative">
                      <input type="checkbox" v-model="rememberMe" class="peer sr-only" />
                      <div class="w-4 h-4 rounded border transition-all
                                  border-gray-300 bg-gray-50 peer-checked:bg-lime-500 peer-checked:border-lime-500
                                  dark:border-white/20 dark:bg-black/40 dark:peer-checked:bg-lime-400 dark:peer-checked:border-lime-400">
                      </div>
                      <svg class="absolute w-2.5 h-2.5 top-[3px] left-[3px] text-white dark:text-black opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                  </div>
                  <span class="text-[10px] font-bold uppercase tracking-widest text-gray-500 group-hover:text-lime-600 dark:group-hover:text-lime-400 transition-colors">Remember Me</span>
              </label>
           </div>
        </div>

        <!-- Action Button -->
        <button 
          @click="handleAuth"
          class="w-full mt-8 group relative flex items-center justify-center py-4 bg-lime-400 hover:bg-lime-300 active:scale-[0.98] rounded-xl transition-all duration-300 overflow-hidden shadow-lg shadow-lime-400/20"
        >
           <span class="absolute inset-0 w-full h-full bg-gradient-to-b from-transparent to-black/10 opacity-0 group-hover:opacity-100 transition-opacity"></span>
           <span class="relative font-bold text-black uppercase tracking-[0.2em] text-sm flex items-center gap-2">
             {{ isLogin ? 'Authenticate' : 'Initialize ID' }}
             <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
             </svg>
           </span>
        </button>

      </div>
      
      <!-- Footer -->
      <div class="text-center mt-8">
        <p class="text-[10px] uppercase tracking-widest text-gray-400 dark:text-white/20">Secure Connection • v2.0</p>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isLogin = ref(true)
const rememberMe = ref(false)

function handleAuth() {
  // Mock Auth - Redirect to app
  // In a real app, this would validate credentials first
  router.push('/app')
}
</script>

<style scoped>
.animate-fade-in-down {
  animation: fadeInDown 0.3s ease-out forwards;
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-pulse-slow {
  animation: pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
