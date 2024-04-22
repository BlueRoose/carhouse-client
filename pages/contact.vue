<template>
  <div class="contact">
    <div class="contact__dark container">
      <h2 class="contact__dark-heading">Contact Us</h2>
      <p class="contact__dark-description">We're always here to help you find the perfect car! Whether you have questions about our inventory, services, or you'd like to schedule a test drive, feel free to get in touch with us. Our friendly and experienced staff are ready to answer all your inquiries and provide you with the information you need.</p>
      <form class="contact__dark__form">
        <div class="contact__dark__form__row">
          <div class="contact__dark__form__block">
            <p class="contact__dark__form__block-title">Full name*</p>
            <input v-model="formData.name" class="contact__dark__form__block-input" />
            <span v-if="v$.name.$error" class="input-incorrect">
              {{ v$.name.$errors[0]?.$message }}
            </span>
          </div>
          <div class="contact__dark__form__block">
            <p class="contact__dark__form__block-title">Email*</p>
            <input v-model="formData.email" class="contact__dark__form__block-input" />
            <span v-if="v$.email.$error" class="input-incorrect">
              {{ v$.email.$errors[0]?.$message }}
            </span>
          </div>
        </div>
        <div class="contact__dark__form__block">
          <p class="contact__dark__form__block-title">Subject*</p>
          <input v-model="formData.subject" class="contact__dark__form__block-input" />
          <span v-if="v$.subject.$error" class="input-incorrect">
              {{ v$.subject.$errors[0]?.$message }}
          </span>
        </div>
        <div class="contact__dark__form__block">
          <p class="contact__dark__form__block-title">Message*</p>
          <textarea v-model="formData.message" class="contact__dark__form__block-input textarea" />
          <span v-if="v$.message.$error" class="input-incorrect">
              {{ v$.message.$errors[0]?.$message }}
          </span>
        </div>
        <div>
          <div class="contact__dark__form__rules">
            <input type="checkbox" v-model="formData.checkbox" />
            <p class="contact__dark__form__rules-text">Accept <a href="#">terms & conditions</a></p>
          </div>
          <span v-if="v$.checkbox.$error" class="input-incorrect">
            {{ v$.checkbox.$errors[0]?.$message }}
          </span>
        </div>
        <Button class="contact__dark__form-button" @click="submitForm">Send message</Button>
      </form>
      <img
        class="contact__dark-image"
        src="/images/map-bg.svg"
        alt="map"
      />
    </div>
    <div class="wrapper">
      <div class="contact__white container">
        <div class="contact__white__info">
          <h3 class="contact__white__info-title">Our dealer locations</h3>
          <p class="contact__white__info-description">
            Visit any of our dealer locations nationwide to receive expert assistance with all your automotive needs. Our knowledgeable staff is ready to guide you through our extensive inventory and provide personalized recommendations. Whether you're looking for sales, service, or support, our dealerships are here to ensure your satisfaction.
          </p>
        </div>
        <div class="contact__white__cards">
          <DealerCard
            v-for="location, index in dealerLocations"
            :key="index"
            :location="location"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useVuelidate } from "@vuelidate/core";
import {
  required,
  email,
  minLength,
  maxLength,
  helpers,
} from "@vuelidate/validators";
import api from "@/api";

const dealerLocations = [
  {
    city: "Los Angeles",
    country: "United States",
    address: "123 Main Street, Los Angeles, CA 90001",
    phone: "+ 1 (555) 123-4567"
  },
  {
    city: "London",
    country: "United Kingdom",
    address: "456 High Street, London, SW1A 1AA",
    phone: "+ 44 20 1234 5678"
  },
  {
    city: "Tokyo",
    country: "Japan",
    address: "789 Sakura Avenue, Tokyo, 100-0001",
    phone: "+ 81 3 9876 5432"
  },
  {
    city: "Sydney",
    country: "Australia",
    address: "321 Beach Road, Sydney, NSW 2000",
    phone: "+ 61 2 8765 4321"
  },
];

const error = ref("");
const formData = reactive({
  name: "",
  email: "",
  subject: "",
  message: "",
});

const rules = computed(() => {
  return {
    name: {
      required: helpers.withMessage("Это поле обязательное", required),
    },
    email: {
      required: helpers.withMessage("Это поле обязательное", required),
      email: helpers.withMessage("E-mail введён некорректно", email),
    },
    subject: {
      required: helpers.withMessage("Это поле обязательное", required),
    },
    message: {
      required: helpers.withMessage("Это поле обязательное", required),
      minLength: helpers.withMessage(
        "Сообщение должно быть длиннее тридцати символов",
        minLength(30)
      ),
      maxLength: helpers.withMessage(
        "Сообщение не должно быть длиннее пятисот символов",
        maxLength(255)
      ),
    },
    checkbox: {
      required: helpers.withMessage("Для отправки подтвердите согласие с политикой обработки персональных данных", required),
    },
  };
});

const v$ = useVuelidate(rules, formData);

async function submitForm(event) {
  event.preventDefault();
  if (await v$.value.$validate()) {
    try {
      const body = {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        text: formData.message,
      }
      const response = await api.addRequest(body);

      Object.assign(formData, {
        name: "",
        email: "",
        subject: "",
        message: "",
        checkbox: false,
      });
      v$.value.$reset()
    } catch (e) {
      error.value = e;
      setTimeout(() => {
        error.value = "";
      }, 1000);
    }
  }
}
</script>

<style lang="scss" scoped>
.contact {
  background-color: $color-dark;

  &__dark {
    padding-top: 85px;
    padding-bottom: 120px;
    position: relative;

    &-heading {
      font-size: 48px;
      color: $color-white;
      margin-bottom: 35px;
      text-align: center;
      position: relative;
      z-index: 1;
    }

    &-description {
      max-width: 35%;
      margin: 0 auto;
      margin-bottom: 100px;
      font-size: 18px;
      line-height: 32px;
      color: $color-white;
      text-align: center;
      position: relative;
      z-index: 1;
    }

    &__form {
      max-width: 650px;
      padding: 72px 65px;
      margin: 0 auto;
      background-color: $color-white;
      display: flex;
      flex-direction: column;
      gap: 25px;
      position: relative;
      z-index: 1;

      &__row {
        display: flex;
        gap: 40px;
      }

      &__block {
        width: 100%;
        display: flex;
        flex-direction: column;

        &-title {
          font-size: 18px;
          line-height: 32px;
          color: #575757;
          margin-bottom: 16px;
        }

        &-input {
          width: 100%;
          height: 45px;
          padding: 0 20px;
          box-sizing: border-box;
          border: 2px solid #5e5e5e;
          outline: none;
          font-size: 18px;
        }
      }

      &__rules {
        display: flex;
        align-items: center;
        gap: 12px;

        input {
          width: 16px;
          height: 16px;
        }

        &-text {
          font-size: 18px;
          line-height: 40px;
          color: #575757;

          a {
            color: $color-yellow;
            font-size: 600;
          }
        }
      }

      &-button {
        padding-top: 15px;
        padding-bottom: 15px;
      }
    }

    &-image {
      max-width: 100%;
      box-sizing: border-box;
      position: absolute;
      top: 150px;
      left: 0;
    }
  }

  .wrapper {
    background-color: $color-white;
  }

  &__white {
    padding-top: 190px;
    padding-bottom: 190px;

    &__info {
      margin-bottom: 100px;
      display: flex;
      justify-content: space-between;

      @include mq($until: tablet) {
        flex-direction: column;
        gap: 50px;
      }

      &-title {
        font-size: 48px;
      }

      &-description {
        max-width: 663px;
        font-size: 18px;
        line-height: 32px;
      }
    }

    &__cards {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
    }
  }
}

.input-incorrect {
  color: red;
}

.textarea {
  height: 150px;
  resize: none;
  padding-top: 15px;
}
</style>