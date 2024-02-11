<template>
  <button class="button">
    <slot></slot>
  </button>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.button {
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  background-color: $color-yellow;
  color: $color-black;
  font-size: 18px;
  font-weight: 600;
  transition: 0.2s linear;
  cursor: pointer;

  &:hover {
    border-radius: 15px;
  }
}
</style>