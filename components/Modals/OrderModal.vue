<template>
  <div class="order-modal">
    <div class="order-modal__top-bar">
      <p class="order-modal__top-bar-title">Order the car</p>
      <IconsXMarkIcon class="order-modal__top-bar-close" @click="closeModal" />
    </div>
    <div class="order-modal__form">
      <div class="order-modal__form__block">
        <p>Name</p>
        <input v-model="userName" class="order-modal__form__block-input" disabled />
      </div>
      <div class="order-modal__form__block">
        <p>Car</p>
        <input v-model="car" class="order-modal__form__block-input" disabled />
      </div>
      <div class="order-modal__form__block">
        <p>Phone number</p>
        <input v-model="formData.phone" class="order-modal__form__block-input" />
        <span v-if="v$.phone?.$error" class="input-incorrect">
          {{ v$.phone?.$errors[0]?.$message }}
        </span>
      </div>
    </div>
    <Button
      class="order-modal-button"
      :isLoading="isLoading"
      @click="submitForm"
    >
      Order
    </Button>
  </div>
</template>

<script setup>
import { useVuelidate } from "@vuelidate/core";
import {
  required,
  numeric,
  minLength,
  helpers
} from "@vuelidate/validators";
import { useAuthStore } from "@/store/auth.js";
import { useModalsStore } from "@/store/modals.js";
import { useCarsStore } from "@/store/cars.js";
import { useNotificationsStore } from "@/store/notifications.js";
import api from "@/api";

const authStore = useAuthStore();
const modalsStore = useModalsStore();
const carsStore = useCarsStore();
const notificationsStore = useNotificationsStore();

const { user } = storeToRefs(authStore);
const { selectedCar } = storeToRefs(carsStore);
const { successMessage, errorMessage } = storeToRefs(notificationsStore);

const isLoading = ref(false);
const formData = reactive({
  phone: "",
});

const userName = computed(() => `${user.value.name} ${user.value.surname}`);

const car = computed(() => `${selectedCar.value.brand} ${selectedCar.value.name}`);

const rules = computed(() => {
  return {
    phone: {
      required: helpers.withMessage('Это поле обязательное', required),
      minLength: helpers.withMessage(
        "Номер телефона введён некорректно",
        minLength(7)
      ),
      numeric: helpers.withMessage('Номер телефона введён некорректно', numeric)
    }
  };
});

const v$ = useVuelidate(rules, formData);

function closeModal() {
  modalsStore.hideOrderModal();
  modalsStore.toggleIsModal();
}

async function submitForm() {
  isLoading.value = true;
  if (await v$.value.$validate()) {
    try {
      await api.createBuyRequest(selectedCar.value.id, formData.phone);
      formData.phone = "";
      modalsStore.hideOrderModal();
      modalsStore.toggleIsModal();
      successMessage.value = "You have successfully ordered car";
      setTimeout(() => successMessage.value = "", 2000);
    } catch (e) {
      errorMessage.value = e;
      setTimeout(() => errorMessage.value = "", 2000);
    }
  }
  isLoading.value = false;
}
</script>

<style lang="scss" scoped>
.order-modal {
  width: 450px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 75px 50px 25px 50px;
  background-color: $color-white;
  border-radius: 25px;
  position: relative;

  &__top-bar {
    width: 100%;
    display: flex;
    justify-content: space-between;
    position: absolute;
    top: 10px;
    left: 0;
    padding: 0 15px;
    box-sizing: border-box;

    &-title {
      font-size: 18px;
      font-weight: 600;
    }

    &-close {
      cursor: pointer;
    }
  }

  &__form {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;

    &__block {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 5px;

      &:last-of-type {
        width: 50%;
        margin: 0 auto;
        grid-column: 1 / span 2;
      }

      &-input {
        width: 100%;
        height: 30px;
        font-size: 16px;
        padding-left: 10px;
        box-sizing: border-box;
        border: none;
        outline: none;
        border-bottom: 1px solid $color-yellow;

        &:disabled {
          cursor: not-allowed;
        }
      }
    }

    &__inputs {
      width: 100%;
      display: flex;
      gap: 10px;

      input {
        width: 100%;
        text-align: center;
      }
    }
  }

  &-button {
    margin-top: 25px;
    margin-bottom: 20px;
  }

  &__message {
    width: fit-content;
    margin: 0 auto;

    &-span {
      font-weight: 600;
      cursor: pointer;
    }
  }
}

.input-incorrect {
  font-size: 14px;
  color: red;
}
</style>