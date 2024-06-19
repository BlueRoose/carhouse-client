<template>
  <footer class="pt-20 bg-main-dark">
    <div class="container mx-auto px-4">
      <div class="pb-24 grid grid-cols-3 max-md:flex flex-col max-md:gap-10">
        <div class="flex flex-col gap-8 max-md:items-center max-lg:gap-4">
          <Logo />
          <p class="text-white text-lg opacity-60 max-md:text-center max-md:text-base">Carhouse - the best place to buy your new toy</p>
        </div>
        <div class="flex flex-col gap-8 max-md:gap-4 items-center text-center">
          <p class="text-white text-xl font-extrabold">QUICK LINKS</p>
          <div class="flex flex-col gap-3 max-md:gap-1 list-none">
            <NuxtLink
              v-for="(link, index) in quickLinks"
              :key="index"
              class="text-main-gray text-lg transition-colors ease-linear hover:text-white"
              :to="link.url"
            >
              {{ link.label }}
            </NuxtLink>
            <NuxtLink
              v-if="isAuth"
              class="text-main-gray text-lg transition-colors ease-linear hover:text-white"
              to="/favourites"
            >
              Favourites
            </NuxtLink>
          </div>
        </div>
        <div class="flex flex-col gap-8 max-md:items-center max-md:gap-3">
          <p class="text-white text-xl font-extrabold max-md:mb-1">SUBSCRIBE</p>
          <p class="text-white max-md:text-center">Stay up to date with our news, discounts and other exciting promotions</p>
          <div class="flex">
            <input
              v-model="email"
              class="w-full border border-[#5E5E5E] p-4 text-white outline-none bg-transparent"
              placeholder="Enter your email"
            />
            <Button class="!rounded-none" @click="handleClickSend">Send</Button>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-[#1D1D1D] py-8 max-md:text-sm">
      <p class="text-white opacity-60 text-center">CARHOUSE - © 2024 All Rights Reserved</p>
    </div>
  </footer>
</template>

<script setup>
const quickLinks = [
  {
    label: 'Home',
    url: '/',
  },
  {
    label: 'About',
    url: '/about',
  },
  {
    label: 'Collections',
    url: '/collections',
  },
];

const isAuth = ref(false);
const email = ref("");

function handleClickSend() {
  alert(email.value);
}
</script>

<style lang="scss" scoped>
.router-link-active {
  color: #FFD600 !important;
}
</style>