<template>
  <div class="max-w-[364px] py-14 px-10 bg-main-yellow">
    <div class="grid grid-rows-2 gap-5 mb-4">
      <div>
        <p class="text-4xl font-semibold">{{ location.city }}</p>
        <p class="text-2xl font-light uppercase">{{ location.country }}</p>
      </div>
      <p class="text-xl font-medium">{{ location.address }}</p>
    </div>
    <a class="w-fit max-h-[100px] block mx-auto py-2 px-6 bg-white text-black font-semibold" :href="`tel:${location.phone}`">{{ location.phone }}</a>
  </div>
</template>

<script setup>
defineProps({
  location: {
    type: Object,
    default() {
      return {};
    },
  },
});
</script>
