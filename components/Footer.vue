<template>
  <footer class="footer">
    <div class="footer__block">
      <div class="footer__block__info">
        <Logo />
        <p class="footer__block__info-text">Carhouse - the best place to buy your new toy</p>
      </div>
      <div class="footer__block__links">
        <p class="footer__block__links-title">QUICK LINKS</p>
        <div class="footer__block__links__list">
          <NuxtLink class="footer__block__links__list-item" to="/">Home</NuxtLink>
          <NuxtLink class="footer__block__links__list-item" to="/about">About</NuxtLink>
          <NuxtLink class="footer__block__links__list-item" to="/services">Services</NuxtLink>
          <NuxtLink class="footer__block__links__list-item" to="/collections">Collections</NuxtLink>
          <NuxtLink
            v-if="isAuth"
            class="footer__block__links__list-item"
            to="/favourites"
          >
            Favourites
          </NuxtLink>
        </div>
      </div>
      <div class="footer__block__subscribtion">
        <p class="footer__block__subscribtion-title">SUBSCRIBE</p>
        <p class="footer__block__subscribtion-description">Stay up to date with our news, discounts and other exciting promotions</p>
        <div class="footer__block__subscribtion__form">
          <input
            v-model="email"
            class="footer__block__subscribtion__form-input"
            placeholder="Enter your email"
          />
          <Button class="footer__block__subscribtion__form-button" @click="handleClickSend">Send</Button>
        </div>
      </div>
    </div>
    <div class="footer__rights">
      <p class="footer__rights-text">CARHOUSE - © 2024 All Rights Reserved</p>
    </div>
  </footer>
</template>

<script setup>
import Logo from "~/components/Logo.vue";
import Button from "~/components/Button.vue";

const isAuth = ref(false);
const email = ref("");

function handleClickSend() {
  alert(email.value);
}
</script>

<style lang="scss" scoped>
.footer {
  padding-top: 160px;
  background-color: $color-dark;
  
  &__block {
    padding: 0 240px;
    padding-bottom: 100px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    &__info {
      display: flex;
      flex-direction: column;
      gap: 20px;

      &-text {
        font-size: 18px;
        color: $color-white;
        opacity: 60%;
      }
    }

    &__links {
      display: flex;
      flex-direction: column;
      gap: 32px;

      &-title {
        font-size: 20px;
        font-weight: 800;
        color: $color-white;
      }

      &__list {
        display: flex;
        flex-direction: column;
        gap: 12px;
        list-style-type: none;

        &-item {
          font-size: 18px;
          color: $color-gray;
          transition: 0.2s linear;

          &:hover {
            color: $color-white;
          }
        }
      }
    }

    &__subscribtion {
      display: flex;
      flex-direction: column;
      gap: 32px;

      &-title {
        font-size: 20px;
        font-weight: 800;
        color: $color-white;
      }

      &-description {
        font-size: 16px;
        color: $color-white;
      }

      &__form {
        display: flex;
        
        &-input {
          width: 100%;
          border: 1px solid #5E5E5E;
          padding: 15px;
          color: $color-white;
          outline: none;
          background-color: transparent;
        }

        &-button {
          border-radius: 0;

          &:hover {
            border-radius: 0;
          }
        }
      }
    }
  }

  &__rights {
    background-color: #1d1d1d;
    padding: 32px 0;

    &-text {
      color: $color-white;
      opacity: 60%;
      text-align: center;
    }
  }
}

.router-link-active {
  color: $color-yellow !important;
}
</style>