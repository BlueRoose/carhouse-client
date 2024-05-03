<template>
  <div v-if="allBuyRequests.length" class="buy-requests">
    <div class="buy-requests__requests">
      <BuyRequestCard
        v-for="buyRequest, index in allBuyRequests"
        :key="index"
        :buyRequest="buyRequest"
        :selected="buyRequest.id === selectedBuyRequestId"
        @click="selectBuyRequest(buyRequest.id)"
      />
    </div>
    <div v-if="selectedBuyRequest" class="buy-requests__actions">
      <p class="buy-requests__actions-title">Change status</p>
      <div class="buy-requests__actions__statuses">
        <div class="buy-requests__actions__statuses__current">
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
      <p class="buy-requests__actions-title">Delete request</p>
      <Button :isLoading="isLoading.delete" @click="deleteRequest">Delete</Button>
    </div>
  </div>
  <div v-else class="no-requests">
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

<style lang="scss">
.buy-requests {
  height: 100%;
  padding: 20px;
  background-color: $color-dark;
  display: flex;
  overflow: hidden;

  &__requests {
    width: 60%;
    padding-right: 20px;
    overflow: auto;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  &__actions {
    width: 40%;
    display: flex;
    flex-direction: column;
    align-items: center;

    &-title {
      font-size: 24px;
      color: $color-white;
      margin-bottom: 20px;
    }

    &__statuses {
      font-size: 18px;
      color: $color-white;
      display: flex;
      align-items: flex-end;
      gap: 60px;
      margin-bottom: 20px;

      &__current {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }

      .select {
        .select-label {
          font-size: 18px;
          color: $color-white;
        }
      }
    }

    button {
      margin-bottom: 50px;
    }
  }
}

.no-requests {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 28px;
  color: $color-white;
}
</style>