<template>
  <div class="bg-main-dark">
    <div class="pt-20 pb-28 max-md:pt-14 max-md:pb-20 relative container mx-auto px-4">
      <h2 class="text-5xl max-s:text-4xl text-white mb-9 max-s:mb-4 text-center relative z-[1]">Contact Us</h2>
      <p class="max-w-[50%] max-md:max-w-[75%] max-s:max-w-full mx-auto mb-24 max-md:mb-16 text-lg max-s:text-base text-white text-center relative z-[1]">We're always here to help you find the perfect car! Whether you have questions about our inventory, services, or you'd like to schedule a test drive, feel free to get in touch with us. Our friendly and experienced staff are ready to answer all your inquiries and provide you with the information you need.</p>
      <form class="max-w-[650px] p-16 max-md:p-10 max-s:p-5 mx-auto bg-white flex flex-col gap-6 max-md:gap-4 relative z-[1]">
        <div class="flex gap-10 max-md:gap-4">
          <div class="w-full flex flex-col">
            <p class="text-[#575757] text-lg mb-4">Full name*</p>
            <input v-model="formData.name" class="w-full h-11 px-5 max-md:px-2 border-[2px] border-[#5E5E5E] outline-none text-lg max-md:text-base" />
            <span v-if="v$.name.$error" class="text-red-500">
              {{ v$.name.$errors[0]?.$message }}
            </span>
          </div>
          <div class="w-full flex flex-col">
            <p class="text-[#575757] text-lg mb-4">Email*</p>
            <input v-model="formData.email" class="w-full h-11 px-5 max-md:px-2 border-[2px] border-[#5E5E5E] outline-none text-lg max-md:text-base" />
            <span v-if="v$.email.$error" class="text-red-500">
              {{ v$.email.$errors[0]?.$message }}
            </span>
          </div>
        </div>
        <div class="w-full flex flex-col">
          <p class="text-[#575757] text-lg mb-4">Subject*</p>
          <input v-model="formData.subject" class="w-full h-11 px-5 max-md:px-2 border-[2px] border-[#5E5E5E] outline-none text-lg max-md:text-base" />
          <span v-if="v$.subject.$error" class="text-red-500">
              {{ v$.subject.$errors[0]?.$message }}
          </span>
        </div>
        <div class="w-full flex flex-col">
          <p class="text-[#575757] text-lg mb-4">Message*</p>
          <textarea v-model="formData.message" class="w-full px-5 max-md:px-2 border-[2px] border-[#5E5E5E] outline-none text-lg max-md:text-base h-[150px] resize-none pt-4 max-md:pt-2" />
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
      <div class="py-24 max-md:py-16 container mx-auto px-4">
        <div class="mb-24 max-md:mb-12 flex max-lg:flex-col max-lg:gap-8 justify-between">
          <h3 class="text-5xl max-md:text-4xl">Our dealer locations</h3>
          <p class="max-w-[663px] text-lg max-md:text-base">
            Visit any of our dealer locations nationwide to receive expert assistance with all your automotive needs. Our knowledgeable staff is ready to guide you through our extensive inventory and provide personalized recommendations. Whether you're looking for sales, service, or support, our dealerships are here to ensure your satisfaction.
          </p>
        </div>
        <div class="grid grid-cols-4 max-xl:grid-cols-2 max-md:flex flex-col gap-4">
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
      required: helpers.withMessage("This field is required", required),
    },
    email: {
      required: helpers.withMessage("This field is required", required),
      email: helpers.withMessage("E-mail is incorrect", email),
    },
    subject: {
      required: helpers.withMessage("This field is required", required),
    },
    message: {
      required: helpers.withMessage("This field is required", required),
      minLength: helpers.withMessage(
        "Message should be longer than 30 symbols",
        minLength(30)
      ),
      maxLength: helpers.withMessage(
        "Message should be shorter than 255 symbols",
        maxLength(255)
      ),
    },
    checkbox: {
      required: helpers.withMessage("Accept please for sending", required),
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
