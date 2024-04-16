<template>
  <img
    class="loader"
    src="/images/wheel.png"
    alt="wheel-loader"
  />
</template>

<script setup>
</script>

<style lang="scss" scoped>
.loader {
  color: $color-yellow;
  font-size: 200px;
  text-indent: -9999em;
  overflow: hidden;
  width: 1em;
  height: 1em;
  display: block;
  margin: 150px auto 50px;
  border-radius: 50%;
  animation: round 1.7s infinite linear;
}

@keyframes round {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>