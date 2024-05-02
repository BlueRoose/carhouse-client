<template>
  <div class="wrapper">
    <header class="header container">
      <Logo />
      <h1 class="header-title">Admin panel</h1>
      <div class="header__list">
        <NuxtLink class="header__list-item" to="/admin/brands-types">
          Brands and Types Management
        </NuxtLink>
        <NuxtLink class="header__list-item" to="/admin/cars">
          Cars Management
        </NuxtLink>
        <NuxtLink class="header__list-item" to="/admin/user-requests">
          User Requests
        </NuxtLink>
        <NuxtLink class="header__list-item" to="/admin/buy-requests">
          Buy Requests
        </NuxtLink>
        <NuxtLink class="header__list-item" to="/admin/users">
          Users Management
        </NuxtLink>
      </div>
    </header>
  </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.wrapper {
  background-color: $color-dark;
  border-bottom: 1px solid $color-white;

  .header {
    padding: 25px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    @include mq($until: tablet) {
      justify-content: center;
    }

    &-title {
      font-size: 32px;
      color: $color-white;
      margin-bottom: 25px;
    }

    &__list {
      display: flex;
      gap: 50px;
      list-style-type: none;

      @include mq($until: desktop-xl) {
        gap: 25px;
      }

      @include mq($until: desktop-l) {
        gap: 15px;
      }

      @include mq($until: tablet) {
        display: none;
      }

      &-item {
        font-size: 20px;
        color: $color-gray;
        transition: 0.2s linear;
        cursor: pointer;

        &:hover {
          color: $color-white;
        }
      }
    }
  }
}

.router-link-active {
  color: $color-yellow !important;
}
</style>