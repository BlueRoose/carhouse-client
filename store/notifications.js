export const useNotificationsStore = defineStore("notificationsStore", () => {
  const successMessage = ref("");
  const errorMessage = ref("");

  return {
    successMessage,
    errorMessage,
  };
});
