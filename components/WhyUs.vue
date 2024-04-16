<template>
  <div class="why-us">
    <p class="why-us-small">C A R H O U S E</p>
    <h2 class="why-us-title">Why choose us</h2>
    <div class="why-us__cards">
      <div class="why-us__cards__card">
        <img
          class="why-us__cards__card-image"
          src="/icons/money.svg"
          alt="price"
        />
        <p class="why-us__cards__card-title">The best price that you really expect</p>
        <p class="why-us__cards__card-description">
          Our cars are cheaper than in other car dealerships
        </p>
      </div>
      <div class="why-us__cards__card">
        <img
          class="why-us__cards__card-image"
          src="/icons/headphones.svg"
          alt="support"
        />
        <p class="why-us__cards__card-title">Support is ready 24/7 to serve you</p>
        <p class="why-us__cards__card-description">
          Our managers are ready to answer your questions at any time of the day.
        </p>
      </div>
      <div class="why-us__cards__card">
        <img
          class="why-us__cards__card-image"
          src="/icons/star.svg"
          alt="brand"
        />
        <p class="why-us__cards__card-title">A brand that is recognized worldwide</p>
        <p class="why-us__cards__card-description">
          Our reputation based on our customer reviews makes us the most
          popular car dealership
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.why-us {
  max-width: 1440px;
  margin: 0 auto;
  padding: 65px 0;

  @include mq($until: desktop-xl) {
    padding: 65px 180px;
  }

  @include mq($until: desktop-l) {
    padding: 65px 120px;
  }

  @include mq($until: desktop) {
    padding: 65px 90px;
  }

  @include mq($until: mobile-xxl) {
    padding: 45px 50px;
  }

  @include mq($until: mobile-l) {
    padding: 45px 24px;
  }

  &-small {
    text-align: center;
    color: $color-yellow;
    font-size: 20px;
    font-weight: 600;

    @include mq($until: desktop) {
      font-size: 16px;
    }
  }

  &-title {
    color: black;
    font-size: 50px;
    text-align: center;
    margin-bottom: 56px;

    @include mq($until: desktop) {
      font-size: 32px;
      margin-bottom: 28px;
    }
  }

  &__cards {
    max-width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 22px;

    @include mq($until: tablet) {
      display: flex;
      flex-direction: column;
    }

    &__card {
      padding: 60px;
      box-shadow: 0px 4px 39.79999923706055px 0px #00000040;
      cursor: pointer;
      transition: all 0.5s;
      box-sizing: border-box;

      @include mq($until: desktop-xl) {
        padding: 45px;
      }

      @include mq($until: desktop-l) {
        padding: 30px;
      }

      @include mq($until: desktop) {
        padding: 20px;
      }

      @include mq($from: tablet) {
        &:hover {
          transform: scale(1.2);
          z-index: 999;
        }
      }

      &-image {
        max-width: 64px;
        margin-bottom: 45px;
      }

      &-title {
        color: $color-black;
        font-size: 28px;
        line-height: 28px;
        font-weight: 700;
        margin-bottom: 30px;
      }

      &-description {
        color: $color-black;
        opacity: 50%;
        line-height: 28px;
      }
    }
  }
}
</style>