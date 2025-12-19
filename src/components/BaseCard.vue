<template>
  <div
    class="bg-black/40 backdrop-blur-2xl shadow-2xl rounded-3xl p-6 border border-white/5 border-t-white/20 max-w-full text-gray-100 relative overflow-hidden"
    :class="customClass"
  >
    <!-- Header Slot -->
    <div v-if="$slots.header || title" class="mb-4">
      <h2 v-if="title" class="text-2xl font-bold text-white tracking-wide">
        {{ title }}
      </h2>
      <slot name="header" />
    </div>

    <!-- Body Slot -->
    <div class="mb-4">
      <slot />
    </div>

    <!-- Footer Slot -->
    <div v-if="$slots.footer" class="pt-4 border-t border-white/5">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup>
defineOptions({
  name: 'BaseCard',
})

// Props can be defined using defineProps
defineProps({
  title: {
    type: String,
    default: '',
  },
  customClass: {
    type: String,
    default: '',
  },
})
</script>
