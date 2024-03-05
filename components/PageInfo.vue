<template>
  <div class="page-info">
    <p v-if="subtitle" class="page-info-subtitle">{{ subtitle }}</p>
    <h1 class="page-info-title">{{ title }}</h1>
    <p class="page-info-description">{{ description }}</p>
  </div>
</template>

<script setup>
defineProps({
  subtitle: String,
  title: String,
  description: String
});
</script>

<style lang="scss" scoped>
.page-info {
  background-color: $color-dark;
  color: $color-white;
  text-align: center;
  padding-top: 90px;
  padding-bottom: 178px;

  &-subtitle {
    font-size: 28px;
    color: $color-yellow;
    text-transform: uppercase;
    margin-bottom: 18px;
  }

  &-title {
    font-size: 50px;
    line-height: 65px;
    margin-bottom: 27px;
  }

  &-description {
    font-size: 16px;
    line-height: 28px;
    opacity: 77%;
  }
}
</style>