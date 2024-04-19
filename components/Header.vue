<template>
  <div class="wrapper">
    <header class="header container">
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
      </div>
      <div
        v-if="isAuth"
        class="header__user"
        :class="{ 'user-opened': isUserClicked }"
        @click="isUserClicked = true"
      >
        <IconsUserIcon class="header__user-icon" />
        <p class="header__user-data">
          {{ `${user.name} ${user.surname}` }}
        </p>
        <Transition name="fade">
          <div v-if="isUserClicked" ref="userBlock" class="header__user__modal">
            <p class="header__user__modal-data">{{ `${user.name} ${user.surname}` }}</p>
            <p class="header__user__modal-email">{{ user.email }}</p>
            <div class="header__user__modal__row" @click="openPage('favourites')">
              <IconsHeartIcon />
              <p class="header__user__modal__row-title">Favourites</p>
            </div>
            <div class="header__user__modal__row" @click="openPage('orders')">
              <IconsCartIcon />
              <p class="header__user__modal__row-title">Orders</p>
            </div>
            <div class="header__user__modal__row" @click="logout">
              <IconsLogoutIcon />
              <p class="header__user__modal__row-title">Logout</p>
            </div>
          </div>
        </Transition>
      </div>
      <Button v-else @click="openAuthModal">Login</Button>
    </header>
  </div>
</template>

<script setup>
import { useAuthStore } from "@/store/auth.js";
import { useModalsStore } from "@/store/modals.js";

const router = useRouter();

const authStore = useAuthStore();
const modalsStore = useModalsStore();

const { isAuth, user } = storeToRefs(authStore);

const userBlock = ref(null);
const isUserClicked = ref(false);

onClickOutside(userBlock, () => isUserClicked.value = false);

function openAuthModal() {
  modalsStore.toggleAuthModal();
  modalsStore.toggleModal();
}

function openPage(page) {
  router.push(`/${page}`);
  isUserClicked.value = false;
}

function logout() {
  authStore.logout();
}
</script>

<style lang="scss" scoped>
.wrapper {
  background-color: $color-dark;
  border-bottom: 1px solid $color-white;

  .header {
    height: 127px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    @include mq($until: tablet) {
      justify-content: center;
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

        &:hover {
          color: $color-white;
        }
      }
    }

    &__user {
      display: flex;
      align-items: center;
      gap: 12px;
      cursor: pointer;
      position: relative;

      @include mq($until: tablet) {
        display: none;
      }

      &:hover &-icon {
        color: $color-yellow;
      }

      &:hover &-data {
        color: $color-yellow;
      }

      &-data {
        transition: color 0.2s linear;
        color: $color-white;
      }

      &__modal {
        width: 300px;
        padding: 20px 0;
        background-color: $color-white;
        border-radius: 15px;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
        position: absolute;
        top: 110%;
        right: 0;
        z-index: 5;
        cursor: auto;

        &:hover .header__user-icon {
          color: $color-white;
        }

        &-data {
          font-size: 20px;
          font-weight: 600;
          padding-left: 10px;
          margin-bottom: 5px;
        }

        &-email {
          font-size: 14px;
          padding-left: 10px;
          margin-bottom: 15px;
        }

        &__row {
          padding: 5px 10px;
          display: flex;
          align-items: center;
          gap: 15px;
          cursor: pointer;
          transition: border-width 0.2s linear;

          &:hover {
            border-bottom: 1px solid $color-yellow;
          }
        };
      }
    }
  }
}

.user-opened .header__user-icon {
  color: $color-yellow;
}

.user-opened .header__user-data {
  color: $color-yellow;
}

.router-link-active {
  color: $color-yellow !important;
}
</style>