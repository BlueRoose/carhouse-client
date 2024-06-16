<template>
  <div class="w-[450px] flex flex-col items-center pt-20 pr-12 pb-6 pl-12 bg-white rounded-3xl relative">
    <div class="w-full flex justify-between absolute top-2.5 left-0 px-4">
      <p class="text-lg font-semibold">Order the car</p>
      <IconsXMarkIcon class="cursor-pointer" @click="closeModal" />
    </div>
    <div class="grid grid-cols-2 gap-5">
      <div class="w-full flex flex-col gap-4">
        <p>Name</p>
        <input
          :value="userName"
          class="w-full fh-8 text-base pl-2.5 outline-none border border-main-yellow disabled:cursor-not-allowed"
          disabled
        />
      </div>
      <div class="w-full flex flex-col gap-4">
        <p>Car</p>
        <input
          :value="car"
          class="w-full fh-8 text-base pl-2.5 outline-none border border-main-yellow disabled:cursor-not-allowed"
          disabled
        />
      </div>
      <div class="w-1/2 mx-auto flex flex-col gap-4 grid-last">
        <p>Phone number</p>
        <input v-model="formData.phone" class="w-full fh-8 text-base pl-2.5 outline-none border border-main-yellow" />
        <span v-if="v$.phone?.$error" class="text-red-500 text-sm">
          {{ v$.phone?.$errors[0]?.$message }}
        </span>
      </div>
    </div>
    <Button
      class="mt-6"
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
.grid-last {
  grid-column: 1 / span 2;
}
</style>
