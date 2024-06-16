<template>
  <div class="bg-white pb-20 max-md:pb-10">
    <PageInfo
      subtitle="F a v o u r i t e s"
      title="Your favourited cars on one page"
      description="Track the price of the cars you like and order when you're ready!"
    />
    <div class="relative container mx-auto px-4">
      <div v-if="!isLoading" class="my-20 max-md:my-10">
        <p class="text-black text-3xl max-md:text-2xl font-semibold self-start">
          Favourited cars: {{ favouritedCars.length }}
        </p>
      </div>
      <Loader v-if="isLoading" />
      <template v-else>
        <div v-if="favouritedCars.length" class="grid grid-cols-3 max-lg:grid-cols-2 max-md:flex flex-col gap-x-14 gap-y-24 mb-20 ">
          <CollectionCard
            v-for="(car, index) in favouritedCars"
            :key="index"
            :car="car"
          />
        </div>
        <h1 class="text-4xl font-bold text-center mt-52 mb-24" v-else>You don't have any favourited cars</h1>
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
