<template>
  <div class="orders">
    <PageInfo
      subtitle="O R D E R S"
      title="All your orders on one page"
      description="Check statuses of your orders and keep abreast of changes"
    />
    <div class="orders__content container">
      <div v-if="!isLoading" class="orders__content__info">
        <p class="orders__content__info-showed">
          Orders: {{ userBuyRequests.length }}
        </p>
      </div>
      <Loader v-if="isLoading" />
      <div v-else class="orders__content__cards">
        <OrderCard
          v-for="userBuyRequest, index in userBuyRequests"
          :key="index"
          :userBuyRequest="userBuyRequest"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useBuyRequestsStore } from "@/store/buyRequests.js";

const buyRequestsStore = useBuyRequestsStore();

const { userBuyRequests } = storeToRefs(buyRequestsStore);

const isLoading = ref(true);
const error = ref("");

onMounted(async () => {
  try {
    await getUserBuyRequests();
  } catch (e) {
    error.value = e;
    setTimeout(() => error.value = "", 1000);
  } finally {
    isLoading.value = false;
  }
});

async function getUserBuyRequests() {
  try {
    isLoading.value = true;
    await buyRequestsStore.getUserBuyRequests();
  } catch (e) {
    error.value = e;
    setTimeout(() => error.value = "", 1000);
  } finally {
    isLoading.value = false;
  }
}
</script>

<style lang="scss" scoped>
.orders {
  background-color: $color-white;
  padding-bottom: 80px;

  &__content {
    position: relative;

    &__info {
      margin-top: 80px;
      margin-bottom: 80px;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      justify-content: space-between;

      &-showed {
        font-size: 30px;
        font-weight: 600;
        color: $color-black;
        justify-self: flex-start;
      }
    }

    &__cards {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
  }
}
</style>