<template>
  <div class="index">
    <Slider class="index-slider" />
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

  &-slider {
    @include mq($until: mobile-xxl) {
      display: none;
    }
  }

  &__about {
    padding: 160px 240px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);

    @include mq($until: desktop-xl) {
      padding: 120px 180px;
    }

    @include mq($until: desktop-l) {
      padding: 80px 120px;
    }

    @include mq($until: desktop) {
      padding: 80px 90px;
    }

    @include mq($until: mobile-xxl) {
      padding: 40px 50px;
    }

    @include mq($until: mobile-l) {
      padding: 40px 24px;
    }

    @include mq($until: tablet) {
      display: flex;
      gap: 20px;
      flex-direction: column;
    }

    &__info {
      display: flex;
      flex-direction: column;
      gap: 30px;
      padding-right: 50px;

      @include mq($until: desktop) {
        gap: 15px;
        padding-right: 40px;
      }

      @include mq($until: mobile-xxl) {
        gap: 5px;
      }

      &-name {
        font-size: 20px;
        font-weight: 700;
        color: $color-dark-gray;

        @include mq($until: desktop) {
          font-size: 18px;
        }

        @include mq($until: mobile-xxl) {
          font-size: 16px;
        }
      }

      &-title {
        font-size: 50px;
        font-weight: 700;

        @include mq($until: desktop) {
          font-size: 32px;
        }

        @include mq($until: mobile-xxl) {
          font-size: 24px;
        }
      }

      &-description {
        font-size: 18px;
        opacity: 60%;

        @include mq($until: desktop) {
          font-size: 16px;
        }
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

    @include mq($until: desktop-xl) {
      padding: 80px 180px;
    }

    @include mq($until: desktop-l) {
      padding: 60px 120px;
    }

    @include mq($until: desktop) {
      padding: 50px 90px;
    }

    @include mq($until: mobile-xxl) {
      padding: 40px 50px;
    }

    @include mq($until: mobile-l) {
      padding: 40px 24px;
    }

    &-title {
      font-size: 50px;
      text-align: center;
      margin-bottom: 90px;

      @include mq($until: desktop) {
        font-size: 32px;
        margin-bottom: 30px;
      }
    }

    &__items {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      list-style-type: none;

      @include mq($until: desktop) {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-row-gap: 10px;
      }

      @include mq($until: mobile-xxl) {
        justify-content: center;
        grid-template-columns: repeat(2, 1fr);
      }

      &-item {
        font-size: 28px;
        font-weight: 900;
        color: #888888;

        @include mq($until: desktop-l) {
          font-size: 24px;
        }

        @include mq($until: desktop) {
          font-size: 22px;
          text-align: center;
        }

        @include mq($until: mobile-xl) {
         font-size: 18px;
        }
      }
    }
  }
}
</style>