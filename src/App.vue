<script setup>
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { requestNotificationPermission } from '@/composables/notification'

onMounted(() => {
  requestNotificationPermission()
})
</script>

<template>
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
</template>

<style scoped>
/* Removed colorful blob animations for a static, elegant look */
</style>
