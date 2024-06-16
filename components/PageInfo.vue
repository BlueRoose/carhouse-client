<template>
  <div class="bg-main-dark">
    <div class="text-white text-center pt-24 pb-44 max-lg:pt-20 max-lg:pb-32 max-md:pt-10 max-md:pb-16 container mx-auto px-4">
      <p v-if="subtitle" class="text-main-yellow text-3xl max-md:text-base uppercase pb-4 max-md:pb-1">{{ subtitle }}</p>
      <h1 class="text-5xl max-md:text-3xl mb-7 max-md:mb-3">{{ title }}</h1>
      <p class="opacity-75 max-md:text-sm">{{ description }}</p>
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
