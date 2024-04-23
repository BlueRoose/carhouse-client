<template>
  <div class="order-card">
    <img
      class="order-card-image"
      :src="userBuyRequest.car.imgs[0]"
      alt="ordered car"
    />
    <div class="order-card__info">
      <p class="order-card__info-name">{{ carName }}</p>
      <p class="order-card__info-price">Price: ${{ userBuyRequest.car.price }}</p>
      <p class="order-card__info-status">Order's status: WAITING</p>
      <div class="order-card__info__controls">
        <NuxtLink :to="{ name: 'car-id', params: { id: userBuyRequest.car.id } }">
          <Button class="order-card__info__controls-cancel">Visit car page</Button>
        </NuxtLink>
        <Button class="order-card__info__controls-cancel" @click="cancelRequest">Cancel order</Button>
      </div>
    </div>
    <p class="order-card-date">Ordered {{ orderDate }}</p>
  </div>
</template>

<script setup>
import { useBuyRequestsStore } from "@/store/buyRequests.js";
import api from "@/api";

const buyRequestsStore = useBuyRequestsStore();

const props = defineProps({
  userBuyRequest: {
    type: Object,
    default() {
      return {};
    },
  },
});

const error = ref("");

const carName = computed(() => `${props.userBuyRequest.id}. ${props.userBuyRequest.car.brand} ${props.userBuyRequest.car.name}`);

const orderDate = computed(() => props.userBuyRequest.createdAt.split("T")[0].split("-").reverse().join("."));

async function cancelRequest() {
  try {
    await api.cancelUserBuyRequest(props.userBuyRequest.id);
    await buyRequestsStore.getUserBuyRequests();
  } catch (e) {
    error.value = e;
    setTimeout(() => error.value = "", 1000);
  }
}
</script>

<style lang="scss" scoped>
.order-card {
  width: 100%;
  padding: 15px 10px;
  box-shadow: 0px 4px 39.79999923706055px 0px #00000040;
  border-radius: 25px;
  box-sizing: border-box;
  display: flex;
  gap: 25px;
  position: relative;

  &-image {
    max-width: 30%;
    border-radius: 25px;
  }

  &__info {
    display: flex;
    flex-direction: column;

    &-name {
      font-size: 28px;
      font-weight: 600;
    }

    &-price {
      font-size: 24px;
      font-weight: 500;
      margin-bottom: 25px;
    }

    &-status {
      font-size: 24px;
      font-weight: 500;
    }

    &__controls {
      margin-top: auto;
      display: flex;
      gap: 15px;
    }
  }

  &-date {
    font-size: 16px;
    opacity: 80%;
    font-weight: 500;
    position:absolute;
    right: 15px;
    top: 10px;
  }
}
</style>