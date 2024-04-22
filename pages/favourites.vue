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
          25 favourited cars
        </p>
      </div>
      <Loader v-if="isLoading" />
      <div v-else class="collections__content__cards">
        <CollectionCard
          v-for="car, index in favouritedCars"
          :key="index"
          :car="car"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCarsStore } from "@/store/cars.js";

const router = useRouter();
const route = useRoute();

const carsStore = useCarsStore();

const { favouritedCars } = storeToRefs(carsStore);

const isLoading = ref(true);
const error = ref("");

onMounted(async () => {
  try {
    await getFavouritedCars();
  } catch (e) {
    error.value = e;
    setTimeout(() => error.value = "", 1000);
  } finally {
    isLoading.value = false;
  }
});

async function getFavouritedCars() {
  try {
    isLoading.value = true;
    await carsStore.getFavouritedCars();
  } catch (e) {
    error.value = e;
    setTimeout(() => error.value = "", 1000);
  } finally {
    isLoading.value = false;
  }
}
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
  }
}
</style>