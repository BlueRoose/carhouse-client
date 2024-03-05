<template>
  <div class="index">
    <Slider />
    <div class="index__about">
      <div class="index__about__info">
        <p class="index__about__info-name">About us</p>
        <p class="index__about__info-title">Carhouse is the best place to get your dream car</p>
        <p class="index__about__info-description">
          Every day our managers and consultants work to provide you with the
          best service and cars.
        </p>
        <Button class="index__about__info-button" @click="handleClickView">View more</Button>
      </div>
      <img
        class="index__about-image"
        src="/images/cars-about.webp"
        alt="office"
      />
    </div>
    <div class="index__brands">
        <h2 class="index__brands-title">Our brands</h2>
        <ul class="index__brands__items">
          <li class="index__brands__items-item">BMW</li>
          <li class="index__brands__items-item">Mercedes</li>
          <li class="index__brands__items-item">Porsche</li>
          <li class="index__brands__items-item">Lamborghini</li>
          <li class="index__brands__items-item">Bugatti</li>
          <li class="index__brands__items-item">Land Rover</li>
          <li class="index__brands__items-item">Ferrari</li>
          <li class="index__brands__items-item">Rolls Royce</li>
        </ul>
      </div>
    <WhyUs />
  </div>
</template>

<script setup>
useHead({
  title: "Carhouse - your autodealer"
});

const router = useRouter();

function handleClickView() {
  router.push("/about");
}
</script>

<style lang="scss" scoped>
.index {
  background-color: $color-white;

  &__about {
    padding: 160px 240px;
    display: grid;
    grid-template-columns: 1fr 1fr;

    &__info {
      display: flex;
      flex-direction: column;
      gap: 30px;

      &-name {
        font-size: 20px;
        font-weight: 700;
        color: $color-dark-gray;
      }

      &-title {
        font-size: 50px;
        font-weight: 700;
      }

      &-description {
        font-size: 18px;
        opacity: 60%;
      }

      &-button {
        max-width: fit-content;
      }
    }

    &-image {
      max-width: 100%;
      box-shadow: 0px 4px 39.79999923706055px 0px #00000040;
    }
  }

  &__brands {
    padding: 100px 240px;
    background-color: #F9F9F9;

    &-title {
      font-size: 50px;
      text-align: center;
      margin-bottom: 90px;
    }

    &__items {
      display: flex;
      justify-content: space-between;
      list-style-type: none;

      &-item {
        font-size: 28px;
        font-weight: 900;
        color: #888888;
      }
    }
  }
}
</style>