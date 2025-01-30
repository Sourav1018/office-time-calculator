<template>
  <div
    class="bg-white shadow-md rounded-2xl p-4 border border-gray-200 max-w-full"
    :class="customClass"
  >
    <!-- Header Slot -->
    <div v-if="$slots.header || title" class="mb-3">
      <h2 v-if="title" class="text-xl font-semibold text-gray-800">
        {{ title }}
      </h2>
      <slot name="header" />
    </div>

    <!-- Body Slot -->
    <div class="mb-4">
      <slot />
    </div>

    <!-- Footer Slot -->
    <div v-if="$slots.footer" class="pt-3 border-t border-gray-200">
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
