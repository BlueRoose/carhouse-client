<template>
  <div
    class="w-full bg-[#f1f1f1] py-4 px-2.5 shadow-[0_4px_39.79999923706055px_0_#00000040] rounded-3xl flex gap-4 relative cursor-pointer border-[5px] border-transparent"
    :class="{ '!border-main-yellow': selected }"
  >
    <div class="flex flex-col text-2xl font-semibold">
      <p>
        <span class="text-main-yellow">Client:
        </span> {{ request.name }}
        <span class="text-main-yellow"> Email: </span>
        (<a :href="`mailto:${request.email}`">{{ request.email }}</a>)
      </p>
      <p class="mb-6"><span class="text-main-yellow">Subject:</span> {{ request.subject }}</p>
      <p class="mb-6"><span class="text-main-yellow">Message:</span> {{ request.text }}</p>
    </div>
    <div v-if="request.isResolved" class="w-full h-full bg-black rounded-3xl absolute top-0 left-0 opacity-70" />
    <p v-if="request.isResolved" class="text-4xl font-bold text-main-yellow z-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">RESOLVED</p>
  </div>
</template>

<script setup>
defineProps({
  request: {
    type: Object,
    default() {
      return {};
    },
  },
  selected: Boolean,
});
</script>
