<template>
  <div v-if="isModal" class="w-full h-full fixed top-0 left-0 z-20">
    <div class="w-fit h-fit mx-auto relative top-1/2 -translate-y-1/2 z-[3] px-4">
      <ModalsAuthModal v-if="isAuthModal" />
      <ModalsOrderModal v-if="isOrderModal" />
    </div>
    <div class="w-full h-full bg-black opacity-50 absolute top-0 left-0" @click="closeModal"></div>
  </div>
</template>

<script setup>
import { useModalsStore } from "@/store/modals.js";

const modalsStore = useModalsStore();

const { isModal, isAuthModal, isOrderModal } = storeToRefs(modalsStore);

function closeModal() {
  modalsStore.toggleIsModal();
  modalsStore.hideAuthModal();
  modalsStore.hideOrderModal();
}
</script>
