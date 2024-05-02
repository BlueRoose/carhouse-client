<template>
  <div class="collections">
    <PageInfo
      subtitle="F a v o u r i t e s"
      title="Your favourited cars on one page"
      description="Track the price of the cars you like and order when you're ready!"
    />
    <div class="collections__content container">
      <div v-if="!isLoading" class="collections__content__info">
        <p class="collections__content__info-showed">
          Favourited cars: {{ favouritedCars.length }}
        </p>
      </div>
      <Loader v-if="isLoading" />
      <template v-else>
        <div v-if="favouritedCars.length" class="collections__content__cards">
          <CollectionCard
            v-for="car, index in favouritedCars"
            :key="index"
            :car="car"
          />
        </div>
        <h1 class="collections__content-no-cars" v-else>You don't have any favourited cars</h1>
      </template>
    </div>
  </div>
</template>

<script setup>
import { useCarsStore } from "@/store/cars.js";
import { useNotificationsStore } from "@/store/notifications.js";

const carsStore = useCarsStore();
const notificationsStore = useNotificationsStore();

const { favouritedCars } = storeToRefs(carsStore);
const { successMessage, errorMessage } = storeToRefs(notificationsStore);

const isLoading = ref(true);

onMounted(async () => {
  await getFavouritedCars();
});

async function getFavouritedCars() {
  try {
    isLoading.value = true;
    await carsStore.getFavouritedCars();
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

<style lang="scss" scoped>
.collections {
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
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-column-gap: 54px;
      grid-row-gap: 94px;
    }

    &-no-cars {
      text-align: center;
      margin: 200px 0 100px;
    }
  }
}
</style>