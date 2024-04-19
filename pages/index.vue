<template>
  <div class="index">
    <Slider class="index-slider" />
    <div class="index__about container">
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
    <div class="brands-wrapper">
      <div class="index__brands container">
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
    padding-top: 160px;
    padding-bottom: 160px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);

    @include mq($until: desktop-xl) {
      padding-top: 120px;
      padding-bottom: 120px;
    }

    @include mq($until: desktop-l) {
      padding-top: 80px;
      padding-bottom: 80px;
    }

    @include mq($until: mobile-xxl) {
      padding-top: 40px;
      padding-bottom: 40px;
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

  .brands-wrapper {
    background-color: #F9F9F9;
  }

  &__brands {
    padding-top: 100px;
    padding-bottom: 100px;

    @include mq($until: desktop-xl) {
      padding-top: 80px;
      padding-bottom: 80px;
    }

    @include mq($until: desktop-l) {
      padding-top: 60px;
      padding-bottom: 60px;
    }

    @include mq($until: desktop) {
      padding-top: 50px;
      padding-bottom: 50px;
    }

    @include mq($until: mobile-xxl) {
      padding-top: 40px;
      padding-bottom: 40px;
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