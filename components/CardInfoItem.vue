<template>
  <div class="flex flex-col items-start gap-3">
    <p class="text-black opacity-40">{{ title }}</p>
    <p class="text-xl font-semibold">{{ value }}</p>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  value: String | Number,
});
</script>
