<template>
  <div class="wrapper">
    <div class="question">
      <p class="question-title">Have a question?</p>
      <p class="question-description">Our experts are always happy to help you with any question</p>
      <div class="question__buttons">
        <Button class="question__buttons-contact" @click="handleClickContact">Contact us</Button>
        <div class="question__buttons__phone">
          <img
            class="question__buttons__phone-image"
            src="/icons/phone.svg"
            alt="phone"
          />
          <a  class="question__buttons__phone-number" href="tel:+37529777777">+375 (29) 777-77-77</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const router = useRouter();

function handleClickContact() {
  router.push("/contact");
}
</script>

<style lang="scss" scoped>
.wrapper {
  background-color: $color-dark;
  margin-bottom: 2px;

  .question {
    width: 70%;
    height: fit-content;
    padding-top: 60px;
    padding-bottom: 60px;
    padding-left: 240px;
    padding-right: 24px;
    background-color: $color-yellow;
    box-sizing: border-box;

    @include mq($until: desktop-xl) {
      padding-left: 180px;
    }

    @include mq($until: desktop-l) {
      padding-left: 120px;
    }

    @include mq($until: desktop) {
      padding-left: 90px;
    }

    @include mq($until: tablet) {
      padding-top: 30px;
      padding-bottom: 30px;
    }

    @include mq($until: mobile-xxl) {
      width: 80%;
      padding-left: 50px;
    }

    @include mq($until: mobile-l) {
      width: 100%;
      padding-left: 24px;
    }

    &-title {
      font-size: 60px;
      font-weight: 700;
      margin-bottom: 15px;

      @include mq($until: desktop-xl) {
        font-size: 48px;
        margin-bottom: 10px;
      }

      @include mq($until: desktop-l) {
        font-size: 36px;
      }

      @include mq($until: mobile-xxl) {
        font-size: 28px;
        margin-bottom: 5px;
      }
    }

    &-description {
      font-size: 18px;
      margin-bottom: 60px;

      @include mq($until: tablet) {
        font-size: 16px;
      }

      @include mq($until: mobile-xxl) {
        font-size: 14px;
      }
    }

    &__buttons {
      display: flex;
      gap: 30px;

      @include mq($until: tablet) {
        gap: 20px;
      }

      @include mq($until: mobile-xxl) {
        flex-direction: column;
        gap: 12px;
      }

      &-contact {
        background-color: $color-black;
        color: $color-white;
        border-radius: 0;
        transition: 0.2s linear;

        &:hover {
          border-radius: 15px;
        }
      }

      &__phone {
        width: fit-content;
        background-color: $color-white;
        color: $color-black;
        display: flex;
        gap: 20px;
        align-items: center;
        padding: 10px 20px;

        &-image {
          width: 22px;
        }

        &-number {
          color: $color-black;
          font-weight: 700;
        }
      }
    }
  }
}
</style>