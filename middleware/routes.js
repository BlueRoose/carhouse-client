export default defineNuxtRouteMiddleware((to) => {
  const token = useCookie("token").value;

  if ((to.path === "/favourites" || to.path === "/orders") && !token) {
    abortNavigation();
    return navigateTo("/?isAborted=true");
  }
});