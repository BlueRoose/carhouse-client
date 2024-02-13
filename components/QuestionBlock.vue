<template>
  <div class="wrapper">
    <div class="question">
      <p class="question-title">Have a question?</p>
      <p class="question-description">Our experts are always happy to help you with any question</p>
      <div class="question__buttons">
        <Button class="question__buttons-contact" @click="handleClickContact">CONTACT US</Button>
        <div class="question__buttons__phone">
          <img
            class="question__buttons__phone-image"
            src="/icons/phone.svg"
            alt="phone"
          />
          <a  class="question__buttons__phone-number" href="tel:+37529777777" target="_blank">+375 (29) 777-77-77</a>
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
  margin-bottom: 5px;

  .question {
    width: 60%;
    height: 280px;
    padding-top: 60px;
    padding-left: 240px;
    background-color: $color-yellow;

    &-title {
      font-size: 60px;
      font-weight: 700;
      margin-bottom: 15px;
    }

    &-description {
      font-size: 18px;
      margin-bottom: 60px;
    }

    &__buttons {
      display: flex;
      gap: 30px;

      &-contact {
        background-color: $color-black;
        color: $color-white;
        border-radius: 0;
      }

      &__phone {
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
          font-weight: 900;
        }
      }
    }
  }
}
</style>