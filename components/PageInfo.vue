<template>
  <div class="bg-main-dark">
    <div class="text-white text-center py-20 max-md:py-10 container mx-auto px-4">
      <p v-if="subtitle" class="text-main-yellow text-lg max-md:text-base uppercase">{{ subtitle }}</p>
      <h1 class="text-5xl max-md:text-3xl mb-7 max-md:mb-3">{{ title }}</h1>
      <p class="max-w-[75%] max-md:max-w-full mx-auto opacity-75 max-md:text-sm">{{ description }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  subtitle: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});
</script>
