<template>
  <div class="bg-main-dark border-b border-white">
    <header class="py-6 flex flex-col justify-center items-center container mx-auto px-4">
      <Logo />
      <h1 class="text-white text-3xl mb-6">Admin panel</h1>
      <div class="flex gap-12 list-none">
        <NuxtLink
          v-for="(link, index) in links"
          :key="index"
          class="text-main-gray text-xl transition-colors ease-linear cursor-pointer hover:text-white"
          :to="link.url"
        >
          {{ link.label }}
        </NuxtLink>
      </div>
    </header>
  </div>
</template>

<script setup>
const links = [
  {
    label: "Brands and Types Management",
    url: "/admin/brands-types",
  },
  {
    label: "Cars Management",
    url: "/admin/cars",
  },
  {
    label: "User Requests",
    url: "/admin/user-requests",
  },
  {
    label: "Buy Requests",
    url: "/admin/buy-requests",
  },
  {
    label: "Users Management",
    url: "/admin/users",
  },
];
</script>

<style lang="scss" scoped>
.router-link-active {
  color: #FFD600 !important;
}
</style>