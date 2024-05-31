<template>
  <div class="collection-card">
    <NuxtLink :to="`/car/${car.id}`">
      <img class="collection-card-image" :src="car.imgs[0]" :alt="car.name" />
    </NuxtLink>
    <div class="collection-card__info">
      <p class="collection-card__info-title">{{ car.brand + ' ' + car.name }}</p>
      <div class="collection-card__info__items">
        <CardInfoItem title="Type" :value="car.type" />
        <CardInfoItem title="Transmission" :value="car.transmission" />
        <CardInfoItem title="Passenger" :value="`${car.passenger} Person`" />
        <CardInfoItem title="Top Speed" :value="car.topSpeed" />
        <CardInfoItem title="Horse Power" :value="car.horsePower" />
        <CardInfoItem title="0-100 km/h" :value="car.time" />
      </div>
    </div>
    <NuxtLink :to="`/car/${car.id}`">
      <Button class="collection-card-button">$ {{ car.price }}</Button>
    </NuxtLink>
  </div>
</template>

<script setup>
defineProps({
  car: Object,
  default() {
    return {};
  }
})
</script>

<style lang="scss" scoped>
.collection-card {
  width: 100%;
  position: relative;
  background-color: #FBFBFB;
  border-radius: 25px;
  box-shadow: 0px 4px 39.79999923706055px 0px #00000040;

  &-image {
    width: 100%;
    height: 50%;
    object-fit: cover;
    border-radius: 25px 25px 0 0;
    cursor: pointer;
  }

  &__info {
    padding: 35px;

    &-title {
      font-size: 30px;
      line-height: 32px;
      font-weight: 600;
      margin-bottom: 35px;
    }

    &__items {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-column-gap: 15px;
      grid-row-gap: 15px;
    }
  }

  &-button {
    font-size: 24px;
    font-weight: 600;
    padding: 15px 20px;
    position: absolute;
    top: 50%;
    right: 12px;
    transform: translateY(-50%);
    cursor: pointer;
  }
}
</style>