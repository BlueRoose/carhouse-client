<template>
  <div class="collection-card">
    <img class="collection-card-image" src="/images/cars-about.webp" alt="car" />
    <div class="collection-card__info">
      <p class="collection-card__info-title">BMW M8</p>
      <div class="collection-card__info__items">
        <CardInfoItem title="Type" value="Coupe" />
        <CardInfoItem title="Transmition" value="Automatic" />
        <CardInfoItem title="Passenger" value="2 Person" />
        <CardInfoItem title="Top Speed" value="412" />
        <CardInfoItem title="Horse Power" value="560" />
        <CardInfoItem title="0-100 km/h" value="3.3" />
      </div>
    </div>
    <Button class="collection-card-button">$ 550.000</Button>
  </div>
</template>

<script setup>
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