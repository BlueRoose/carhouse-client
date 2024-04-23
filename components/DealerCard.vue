<template>
  <div class="dealer-card">
    <div class="dealer-card__info">
      <div>
        <p class="dealer-card__info-city">{{ location.city }}</p>
        <p class="dealer-card__info-country">{{ location.country }}</p>
      </div>
      <p class="dealer-card__info-street">{{ location.address }}</p>
    </div>
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
  box-sizing: border-box;
  background-color: $color-yellow;

  &__info {
    display: grid;
    grid-template-rows: repeat(2, 1fr);
    gap: 20px;
    margin-bottom: 30px;

    &-city {
      font-size: 38px;
      font-weight: 600;
    }

    &-country {
      font-size: 24px;
      font-weight: 300;
      text-transform: uppercase;
    }

    &-street {
      font-size: 20px;
      font-weight: 500;
    }
  }

  &-phone {
    max-height: 100px;
    padding: 20px 44px;
    background-color: $color-white;
    font-weight: 600;
    color: $color-black;
  }
}
</style>