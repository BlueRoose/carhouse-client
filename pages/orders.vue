<template>
  <div class="bg-white pb-20">
    <PageInfo
      subtitle="O R D E R S"
      title="All your orders on one page"
      description="Check statuses of your orders and keep abreast of changes"
    />
    <div class="relative container mx-auto px-4">
      <div v-if="!isLoading" class="my-20 max-lg:my-10 grid grid-cols-2 justify-between">
        <p class="text-black text-3xl font-semibold self-start">
          Orders: {{ userBuyRequests.length }}
        </p>
      </div>
      <Loader v-if="isLoading" />
      <template v-else>
        <div v-if="userBuyRequests.length" class="flex flex-col gap-5">
          <OrderCard
            v-for="(userBuyRequest, index) in userBuyRequests"
            :key="index"
            :userBuyRequest="userBuyRequest"
          />
        </div>
        <h1 v-else class="text-4xl font-bold text-center mt-48 mb-24">You don't have any orders, but you can fix it!</h1>
      </template>
    </div>
  </div>
</template>

<script setup>
import { useBuyRequestsStore } from "@/store/buyRequests.js";
import { useNotificationsStore } from "@/store/notifications.js";

const buyRequestsStore = useBuyRequestsStore();
const notificationsStore = useNotificationsStore();

const { userBuyRequests } = storeToRefs(buyRequestsStore);
const { successMessage, errorMessage } = storeToRefs(notificationsStore);

const isLoading = ref(true);

onMounted(async () => {
  try {
    await getUserBuyRequests();
  } catch (e) {
    errorMessage.value = e;
    setTimeout(() => errorMessage.value = "", 2000);
  } finally {
    isLoading.value = false;
  }
});

async function getUserBuyRequests() {
  try {
    isLoading.value = true;
    await buyRequestsStore.getUserBuyRequests();
  } catch (e) {
    errorMessage.value = e;
    setTimeout(() => errorMessage.value = "", 2000);
  } finally {
    isLoading.value = false;
  }
}

definePageMeta({
  middleware: "routes",
});
</script>
