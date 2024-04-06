<template>
  <div class="auth-modal">
    <IconsXMarkIcon class="auth-modal-close" @click="closeModal" />
    <div v-if="isSignIn && !isConfirmationStep" class="auth-modal__form">
      <div class="auth-modal__form__block">
        <p>Email</p>
        <input
          v-model="formData.email"
          class="auth-modal__form__block-input"
          type="email"
        />
        <span v-if="v$.email.$error" class="input-incorrect">
          {{ v$.email.$errors[0]?.$message }}
        </span>
      </div>
      <Button class="auth-modal__form-button" @click="submitForm('pre-signin')">Continue</Button>
      <p class="auth-modal__message">Don't have an account? 
        <span class="auth-modal__message-span" @click="toggleModalType">Sign up</span>
      </p>
    </div>

    <div v-if="!isSignIn && !isConfirmationStep" class="auth-modal__form">
      <div class="auth-modal__form__block">
        <p>Name</p>
        <input v-model="formData.name" class="auth-modal__form__block-input" />
        <span v-if="v$.name?.$error" class="input-incorrect">
          {{ v$.name?.$errors[0]?.$message }}
        </span>
      </div>
      <div class="auth-modal__form__block">
        <p>Surname</p>
        <input v-model="formData.surname" class="auth-modal__form__block-input" />
        <span v-if="v$.surname?.$error" class="input-incorrect">
          {{ v$.surname?.$errors[0]?.$message }}
        </span>
      </div>
      <div class="auth-modal__form__block">
        <p>Email</p>
        <input v-model="formData.email" class="auth-modal__form__block-input" />
        <span v-if="v$.email.$error" class="input-incorrect">
          {{ v$.email.$errors[0]?.$message }}
        </span>
      </div>
      <Button class="auth-modal__form-button" @click="submitForm('pre-signup')">Continue</Button>
      <p class="auth-modal__message">Already have an account? 
        <span class="auth-modal__message-span" @click="toggleModalType">Sign in</span>
      </p>
    </div>

    <div v-if="isConfirmationStep" class="auth-modal__form">
      <p>Для завершения введите код, отправленный на {{ formData.email }}</p>
      <div class="auth-modal__form__inputs">
        <input
          v-for="_, index in 5"
          :key="index"
          v-model="formData.activationMessage[index]"
          ref="input"
          class="auth-modal__form__block-input"
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

const authStore = useAuthStore();
const modalsStore = useModalsStore();

const input = ref(null);
const error = ref("");
const isAlertShowed = ref(false);
const isSignIn = ref(true)
const isConfirmationStep = ref(false);
const formData = reactive({
  name: "",
  surname: "",
  email: "",
  activationMessage: ["", "", "", "", ""]
});

const rules = computed(() => {
  if (isSignIn.value) {
    return {
      email: {
        required: helpers.withMessage('Это поле обязательное', required),
        email: helpers.withMessage('E-mail введён некорректно', email)
      }
    };
  } else {
    return {
      name: {
        required: helpers.withMessage('Это поле обязательное', required)
      },
      surname: {
        required: helpers.withMessage('Это поле обязательное', required)
      },
      email: {
        required: helpers.withMessage('Это поле обязательное', required),
        email: helpers.withMessage('E-mail введён некорректно', email)
      }
    };
  }
});

let v$ = useVuelidate(rules, formData)

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
  modalsStore.toggleAuthModal();
  modalsStore.toggleModal();
}

function toggleModalType() {
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
  error.value = e;
  isAlertShowed.value = true;
  setTimeout(() => {
    error.value = "";
    isAlertShowed.value = false;
  }, 1000);
}

async function submitForm(action) {
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
        } catch (e) {
          handleError(e);
        }
        break;
      default:
        break;
    }
  }
}
</script>

<style lang="scss" scoped>
.auth-modal {
  width: 350px;
  padding: 50px;
  background-color: $color-white;
  position: relative;

  &-close {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: 20px;

    &__block {
      display: flex;
      flex-direction: column;
      gap: 5px;

      &-input {
        height: 30px;
        font-size: 16px;
        border: none;
        outline: none;
        border-bottom: 1px solid $color-yellow;
      }
    }

    &-button {
      margin: 0 auto;
      margin-top: 50px;
      margin-bottom: 20px;
    }

    &__inputs {
      width: 100%;
      display: flex;
      gap: 10px;

      input {
        width: 20%;
        text-align: center;
      }
    }
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