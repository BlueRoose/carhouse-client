<template>
  <div v-if="allBuyRequests.length" class="requests">
    <div class="requests__requests">
      <BuyRequestCard
        v-for="buyRequest, index in allBuyRequests"
        :key="index"
        :buyRequest="buyRequest"
        :selected="buyRequest.id === selectedBuyRequestId"
        @click="selectBuyRequest(buyRequest.id)"
      />
    </div>
    <div v-if="selectedBuyRequest" class="requests__actions">
      <p class="requests__actions-title">Change status</p>
      <div class="requests__actions__statuses">
        <div class="requests__actions__statuses__current">
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
      <p class="requests__actions-title">Delete request</p>
      <Button :isLoading="isLoading.delete" @click="deleteRequest">Delete</Button>
    </div>
  </div>
  <div v-else class="no-requests">
    <h2>No buy requests were found</h2>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "admin",
});
</script>

<style lang="scss">
.cars {
  background-color: $color-dark;
}
</style>