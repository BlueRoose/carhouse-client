<template>
  <div class="bg-white">
    <Slider class="max-sm:!hidden" />
    <div class="py-40 max-lg:py-24 max-md:py-16 grid grid-cols-2 max-md:flex flex-col max-md:gap-8 container mx-auto px-4">
      <div class="flex flex-col gap-8 max-lg:gap-4 max-md:gap-2 pr-12 max-md:pr-0">
        <p class="text-5xl font-semibold max-lg:text-4xl max-md:text-3xl">Carhouse is the best place to get your dream car</p>
        <p class="max-w-[450px] text-lg max-lg:text-base opacity-60">
          Every day our managers and consultants work to provide you with the
          best service and cars.
        </p>
        <Button class="max-w-fit" @click="handleClickView">View more</Button>
      </div>
      <img
        class="max-w-full shadow-[0_4px_39.79999923706055px_0_#00000040] rounded-xl"
        src="/images/cars-about.webp"
        alt="office"
      />
    </div>
    <div class="bg-[#F9F9F9]">
      <div class="py-24 container mx-auto px-4 max-md:py-16">
        <h2 class="text-5xl text-center mb-20 font-semibold max-md:text-4xl max-xl:mb-16 max-md:mb-10">Our brands</h2>
        <ul class="flex flex-wrap justify-center gap-4 list-none">
          <li
            v-for="(car, index) in cars"
            :key="index"
            class="text-2xl font-black text-[#888888]"
          >
            {{ car }}
          </li>
        </ul>
      </div>
    </div>
    <WhyUs isTitle />
  </div>
</template>

<script setup>
import {Swiper} from "swiper/vue";

useHead({
  title: "Carhouse - your autodealer",
});

const cars = ["BMW", "Mercedes", "Porsche", "Lamborghini", "Bugatti", "Land Rover", "Ferrari", "Rolls Royce"];

const router = useRouter();

function handleClickView() {
  router.push("/about");
}
</script>
