<template>
  <div class="info-item">
    <p class="info-item-title">{{ title }}</p>
    <p class="info-item-value">{{ value }}</p>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  value: String | Number,
});
</script>

<style lang="scss" scoped>
.info-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;

  &-title {
    color: $color-black;
    opacity: 40%;
  }

  &-value {
    font-size: 20px;
    font-weight: 600;
  }
}
</style>