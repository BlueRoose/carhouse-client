<template>
  <button class="button" :disabled="disabled">
    <slot></slot>
  </button>
</template>

<script setup>
defineProps({
  disabled: Boolean,
});
</script>

<style lang="scss" scoped>
.button {
  width: fit-content;
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  background-color: $color-yellow;
  color: $color-black;
  font-size: 18px;
  font-weight: 600;
  transition: 0.2s linear;
  cursor: pointer;

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
}
</style>