<template>
  <div class="w-full pt-20 px-12 pb-6 max-md:pb-3 max-md:px-6 bg-white rounded-3xl relative">
    <div class="w-full flex justify-between absolute top-2.5 left-0 px-4">
      <p class="text-lg font-semibold">{{ modalTitle }}</p>
      <IconsXMarkIcon class="cursor-pointer" @click="closeModal" />
    </div>
    <div v-if="isSignIn && !isConfirmationStep" class="flex flex-col gap-5 max-md:w-full">
      <div class="flex flex-col gap-1">
        <p>Email</p>
        <input
          v-model="formData.email"
          class="h-8 text-base pl-2.5 outline-none border border-main-yellow"
          type="email"
        />
        <span v-if="v$.email.$error" class="text-red-500 text-sm">
          {{ v$.email.$errors[0]?.$message }}
        </span>
      </div>
      <Button
        class="mx-auto mt-6 mb-5"
        :isLoading="isLoading"
        @click="submitForm('pre-signin')"
      >
        Continue
      </Button>
      <p class="w-fit mx-auto">Don't have an account?
        <span class="font-semibold cursor-pointer" @click="toggleIsModalType">Sign up</span>
      </p>
    </div>

    <div v-if="!isSignIn && !isConfirmationStep" class="flex flex-col gap-5 max-md:w-full">
      <div class="flex flex-col gap-1">
        <p>Name</p>
        <input v-model="formData.name" class="h-8 text-base pl-2.5 outline-none border border-main-yellow" />
        <span v-if="v$.name?.$error" class="text-red-500 text-sm">
          {{ v$.name?.$errors[0]?.$message }}
        </span>
      </div>
      <div class="flex flex-col gap-1">
        <p>Surname</p>
        <input v-model="formData.surname" class="h-8 text-base pl-2.5 outline-none border border-main-yellow" />
        <span v-if="v$.surname?.$error" class="text-red-500 text-sm">
          {{ v$.surname?.$errors[0]?.$message }}
        </span>
      </div>
      <div class="flex flex-col gap-1">
        <p>Email</p>
        <input v-model="formData.email" class="h-8 text-base pl-2.5 outline-none border border-main-yellow" />
        <span v-if="v$.email.$error" class="text-red-500 text-sm">
          {{ v$.email.$errors[0]?.$message }}
        </span>
      </div>
      <Button
        class="mx-auto mt-6 mb-5"
        :isLoading="isLoading"
        @click="submitForm('pre-signup')"
      >
        Continue
      </Button>
      <p class="w-fit mx-auto">Already have an account? 
        <span class="font-semibold cursor-pointer" @click="toggleIsModalType">Sign in</span>
      </p>
    </div>

    <div v-if="isConfirmationStep" class="max-w-[400px] max-md:w-full flex flex-col gap-5">
      <p>Для завершения введите код, отправленный на {{ formData.email }}</p>
      <div class="w-full flex gap-2.5">
        <input
          v-for="(_, index) in 5"
          :key="index"
          v-model="formData.activationMessage[index]"
          ref="input"
          class="w-1/5 text-center h-8 text-base pl-2.5 outline-none border-b border-main-yellow"
          autocomplete="off"
          type="text"
          maxLength="1"
          @input="moveFocus(index + 1)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useVuelidate } from "@vuelidate/core";
import {
  required,
  email,
  helpers
} from "@vuelidate/validators";
import { useAuthStore } from "@/store/auth.js";
import { useModalsStore } from "@/store/modals.js";
import { useNotificationsStore } from "@/store/notifications.js";

const authStore = useAuthStore();
const modalsStore = useModalsStore();
const notificationsStore = useNotificationsStore();

const { successMessage, errorMessage } = storeToRefs(notificationsStore);

const isLoading = ref(false);
const input = ref(null);
const isSignIn = ref(true)
const isConfirmationStep = ref(false);
const formData = reactive({
  name: "",
  surname: "",
  email: "",
  activationMessage: ["", "", "", "", ""]
});

const modalTitle = computed(() => isSignIn.value ? "Sign in" : "Sign up")

const rules = computed(() => {
  if (isSignIn.value) {
    return {
      email: {
        required: helpers.withMessage('This field is required', required),
        email: helpers.withMessage('Email is incorrect', email)
      }
    };
  } else {
    return {
      name: {
        required: helpers.withMessage('This field is required', required)
      },
      surname: {
        required: helpers.withMessage('This field is required', required)
      },
      email: {
        required: helpers.withMessage('This field is required', required),
        email: helpers.withMessage('Email is incorrect', email)
      }
    };
  }
});

let v$ = useVuelidate(rules, formData);

watch(rules, () => v$ = useVuelidate(rules, formData));

async function moveFocus(next) {
  if (formData.activationMessage[next-1] !== '') {
    if (next !== 5) {
      input.value[next].focus();
    } else {
      if (!formData.activationMessage.some(el => el === '')) {
        if (isSignIn.value) {
          await submitForm("signin");
        } else {
          await submitForm("signup");
        }
      }
    }
  }
}

function closeModal() {
  modalsStore.hideAuthModal();
  modalsStore.toggleIsModal();
}

function toggleIsModalType() {
  isSignIn.value = !isSignIn.value;
  v$.value.$reset()
}

function resetData() {
  Object.assign(formData, {
    name: "",
    surname: "",
    email: "",
    activationMessage: ""
  });
}

function handleError(e) {
  errorMessage.value = e;
  setTimeout(() => errorMessage.value = "", 2000);
}

async function submitForm(action) {
  isLoading.value = true;
  if (await v$.value.$validate()) {
    switch (action) {
      case "pre-signup":
        try {
          const response = await authStore.preSignUp(formData);
          isConfirmationStep.value = true;
        } catch (e) {
          handleError(e);
        }
        break;
      case "signup":
        try {
          const response = await authStore.signUp(formData);
          resetData();
          closeModal();
          successMessage.value = "You have successfully signed up";
          setTimeout(() => successMessage.value = "", 2000);
        } catch (e) {
          handleError(e);
        }
        break;
      case "pre-signin":
        try {
          const response = await authStore.preSignIn(formData);
          isConfirmationStep.value = true;
        } catch (e) {
          handleError(e);
        }
        break;
      case "signin":
        try {
          const response = await authStore.signIn(formData);
          resetData();
          closeModal();
          successMessage.value = "You have successfully signed in";
          setTimeout(() => successMessage.value = "", 2000);
        } catch (e) {
          handleError(e);
        }
        break;
      default:
        break;
    }
  }
  isLoading.value = false;
}
</script>
