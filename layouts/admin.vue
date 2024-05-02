<template>
  <div class="admin-layout">
    <AdminHeader />
    <slot />
  </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.admin-layout {
  height: 100vh;
  background-color: $color-dark;
  display: flex;
  flex-direction: column;
}
</style>