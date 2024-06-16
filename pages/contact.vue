<template>
  <div class="bg-main-dark">
    <div class="pt-20 pb-28 relative container">
      <h2 class="text-5xl text-white mb-9 text-center relative z-[1]">Contact Us</h2>
      <p class="max-w-[35%] mx-auto mb-24 text-lg text-white text-center relative z-[1]">We're always here to help you find the perfect car! Whether you have questions about our inventory, services, or you'd like to schedule a test drive, feel free to get in touch with us. Our friendly and experienced staff are ready to answer all your inquiries and provide you with the information you need.</p>
      <form class="max-w-[650px] py-16 px-16 mx-auto bg-white flex flex-col gap-6 relative z-[1]">
        <div class="flex gap-10">
          <div class="w-full flex flex-col">
            <p class="text-[#575757] text-lg mb-4">Full name*</p>
            <input v-model="formData.name" class="w-full h-11 px-5 border-[2px] border-[#5E5E5E] outline-none text-lg" />
            <span v-if="v$.name.$error" class="text-red-500">
              {{ v$.name.$errors[0]?.$message }}
            </span>
          </div>
          <div class="w-full flex flex-col">
            <p class="text-[#575757] text-lg mb-4">Email*</p>
            <input v-model="formData.email" class="w-full h-11 px-5 border-[2px] border-[#5E5E5E] outline-none text-lg" />
            <span v-if="v$.email.$error" class="text-red-500">
              {{ v$.email.$errors[0]?.$message }}
            </span>
          </div>
        </div>
        <div class="w-full flex flex-col">
          <p class="text-[#575757] text-lg mb-4">Subject*</p>
          <input v-model="formData.subject" class="w-full h-11 px-5 border-[2px] border-[#5E5E5E] outline-none text-lg" />
          <span v-if="v$.subject.$error" class="text-red-500">
              {{ v$.subject.$errors[0]?.$message }}
          </span>
        </div>
        <div class="w-full flex flex-col">
          <p class="text-[#575757] text-lg mb-4">Message*</p>
          <textarea v-model="formData.message" class="w-full px-5 border-[2px] border-[#5E5E5E] outline-none text-lg h-[150px] resize-none pt-4" />
          <span v-if="v$.message.$error" class="text-red-500">
              {{ v$.message.$errors[0]?.$message }}
          </span>
        </div>
        <div>
          <div class="flex items-center gap-3">
            <input v-model="formData.checkbox" type="checkbox" />
            <p class="text-[#575757] text-lg">Accept <a href="#">terms & conditions</a></p>
          </div>
          <span v-if="v$.checkbox.$error" class="text-red-500">
            {{ v$.checkbox.$errors[0]?.$message }}
          </span>
        </div>
        <Button :isLoading="isLoading" @click="submitForm">
          Send message
        </Button>
      </form>
      <img
        class="max-w-full absolute top-[150px] left-0"
        src="/images/map-bg.svg"
        alt="map"
      />
    </div>
    <div class="bg-white">
      <div class="py-24 container">
        <div class="mb-24 flex justify-between">
          <h3 class="text-5xl">Our dealer locations</h3>
          <p class="max-w-[663px] text-lg">
            Visit any of our dealer locations nationwide to receive expert assistance with all your automotive needs. Our knowledgeable staff is ready to guide you through our extensive inventory and provide personalized recommendations. Whether you're looking for sales, service, or support, our dealerships are here to ensure your satisfaction.
          </p>
        </div>
        <div class="grid grid-cols-4 gap-4">
          <DealerCard
            v-for="(location, index) in dealerLocations"
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
import { useNotificationsStore } from "@/store/notifications.js";
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

const notificationsStore = useNotificationsStore();

const { successMessage, errorMessage } = storeToRefs(notificationsStore);

const isLoading = ref(false);
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
  isLoading.value = true;
  if (await v$.value.$validate()) {
    try {
      const body = {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        text: formData.message,
      }
      const response = await api.addRequest(body);
      successMessage.value = "You have successfully sent your request";
      setTimeout(() => successMessage.value = "", 2000);

      Object.assign(formData, {
        name: "",
        email: "",
        subject: "",
        message: "",
        checkbox: false,
      });
      v$.value.$reset()
    } catch (e) {
      errorMessage.value = e;
      setTimeout(() => errorMessage.value = "", 2000);
    }
  }
  isLoading.value = false;
}
</script>
