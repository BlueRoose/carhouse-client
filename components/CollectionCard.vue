<template>
  <div class="collection-card">
    <img class="collection-card-image" :src="img" :alt="name" />
    <div class="collection-card__info">
      <p class="collection-card__info-title">{{ brand + ' ' + name }}</p>
      <div class="collection-card__info__items">
        <CardInfoItem title="Type" :value="type" />
        <CardInfoItem title="Transmission" :value="transmission" />
        <CardInfoItem title="Passenger" :value="`${passenger} Person`" />
        <CardInfoItem title="Top Speed" :value="topSpeed" />
        <CardInfoItem title="Horse Power" :value="horsePower" />
        <CardInfoItem title="0-100 km/h" :value="time" />
      </div>
    </div>
    <Button class="collection-card-button">$ 550.000</Button>
  </div>
</template>

<script setup>
defineProps({
  brand: String,
  name: String,
  type: String,
  transmission: String,
  passenger: Number,
  topSpeed: Number,
  horsePower: Number,
  time: Number,
  img: String
})
</script>

<style lang="scss" scoped>
.collection-card {
  width: 100%;
  height: 698px;
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
    padding: 70px 0 0 46px;

    &-title {
      font-size: 30px;
      line-height: 32px;
      font-weight: 600;
      margin-bottom: 55px;
    }

    &__items {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-column-gap: 15px;
      grid-row-gap: 35px;
    }
  }

  &-button {
    font-size: 24px;
    font-weight: 600;
    padding: 20px 30px;
    position: absolute;
    top: 50%;
    right: 12px;
    transform: translateY(-50%);
    cursor: pointer;
  }
}
</style>