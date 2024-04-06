<template>
  <div v-if="isModal" class="modals">
    <div class="modals-wrapper">
      <ModalsAuthModal v-if="isAuthModal" />
    </div>
    <div class="modals-dark" @click="closeModal"></div>
  </div>
</template>

<script setup>
import { useModalsStore } from "@/store/modals.js";

const modalsStore = useModalsStore();

const { isModal, isAuthModal } = storeToRefs(modalsStore);

function closeModal() {
  modalsStore.toggleModal();
  modalsStore.toggleAuthModal();
}
</script>

<style lang="scss" scoped>
.modals {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;

  &-wrapper {
    width: fit-content;
    height: fit-content;
    margin: 0 auto;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    z-index: 3;
  }

  &-dark {
    width: 100%;
    height: 100%;
    background-color: $color-black;
    opacity: 50%;
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>