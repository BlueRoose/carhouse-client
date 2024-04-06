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

  &__left-side {
    max-width: 800px;
    padding: 15px;
    border-radius: 28px;
    display: flex;
    flex-direction: column;
    gap: 55px;

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
      }

      &-name {
        font-size: 70px;
        font-weight: 600;
        color: $color-white;
        margin-bottom: 20px;
      }

      &-description {
        color: $color-white;
        line-height: 28px;
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
      }
    }
  }

  &-image {
    width: auto;
    right: 240px;
    margin-left: auto;
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