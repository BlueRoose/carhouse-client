<template>
  <div v-if="isLoading" class="w-screen h-screen bg-main-dark relative">
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <Logo />
      <span class="main-loader"></span>
    </div>
  </div>
  <NuxtLayout v-else class="layouts">
    <NuxtPage />
  </NuxtLayout>
  <Modals />
  <Transition name="fade">
    <el-alert
      v-if="successMessage"
      :title="successMessage"
      type="success"
      show-icon
    />
  </Transition>
  <Transition name="fade">
    <el-alert
      v-if="errorMessage"
      :title="errorMessage"
      type="error"
      show-icon
    />
  </Transition>
</template>

<script setup>
import api from "@/api";
import { useAuthStore } from "@/store/auth.js";
import { useModalsStore } from "@/store/modals.js";
import { useNotificationsStore } from "@/store/notifications.js";

useHead({
  link: [
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    { rel: "preconnect", href: "https://fonts.gstatic.com" },
    { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" }
  ]
});

const router = useRouter();
const route = useRoute();

const authStore = useAuthStore();
const modalsStore = useModalsStore();
const notificationsStore = useNotificationsStore();

const { successMessage, errorMessage } = storeToRefs(notificationsStore);

const isLoading = ref(true);

onMounted(async () => {
  try {
    if (process.client) {
      const data = await api.getUser();

      if (data.user) {
        authStore.setIsAuth(data.user);
      }
    }
  } catch (e) {
    console.error(e);
  } finally {
    isLoading.value = false;
  }

  if (route.query.isAborted) {
    router.push({ query: {} });
    modalsStore.toggleIsModal();
    modalsStore.showAuthModal();
  }
});
</script>

<style lang="scss">
@import url("~/assets/styles/main.scss");

.nuxt-loader {
  width: 100vw;
  height: 100vh;
  background-size: 100%;
  background-image: url('/images/bmw.gif');
  background-repeat: no-repeat;
}

.el-alert {
  width: 40%;
  position: fixed;
  z-index: 9999;
  top: 5%;
  left: 50%;
  transform: translateX(-50%);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.main-loader {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: block;
  margin: 15px auto;
  position: relative;
  color: #FFF;
  box-sizing: border-box;
  animation: animloader 2s linear infinite;
}

@keyframes animloader {
  0% {
    box-shadow: 14px 0 0 -2px,  38px 0 0 -2px,  -14px 0 0 -2px,  -38px 0 0 -2px;
  }
  25% {
    box-shadow: 14px 0 0 -2px,  38px 0 0 -2px,  -14px 0 0 -2px,  -38px 0 0 2px;
  }
  50% {
    box-shadow: 14px 0 0 -2px,  38px 0 0 -2px,  -14px 0 0 2px,  -38px 0 0 -2px;
  }
  75% {
    box-shadow: 14px 0 0 2px,  38px 0 0 -2px,  -14px 0 0 -2px,  -38px 0 0 -2px;
  }
  100% {
    box-shadow: 14px 0 0 -2px,  38px 0 0 2px,  -14px 0 0 -2px,  -38px 0 0 -2px;
  }
}
</style>
