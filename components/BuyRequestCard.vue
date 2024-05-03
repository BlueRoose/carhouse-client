<template>
  <div class="buy-request-card" :class="{ 'selected': selected }">
    <img
      class="buy-request-card-image"
      :src="buyRequest.car.imgs[0]"
      alt="ordered car"
    />
    <div class="buy-request-card__info">
      <p class="buy-request-card__info-name">{{ carName }}</p>
      <p class="buy-request-card__info-client">
        Client: {{ userName }}(<a :href="`tel:${buyRequest.phone}`">{{ buyRequest.phone }}</a>)
      </p>
      <p class="buy-request-card__info-price">Price: ${{ buyRequest.car.price }}</p>
      <p class="buy-request-card__info-status">
        Order's status:
        <span :class="`${buyRequest.status.toLowerCase()}`">
          {{ buyRequest.status }}
        </span>
      </p>
    </div>
    <p class="buy-request-card-date">Ordered {{ orderDate }}</p>
  </div>
</template>

<script setup>
const props = defineProps({
  buyRequest: {
    type: Object,
    default() {
      return {};
    },
  },
  selected: Boolean,
});

const carName = computed(() => `Order id: ${props.buyRequest.id}. ${props.buyRequest.car.brand} ${props.buyRequest.car.name}`);

const orderDate = computed(() => props.buyRequest.createdAt.split("T")[0].split("-").reverse().join("."));

const userName = computed(() => `${props.buyRequest.user.name} ${props.buyRequest.user.surname}`);
</script>

<style lang="scss" scoped>
.buy-request-card {
  width: 100%;
  background-color: #f1f1f1;
  padding: 15px 10px;
  box-shadow: 0px 4px 39.79999923706055px 0px #00000040;
  border-radius: 25px;
  box-sizing: border-box;
  display: flex;
  gap: 25px;
  position: relative;
  cursor: pointer;

  &.selected {
    border: 5px solid $color-yellow;
  }

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

    &-client {
      font-size: 24px;
      font-weight: 500;
    }

    &-price {
      font-size: 24px;
      font-weight: 500;
      margin-bottom: 25px;
    }

    &-status {
      font-size: 24px;
      font-weight: 500;

      span {

        &.pending {
          border-bottom: 2px solid rgb(151, 150, 150);
        }

        &.canceled {
          border-bottom: 2px solid red;
        }

        &.completed {
          border-bottom: 2px solid greenyellow;
        }

        &.in-progress {
          border-bottom: 2px solid orange;
        }
      }
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