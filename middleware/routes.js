import { useAuthStore } from "@/store/auth";

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();

  const { isAuth } = storeToRefs(authStore);

  if ((to.path === "/favourites" || to.path === "/orders") && !isAuth.value) {
    abortNavigation();
    return navigateTo("/?isAborted=true");
  }
});