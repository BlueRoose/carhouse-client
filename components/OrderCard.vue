<template>
  <div class="w-full py-4 px-2.5 shadow-[0_4px_39.79999923706055px_0_#00000040] rounded-3xl flex max-sm:flex-col gap-6 relative">
    <img
      class="max-w-[30%] max-sm:max-w-full object-cover rounded-3xl max-sm:mt-5"
      :src="userBuyRequest.car.imgs[0]"
      alt="ordered car"
    />
    <div class="flex flex-col">
      <p class="max-md:text-sm">Order id: {{ props.userBuyRequest.id }}.</p>
      <p class="text-3xl max-md:text-2xl font-semibold">{{ carName }}</p>
      <p class="text-2xl max-md:text-xl font-medium mb-6 max-md:mb-3">Price: ${{ userBuyRequest.car.price }}</p>
      <p class="text-2xl max-md:text-xl font-medium mb-2">
        Order's status:
        <span :class="`${userBuyRequest.status.toLowerCase()}`">
          {{ userBuyRequest.status }}
        </span>
      </p>
      <div class="mt-auto flex max-s:flex-col gap-4 max-s:gap-2">
        <NuxtLink class="w-fit" :to="{ name: 'car-id', params: { id: userBuyRequest.car.id } }">
          <Button>Visit car page</Button>
        </NuxtLink>
        <Button
          v-if="canBeCancelled"
          :isLoading="isLoading"
          @click="cancelRequest"
        >
          Cancel order
        </Button>
      </div>
    </div>
    <p class="opacity-80 font-medium absolute right-4 top-2.5">Ordered {{ orderDate }}</p>
  </div>
</template>

<script setup>
import { useBuyRequestsStore } from "@/store/buyRequests.js";
import { useNotificationsStore } from "@/store/notifications.js";
import api from "@/api";

const buyRequestsStore = useBuyRequestsStore();
const notificationsStore = useNotificationsStore();

const { successMessage, errorMessage } = storeToRefs(notificationsStore);

const props = defineProps({
  userBuyRequest: {
    type: Object,
    default() {
      return {};
    },
  },
});

const isLoading = ref(false);

const carName = computed(() => `${props.userBuyRequest.car.brand} ${props.userBuyRequest.car.name}`);

const orderDate = computed(() => props.userBuyRequest.createdAt.split("T")[0].split("-").reverse().join("."));

const canBeCancelled = computed(() => props.userBuyRequest.status === "PENDING");

async function cancelRequest() {
  isLoading.value = true;
  try {
    await api.cancelUserBuyRequest(props.userBuyRequest.id);
    await buyRequestsStore.getUserBuyRequests();
    successMessage.value = "Request cancelled successfully";
    setTimeout(() => successMessage.value = "", 2000);
  } catch (e) {
    errorMessage.value = e;
    setTimeout(() => errorMessage.value = "", 2000);
  } finally {
    isLoading.value = false;
  }
}
</script>

<style lang="scss" scoped>
.pending {
  border-bottom: 2px solid rgb(151, 150, 150);
}

.canceled {
  border-bottom: 2px solid red;
}

.completed {
  border-bottom: 2px solid greenyellow;
}

.in-progress {
  border-bottom: 2px solid orange;
}
</style>