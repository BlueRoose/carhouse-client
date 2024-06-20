<template>
  <div class="bg-white py-28 max-md:py-20">
    <Loader v-if="isLoading" />
    <div v-else class="container mx-auto px-4">
      <p class="text-main-yellow font-medium mb-6 max-md:mb-0 max-sm:text-sm">
        <NuxtLink to="/collections">Collections > </NuxtLink>
        {{ selectedCar.brand }}  {{ selectedCar.name }}
      </p>
      <div class="flex gap-24 max-lg:flex-col-reverse max-lg:gap-5">
        <div class="w-3/5 max-lg:w-full images-swiper">
          <Swiper
            :slidesPerView="1"
            :space-between="0"
            :modules="[Navigation]"
            :breakpoints="{
              768: {
                slidesPerView: 1.4,
                spaceBetween: 20,
              },
            }"
            centeredSlides
            navigation
            loop
          >
            <SwiperSlide v-for="(item, index) in carImages" :key="index">
              <img
                class="w-full h-full object-cover rounded-t"
                :src="item"
                alt="car"
              />
            </SwiperSlide>
          </Swiper>
        </div>
        <div class="py-12 max-md:py-6 flex flex-col gap-5 max-md:gap-2">
          <div class="text-dark text-3xl max-sm:text-2xl text-semibold">
            <p class="text-main-yellow text-lg max-sm:text-base">{{ selectedCar.type }}</p>
            <p>{{ carName }}</p>
          </div>
          <p class="max-w-[550px] text-lg opacity-70">{{ selectedCar.description }}</p>
          <p class="text-2xl font-semibold">$ {{ selectedCar.price }}</p>
          <div class="mt-auto flex items-center gap-4">
            <Button
              v-if="isAuth"
              :disabled="isOrdered"
              @click="orderCar"
            >
              {{ buttonLabel }}
            </Button>
            <Button v-else @click="orderCar">Order</Button>
            <img
              v-if="isAuth && !isFavourited"
              class="w-8 h-8 cursor-pointer"
              src="/icons/bookmark.svg"
              alt="support"
              @click="addToFavouritedCars"
            />
            <img
              v-if="isAuth && isFavourited"
              class="w-8 h-8 cursor-pointer"
              src="/icons/bookmark-filled.svg"
              alt="support"
              @click="removeFromFavouritedCars"
            />
          </div>
        </div>
      </div>
      <div class="w-4/5 max-lg:w-full mx-auto h-[800px] max-md:h-fit p-9 max-sm:p-4 mt-20 shadow-[0_4px_39.79999923706055px_0_#00000040] rounded-3xl grid grid-cols-2 gap-5">
        <div class="h-full flex flex-col justify-between max-md:gap-10 max-md:[&>p]:h-[56px] [&>p]:flex [&>p]:justify-center [&>p]:items-center [&>p]:text-3xl max-lg:[&>p]:text-2xl max-sm:[&>p]:text-xl [&>p]:text-center">
          <p>Production year</p>
          <p>Color</p>
          <p>Transmission</p>
          <p>Passengers</p>
          <p>Top speed</p>
          <p>Horse power</p>
          <p>Time to 100 km/h</p>
        </div>
        <div class="h-full flex flex-col justify-between max-md:gap-10 max-md:[&>p]:h-[56px] [&>p]:flex [&>p]:justify-center [&>p]:items-center [&>p]:text-3xl max-lg:[&>p]:text-2xl max-sm:[&>p]:text-xl [&>p]:text-center">
          <p>{{ selectedCar.year }}</p>
          <p>{{ selectedCar.color }}</p>
          <p>{{ selectedCar.transmission }}</p>
          <p>{{ selectedCar.passenger }}</p>
          <p>{{ selectedCar.topSpeed }}</p>
          <p>{{ selectedCar.horsePower }}</p>
          <p>{{ selectedCar.time }}</p>
        </div>
      </div>
      <div v-if="anotherCars.length">
        <p class="text-4xl font-medium mb-12 mt-8">You may also like:</p>
        <div class="grid grid-cols-4 max-xl:flex flex-col gap-4">
          <div
            v-for="(car, index) in anotherCars"
            :key="index"
            class="w-full border-[2px] border-main-yellow rounded-3xl cursor-pointer transition-transform ease-linear hover:-translate-y-6"
          >
            <NuxtLink :to="`/car/${car.id}`">
              <img
                class="w-full rounded-t-3xl mb-5"
                :src="car.imgs[0]"
                :alt="car.name"
              />
              <p class="text-sm opacity-80 px-2">{{ car.type }}</p>
              <p class="text-xl font-medium pb-5 px-2">{{ car.brand }}  {{ car.name }}</p>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation } from "swiper/modules";
import "swiper/swiper-bundle.css";
import { useAuthStore } from "@/store/auth.js";
import { useCarsStore } from "@/store/cars.js";
import { useModalsStore } from "@/store/modals.js";
import { useNotificationsStore } from "@/store/notifications.js";
import api from "@/api";

const route = useRoute();

const authStore = useAuthStore();
const carsStore = useCarsStore();
const modalsStore = useModalsStore();
const notificationsStore = useNotificationsStore();

const { isAuth } = storeToRefs(authStore);
const { cars, favouritedCars, selectedCar } = storeToRefs(carsStore);
const { successMessage, errorMessage } = storeToRefs(notificationsStore);

const isLoading = ref(true);
const isOrdered = ref(false);
const selectedImage = ref(null);
const anotherCars = ref([]);

const carName = computed(() => `${selectedCar.value.brand}  ${selectedCar.value.name}`);

const isFavourited = computed(() => favouritedCars.value.some(car => car.id === selectedCar.value.id));

const buttonLabel = computed(() => isOrdered.value ? "Ordered" : "Order");

const carImages = computed(() => [...selectedCar.value.imgs, ...selectedCar.value.imgs]);

onMounted(async () => {
  try {
    await carsStore.getCar(route.params.id);
    if (isAuth.value) {
      await carsStore.getFavouritedCars();
      const response = await api.checkCar(route.params.id);
      isOrdered.value = response.success;
    }
    await carsStore.getCars();
    getAnotherCars();
    selectedImage.value = selectedCar.value.imgs[0];
  } catch (e) {
    errorMessage.value = e;
    setTimeout(() => errorMessage.value = "", 2000);
  } finally {
    isLoading.value = false;
  }
});

function getAnotherCars() {
  const filteredCars = cars.value.filter(car => car.id !== selectedCar.value.id);
  const result = [];
  const count = filteredCars.length > 4 ? 4 : filteredCars.length;

  while (result.length < count) {
    const randomIndex = Math.floor(Math.random() * (filteredCars.length - 1 - 0 + 1)) + 0;
    const randomCar = filteredCars[randomIndex];
    if (!result.includes(randomCar)) {
      result.push(randomCar);
    }
  }

  anotherCars.value = result;
}

function orderCar() {
  modalsStore.toggleIsModal();
  if (isAuth.value) {
    modalsStore.showOrderModal();
  } else {
    modalsStore.showAuthModal();
  }
}

async function addToFavouritedCars() {
  try {
    await carsStore.addToFavouritedCars(selectedCar.value.id);
    successMessage.value = "You have successfully added this car to your favourites";
    setTimeout(() => successMessage.value = "", 2000);
  } catch (e) {
    errorMessage.value = e;
    setTimeout(() => errorMessage.value = "", 2000);
  }
}

async function removeFromFavouritedCars() {
  try {
    await carsStore.removeFromFavouritedCars(selectedCar.value.id);
    successMessage.value = "You have successfully removed this car from your favourites";
    setTimeout(() => successMessage.value = "", 2000);
  } catch (e) {
    errorMessage.value = e;
    setTimeout(() => errorMessage.value = "", 2000);
  }
}
</script>

<style lang="scss">
.images-swiper {
  display: flex;
  gap: 100px;

  .swiper {
    width: 100%;
    padding: 10px 20px;
    box-sizing: border-box;
    align-items: center;
    transition: height 0.5s linear;

    .swiper-wrapper {
      align-items: center !important;

      .swiper-slide {
        width: 70% !important;
        height: 360px !important;

        @media screen and (max-width: 768px) {
          width: 100% !important;
        }
      }

      .swiper-slide-prev {
        height: 280px !important;
      }

      .swiper-slide-next {
        height: 280px  !important;
      }
    }

    .swiper-button-prev {
      color: $color-yellow;
      top: 100% !important;
      transform: translateY(-50%);
    }

    .swiper-button-next {
      color: $color-yellow;
      top: 100% !important;
      transform: translateY(-50%);
    }
  }
}

@media screen and (max-width: 768px) {
  .images-swiper {
    .swiper {
      .swiper-wrapper {
        .swiper-slide {
          width: 100% !important;
        }
      }
    }
  }
}
</style>
