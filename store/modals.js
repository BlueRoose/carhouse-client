export const useModalsStore = defineStore("modalsStore", () => {
  const isModal = ref(false);
  const isAuthModal = ref(false);

  function toggleModal() {
    isModal.value = !isModal.value;
  }

  function toggleAuthModal() {
    isAuthModal.value = !isAuthModal.value;
  }

  return {
    isModal,
    isAuthModal,
    toggleModal,
    toggleAuthModal
  };
});
