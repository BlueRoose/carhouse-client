<template>
  <Swiper
    :slidesPerView="1"
    :speed="3000"
    :modules="[Autoplay]"
    :autoplay="{ delay: 3000, stopOnLastSlide: false, disabledOnInteraction: false }"
    loop
  >
    <SwiperSlide v-for="(item, index) in slidesInfo" :key="index">
      <div class="h-[600px] flex bg-main-dark py-20 max-lg:py-16 max-md:py-10">
        <div class="relative container mx-auto">
          <div class="w-full rounded-3xl flex flex-col justify-center relative z-[1]">
            <div class="opacity-100 border-l border-main-yellow rounded-3xl p-6 mb-10">
              <p class="text-main-yellow font-semibold mb-2.5">{{ item.type }}</p>
              <p class="w-[60%] text-white text-7xl font-semibold pb-5">{{ item.name }}</p>
              <p class="w-[60%] text-white">{{ item.description }}</p>
            </div>
            <div class="text-white">
              <p class="text-xs mb-2.5">Starting from</p>
              <p class="text-4xl font-bold">
                <span class="text-xl">$ </span>
                {{ item.price }}
              </p>
            </div>
          </div>
          <img
              class="w-[70%] max-lg:w-full absolute right-0 top-1/2 -translate-y-1/2 opacity-50"
              :src="item.image"
              alt="car"
          />
        </div>
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
