<script setup>
import { onMounted, ref } from 'vue'
import { RouterView } from 'vue-router'
import { requestNotificationPermission } from '@/composables/notification'
// Request permission when the component mounts
onMounted(() => {
  requestNotificationPermission()
})
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
