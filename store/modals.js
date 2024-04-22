export const useModalsStore = defineStore("modalsStore", () => {
  const isModal = ref(false);
  const isAuthModal = ref(false);
  const isOrderModal = ref(false);

  function toggleIsModal() {
    isModal.value = !isModal.value;
  }

  function showAuthModal() {
    isAuthModal.value = true;
  }

  function hideAuthModal() {
    isAuthModal.value = false;
  }

  function showOrderModal() {
    isOrderModal.value = true;
  }

  function hideOrderModal() {
    isOrderModal.value = false;
  }

  return {
    isModal,
    isAuthModal,
    isOrderModal,
    toggleIsModal,
    showAuthModal,
    hideAuthModal,
    showOrderModal,
    hideOrderModal,
  };
});
