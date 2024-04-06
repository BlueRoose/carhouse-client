<template>
  <div class="dealer-card">
    <p class="dealer-card-city">{{ location.city }}</p>
    <p class="dealer-card-country">{{ location.country }}</p>
    <p class="dealer-card-street">{{ location.address }}</p>
    <a class="dealer-card-phone" :href="`tel:${location.phone}`">{{ location.phone }}</a>
  </div>
</template>

<script setup>
defineProps({
  location: {
    type: Object,
    default() {
      return {};
    }
  }
});
</script>

<style lang="scss" scoped>
.dealer-card {
  max-width: 364px;
  padding: 75px 54px;
  background-color: $color-yellow;

  &-city {
    font-size: 38px;
    font-weight: 600;
  }

  &-country {
    font-size: 24px;
    font-weight: 300;
    margin-bottom: 30px;
    text-transform: uppercase;
  }

  &-street {
    max-width: 190px;
    font-size: 20px;
    font-weight: 500;
    margin-bottom: 65px;
  }

  &-phone {
    padding: 20px 44px;
    background-color: $color-white;
    font-weight: 600;
    color: $color-black;
  }
}
</style>