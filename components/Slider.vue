<template>
  <Swiper
    :slidesPerView="1"
    :speed="3000"
    :modules="[Autoplay]"
    :autoplay="{ delay: 3000, stopOnLastSlide: false, disabledOnInteraction: false }"
    loop
  >
    <SwiperSlide v-for="item, index in slidesInfo" :key="index">
      <div class="slide">
        <div class="slide__left-side">
          <div class="slide__left-side__info">
            <p class="slide__left-side__info-type">{{ item.type }}</p>
            <p class="slide__left-side__info-name">{{ item.name }}</p>
            <p class="slide__left-side__info-description">{{ item.description }}</p>
          </div>
          <div class="slide__left-side__price">
            <p class="slide__left-side__price-text">Starting from</p>
            <p class="slide__left-side__price-number">
              <span class="sign">$ </span>
              {{ item.price }}
            </p>
          </div>
        </div>
        <img
          class="slide-image"
          :src="item.image"
          alt="car"
        />
      </div>
    </SwiperSlide>
  </Swiper>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay } from "swiper/modules";
import "swiper/swiper-bundle.css";

const slidesInfo = [
  {
    type: "Sport Sedan",
    name: "BMW M5 Competition",
    description: "BMW's latest driving systems are the brains behind the brawn of the 2023 BMW M5 Sedan. Intelligent technology improves your experience on the track and on the road.",
    price: "120.000",
    image: "/images/M5.webp",
  },
  {
    type: "SUV",
    name: "BMW X5M",
    description: "This is what true innovation looks like. Powerful, big and fast sport SUV.",
    price: "300.000",
    image: "/images/x5m.png",
  },
  {
    type: "Supercar",
    name: "Lamborghini Aventador",
    description: "The Lamborghini Aventador is a sports car built by Lamborghini. It replaced the Lamborghini Gallardo.",
    price: "380.000",
    image: "/images/aventador.png",
  }
]
</script>

<style lang="scss" scoped>
.slide {
  height: 600px;
  display: flex;
  background-color: $color-dark;
  padding: 100px 240px;
  position: relative;

  @include mq($until: desktop-xl) {
    height: 550px;
    padding: 90px 180px;
  }

  @include mq($until: desktop-l) {
    height: 500px;
    padding: 75px 120px;
  }

  @include mq($until: desktop) {
    height: 450px;
    padding: 30px 90px;
  }

  @include mq($until: mobile-xxl) {
    height: 400px;
    padding: 30px 50px;
  }

  @include mq($until: mobile-l) {
    height: 350px;
    padding: 30px 24px;
  }

  &__left-side {
    width: 100%;
    border-radius: 28px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    z-index: 1;

    &__info {
      opacity: 100%;
      border-left: 1px solid $color-yellow;
      border-radius: 28px;
      padding: 25px;

      &-type {
        font-size: 16px;
        font-weight: 600;
        color: $color-yellow;
        margin-bottom: 10px;

        @include mq($until: tablet) {
          margin-bottom: 0;
        }
      }

      &-name {
        width: 60%;
        font-size: 70px;
        font-weight: 600;
        color: $color-white;
        margin-bottom: 20px;

        @include mq($until: tablet) {
          font-size: 48px;
          margin-bottom: 10px;
        }

        @include mq($until: mobile-xxl) {
          font-size: 36px;
          margin-bottom: 10px;
        }
      }

      &-description {
        width: 60%;
        color: $color-white;
        line-height: 140%;

        @include mq($until: tablet) {
          font-size: 14px;
        }

        @include mq($until: mobile-xxl) {
          width: 100%;
        }
      }
    }

    &__price {
      &-text {
        font-size: 12px;
        color: $color-white;
        margin-bottom: 10px;
      }

      &-number {
        font-size: 36px;
        font-weight: 700;
        line-height: 36px;
        color: $color-white;

        @include mq($until: tablet) {
          font-size: 30px;
          margin-bottom: 10px;
        }

        @include mq($until: mobile-xxl) {
          font-size: 24px;
          margin-bottom: 10px;
        }
      }
    }
  }

  &-image {
    width: 60%;
    position: absolute;
    right: 240px;
    top: 50%;
    transform: translateY(-50%);
    opacity: 50%;

    @include mq($until: desktop-xl) {
      right: 180px;
    }

    @include mq($until: desktop-l) {
      right: 120px;
    }

    @include mq($until: desktop) {
      right: 90px;
    }

    @include mq($until: tablet) {
      width: 70%;
    }

    @include mq($until: mobile-xxl) {
      right: 50px;
    }

    @include mq($until: mobile-l) {
      right: 24px;
    }
  }
}

.swiper-slide {
  width: 100% !important;
}

.sign {
  font-size: 20px;
  vertical-align: text-top;
}
</style>