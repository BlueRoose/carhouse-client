<template>
  <div class="bg-main-yellow mb-[2px]">
    <div class="container mx-auto px-4">
      <div class="w-[70%] max-md:w-full h-fit py-14 bg-main-yellow">
        <p class="text-6xl font-bold mb-4 max-lg:text-4xl max-lg:mb-2">Have a question?</p>
        <p class="text-lg font-semibold mb-10 max-lg:text-base max-lg:mb-5">Our experts are always happy to help you with any question</p>
        <div class="flex gap-7 max-sm:flex-col max-sm:gap-2">
          <Button class="!bg-black text-white shrink-0" @click="handleClickContact">Contact us</Button>
          <div class="w-fit bg-white text-black flex gap-5 items-center py-2.5 px-5 rounded-lg">
            <img
              class="w-[22px]"
              src="/icons/phone.svg"
              alt="phone"
            />
            <a class="w-fit text-black font-bold shrink-0" href="tel:+37529777777">+375 (29) 777-77-77</a>
          </div>
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
  background-color: $color-yellow;
  margin-bottom: 2px;

  .question {
    width: 70%;
    height: fit-content;
    padding-top: 60px;
    padding-bottom: 60px;
    background-color: $color-yellow;
    box-sizing: border-box;

    @include mq($until: tablet) {
      padding-top: 30px;
      padding-bottom: 30px;
    }

    @include mq($until: mobile-xxl) {
      width: 80%;
    }

    @include mq($until: mobile-l) {
      width: 100%;
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