<template>
  <div
    class="glass-card rounded-3xl p-6 relative overflow-hidden transition-all duration-300 hover:shadow-2xl"
    :class="customClass"
  >
    <!-- Header Slot -->
    <div v-if="$slots.header || title" class="mb-4">
      <h2 v-if="title" class="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
        {{ title }}
      </h2>
      <slot name="header" />
    </div>

    <!-- Body Slot -->
    <div class="mb-4">
      <slot />
    </div>

    <!-- Footer Slot -->
    <div v-if="$slots.footer" class="pt-4 border-t border-slate-200/60 dark:border-white/10">
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
