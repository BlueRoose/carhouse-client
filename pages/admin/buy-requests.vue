<template>
  <div v-if="allBuyRequests.length" class="h-full p-5 bg-main-dark flex overflow-hidden container max-w-[1440px] mx-auto px-4">
    <div class="w-[60%] pr-5 overflow-auto flex flex-col gap-5">
      <BuyRequestCard
        v-for="(buyRequest, index) in allBuyRequests"
        :key="index"
        :buyRequest="buyRequest"
        :selected="buyRequest.id === selectedBuyRequestId"
        @click="selectBuyRequest(buyRequest.id)"
      />
    </div>
    <div v-if="selectedBuyRequest" class="w-[40%] flex flex-col items-center">
      <p class="text-white text-2xl mb-5">Change status</p>
      <div class="text-white text-lg flex items-end gap-20 mb-5">
        <div class="h-full flex flex-col justify-between">
          <p>Current status:</p>
          <p>{{ selectedBuyRequest.status }}</p>
        </div>
        <CustomSelect
          v-model="newStatus"
          label="New status:"
          :options="availableStatuses"
        />
      </div>
      <Button
        :isLoading="isLoading.update"
        :disabled="!newStatus"
        @click="changeStatus"
      >
        Change
      </Button>
      <p class="text-white text-2xl mb-5">Delete request</p>
      <Button :isLoading="isLoading.delete" @click="deleteRequest">Delete</Button>
    </div>
  </div>
  <div v-else class="w-fit h-fit fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl text-white">
    <h2>No buy requests were found</h2>
  </div>
</template>

<script setup>
import { useBuyRequestsStore } from "@/store/buyRequests.js";
import { useNotificationsStore } from "@/store/notifications.js";
import api from "@/api";

const buyRequestsStore = useBuyRequestsStore();
const notificationsStore = useNotificationsStore();

const { allBuyRequests } = storeToRefs(buyRequestsStore);
const { successMessage, errorMessage } = storeToRefs(notificationsStore);

const statuses = [
  {
    name: "PENDING",
  },
  {
    name: "WAITING FOR INSPECTION",
  },
  {
    name: "WAITING FOR PAYMENT",
  },
  {
    name: "APPROVED",
  },
  {
    name: "CANCELLED",
  },
];

const isLoading = reactive({
  update: false,
  delete: false,
});
const newStatus = ref("");
const selectedBuyRequestId = ref(null);

const selectedBuyRequest = computed(() => allBuyRequests.value.find(buyRequest => buyRequest.id === selectedBuyRequestId.value));

const availableStatuses = computed(() => statuses.filter(status => status.name !== selectedBuyRequest.value.status));

onMounted(async () => {
  try {
    await buyRequestsStore.getAllBuyRequests();
  } catch (e) {
    errorMessage.value = e;
    setTimeout(() => errorMessage.value = "", 2000);
  }
});

function selectBuyRequest(id) {
  if (selectedBuyRequest.value === id) {
    selectedBuyRequestId.value = null;
  } else {
    selectedBuyRequestId.value = id;
  }
}

async function changeStatus() {
  isLoading.update = true;
  try {
    await api.updateBuyRequest(selectedBuyRequestId.value, newStatus.value);
    allBuyRequests.value.find(request => request.id = selectedBuyRequestId.value).status = newStatus.value;
    newStatus.value = "";
  } catch (e) {
    errorMessage.value = e;
    setTimeout(() => errorMessage.value = "", 2000);
  } finally {
    isLoading.update = false;
  }
}

async function deleteRequest() {
  isLoading.delete = true;
  try {
    await api.deleteBuyRequest(selectedBuyRequestId.value);
    allBuyRequests.value = allBuyRequests.value.filter(request => request.id !== selectedBuyRequestId.value);
    selectedBuyRequest.value = null;
  } catch (e) {
    errorMessage.value = e;
    setTimeout(() => errorMessage.value = "", 2000);
  } finally {
    isLoading.delete = false;
  }
}

definePageMeta({
  layout: "admin",
});
</script>
