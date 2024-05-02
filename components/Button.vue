<template>
  <button class="button" :disabled="disabled">
    <span v-if="isLoading" class="loader"></span>
    <slot v-else></slot>
  </button>
</template>

<script setup>
defineProps({
  disabled: Boolean,
  isLoading: Boolean,
});
</script>

<style lang="scss" scoped>
.button {
  width: fit-content;
  min-width: 95px;
  min-height: 45px;
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  background-color: $color-yellow;
  color: $color-black;
  font-size: 18px;
  font-weight: 600;
  transition: 0.2s linear;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  @include mq($until: desktop-l) {
    font-size: 16px;
  }

  &:not(:disabled):hover {
    border-radius: 15px;
  }

  &:disabled {
    background-color: #f1f1f1;
    cursor: not-allowed;
  }

  .loader {
    width: 18px;
    height: 18px;
    border: 3px solid $color-black;
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
}
</style>