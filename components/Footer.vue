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

  @include mq($until: desktop-xl) {
    padding-top: 100px;
  }

  @include mq($until: desktop-l) {
    padding-top: 70px;
  }
  
  &__block {
    padding: 0 240px;
    padding-bottom: 100px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);

    @include mq($until: desktop-xl) {
      padding: 0 180px;
      padding-bottom: 80px;
    }

    @include mq($until: desktop-l) {
      padding: 0 120px;
      padding-bottom: 60px;
    }

    @include mq($until: desktop) {
      padding: 0 90px;
      padding-bottom: 40px;
    }

    @include mq($until: mobile-xxl) {
      padding: 0 50px;
      padding-bottom: 40px;
    }

    @include mq($until: mobile-l) {
      padding: 0 24px;
      padding-bottom: 40px;
    }

    @include mq($until: tablet) {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 32px;
    }

    &__info {
      display: flex;
      flex-direction: column;
      gap: 32px;

      @include mq($until: desktop-l) {
        gap: 16px;
      }

      @include mq($until: desktop) {
        gap: 12px;
      }

      @include mq($until: tablet) {
        align-items: center;
      }

      &-text {
        font-size: 18px;
        color: $color-white;
        opacity: 60%;

        @include mq($until: tablet) {
          display: none;
        }
      }
    }

    &__links {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 32px;
      text-align: center;

      @include mq($until: desktop-l) {
        gap: 16px;
      }

      @include mq($until: desktop) {
        gap: 12px;
      }

      @include mq($until: tablet) {
        display: none;
      }

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

      @include mq($until: desktop-l) {
        gap: 16px;
      }

      @include mq($until: desktop) {
        gap: 12px;
      }

      @include mq($until: tablet) {
        align-items: center;
      }

      &-title {
        font-size: 20px;
        font-weight: 800;
        color: $color-white;
      }

      &-description {
        font-size: 16px;
        color: $color-white;

        @include mq($until: mobile-xxl) {
          text-align: center;
        }
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

    @include mq($until: desktop) {
      padding-bottom: 64px;
    }

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