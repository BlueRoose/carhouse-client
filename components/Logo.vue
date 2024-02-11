<template>
  <NuxtLink class="logo" to="/">
    <span class="logo-first">C A R </span>
    <span class="logo-last">H O U S E</span>
  </NuxtLink>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.logo {
  font-size: 32px;
  font-weight: 900;

  &-first {
    color: $color-yellow;
  }

  &-last {
    color: $color-white;
  }
}
</style>