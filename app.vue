<template>
  <Transition name="fade">
    <div v-if="isLoading" class="nuxt-loader"></div>
    <div v-else>
      <ClientOnly>
        <Header />
      </ClientOnly>
      <NuxtPage />
      <QuestionBlock />
      <Footer />
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
    </div>
  </Transition>
</template>

<script setup>
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

const isLoading = ref(false);
setTimeout(() => isLoading.value = false, 4000);

onMounted(async () => {
  if (process.client) {
    const userData = JSON.parse(localStorage.getItem("user"));

    if (userData) {
      authStore.setIsAuth(userData);
    }
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
</style>
