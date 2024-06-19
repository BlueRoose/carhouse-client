<template>
  <div>
    <PageInfo
      subtitle="About us"
      title="About us"
      description="Welcome to CarHouse – the premier platform designed exclusively for auto dealers specializing in premium and luxury cars. Our mission is to bridge the gap between discerning buyers and the world’s finest automotive dealerships, ensuring a seamless, personalized, and high-end experience for both parties."
    />
    <div class="py-40 max-lg:py-24 max-md:py-16 grid grid-cols-2 max-md:flex flex-col max-md:gap-8 container mx-auto px-4">
      <img
        class="max-w-full shadow-[0_4px_39.79999923706055px_0_#00000040] rounded-xl"
        src="/images/product.webp"
        alt="about-us"
      />
      <div class="flex flex-col gap-8 max-lg:gap-4 max-md:gap-2 pl-12 max-md:pl-0">
        <p class="text-main-dark-gray text-xl font-bold max-lg:text-lg">About us</p>
        <p class="text-5xl font-semibold max-lg:text-4xl max-md:text-3xl">We provide the best product for you</p>
        <p class="max-w-[450px] text-lg max-lg:text-base opacity-60">
          We provide only best cars with best price. 10 years on the cars market. Our reputation speaks for itself
        </p>
      </div>
    </div>
    <WhyUs />
    <div class="bg-[#f9f9f9] text-center py-16 container mx-auto px-4">
      <h2 class="text-black text-5xl text-center mb-20 font-semibold max-md:text-4xl max-md:mb-10">Get your favourite car with us</h2>
      <iframe
        class="max-w-[850px] max-md:max-w-full w-full h-[415px] max-md:h-[343px] max-sm:h-[253px] max-s:h-[245px] bg-[#f9f9f9] mx-auto rounded-2xl shadow-[0_4px_39.79999923706055px_0_#00000040]"
        width="560"
        height="315"
        src="https://www.youtube-nocookie.com/embed/YAWt-gktZqM?controls=0"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      ></iframe>
    </div>
  </div>
</template>
<script setup lang="ts">
</script>