<template>
  <button class="w-fit min-w-[95px] min-h-[45px] py-2.5 px-5 border-none rounded-lg bg-main-yellow text-black text-lg font-semibold transition-all ease-linear cursor-pointer flex justify-center items-center [&:not(:disabled)]:hover:rounded-2xl disabled:bg-[#f1f1f1] disabled:cursor-not-allowed" :disabled="disabled">
    <span v-if="isLoading" class="loader"></span>
    <slot v-else></slot>
  </button>
</template>

<script setup>
defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="scss" scoped>
.loader {
  width: 18px;
  height: 18px;
  border: 3px solid #000;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>