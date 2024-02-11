<template>
  <header class="header">
    <Logo />
    <div class="header__list">
      <NuxtLink class="header__list-item" to="/">
        Home
      </NuxtLink>
      <NuxtLink class="header__list-item" to="/about">
        About
      </NuxtLink>
      <NuxtLink class="header__list-item" to="/services">
        Services
      </NuxtLink>
      <NuxtLink class="header__list-item" to="/collections">
        Collections
      </NuxtLink>
      <NuxtLink
        v-if="isAuth"
        class="header__list-item"
        to="/favourites"
      >
        Favourites
      </NuxtLink>
    </div>
    <Button v-if="isAuth">Log out</Button>
    <Button v-else>Login</Button>
  </header>
</template>

<script setup>
import Logo from "~/components/Logo.vue";
import Button from "~/components/Button.vue";

const isAuth = ref(false);
</script>

<style lang="scss" scoped>
.header {
  height: 127px;
  padding: 0 240px;
  background-color: $color-dark;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &__list {
    display: flex;
    gap: 50px;
    list-style-type: none;

    &-item {
      font-size: 20px;
      color: $color-gray;
      transition: 0.2s linear;

      &:hover {
        color: $color-white;
      }
    }
  }
}

.router-link-active {
  color: $color-yellow !important;
}
</style>