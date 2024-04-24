<template>
  <div class="car">
    <Loader v-if="isLoading" />
    <div v-else class="car__content">
      <p class="car__content-back"><NuxtLink to="/collections">Collections > </NuxtLink>{{ selectedCar.brand }}  {{ selectedCar.name }}</p>
      <div class="car__content__info">
        <div class="car__content__info__images">
          <Swiper
            :slidesPerView="1.5"
            :space-between="20"
            :modules="[Navigation]"
            centeredSlides
            navigation
            loop
          >
            <SwiperSlide v-for="item, index in carImages" :key="index">
              <div class="slide">
                <img
                  class="slide-image"
                  :src="item"
                  alt="car"
                />
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
        <div class="car__content__info__order">
          <div class="car__content__info__order-name">
            <p class="small">{{ selectedCar.type }}</p>
            <p>{{ carName }}</p>
          </div>
          <p class="car__content__info__order-description">{{ selectedCar.description }}</p>
          <p class="car__content__info__order-price">$ {{ selectedCar.price }}</p>
          <div class="car__content__info__order__controls">
            <Button @click="orderCar">Order</Button>
            <img
              v-if="isAuth && !isFavourited"
              class="icon"
              src="/icons/bookmark.svg"
              alt="support"
              @click="addToFavouritedCars"
            />
            <img
              v-if="isAuth && isFavourited"
              class="icon"
              src="/icons/bookmark-filled.svg"
              alt="support"
              @click="removeFromFavouritedCars"
            />
          </div>
        </div>
      </div>
      <div class="car__content__main">
        <div class="car__content__main__column-titles">
          <p>Production year</p>
          <p>Color</p>
          <p>Transmission</p>
          <p>Passengers</p>
          <p>Top speed</p>
          <p>Horse power</p>
          <p>Time to 100 km/h</p>
          <p>Rating</p>
        </div>
        <div class="car__content__main__column-values">
          <p>{{ selectedCar.year }}</p>
          <p>{{ selectedCar.color }}</p>
          <p>{{ selectedCar.transmission }}</p>
          <p>{{ selectedCar.passenger }}</p>
          <p>{{ selectedCar.topSpeed }}</p>
          <p>{{ selectedCar.horsePower }}</p>
          <p>{{ selectedCar.time }}</p>
          <p>{{ selectedCar.rating }}</p>
        </div>
      </div>
      <div v-if="anotherCars.length" class="car__content__another">
        <p class="car__content__another-title">You may also like:</p>
        <div class="car__content__another__cards">
          <div
            v-for="car, index in anotherCars"
            :key="index"
            class="car__content__another__cards__card"
          >
            <NuxtLink :to="`/car/${car.id}`">
              <img
                class="car__content__another__cards__card-image"
                :src="car.imgs[0]"
                :alt="car.name"
              />
              <p class="car__content__another__cards__card-type">{{ car.type }}</p>
              <p class="car__content__another__cards__card-name">{{ car.brand }}  {{ car.name }}</p>
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

const route = useRoute();

const authStore = useAuthStore();
const carsStore = useCarsStore();
const modalsStore = useModalsStore();

const { isAuth } = storeToRefs(authStore);
const { cars, favouritedCars, selectedCar } = storeToRefs(carsStore);

const isLoading = ref(true);
const error = ref("");
const selectedImage = ref(null);
const anotherCars = ref([]);

const carName = computed(() => `${selectedCar.value.brand}  ${selectedCar.value.name}`);

const isFavourited = computed(() => favouritedCars.value.some(car => car.id === selectedCar.value.id));

const carImages = computed(() => [...selectedCar.value.imgs, ...selectedCar.value.imgs]);

onMounted(async () => {
  try {
    await carsStore.getCar(route.params.id);
    await carsStore.getCars();
    getAnotherCars();
    selectedImage.value = selectedCar.value.imgs[0];
  } catch (e) {
    error.value = e;
    setTimeout(() => error.value = "", 1000);
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
  } catch (e) {
    error.value = e;
    setTimeout(() => error.value = "", 1000);
  }
}

async function removeFromFavouritedCars() {
  try {
    await carsStore.removeFromFavouritedCars(selectedCar.value.id);
  } catch (e) {
    error.value = e;
    setTimeout(() => error.value = "", 1000);
  }
}
</script>

<style lang="scss">
.car {
  background-color: $color-white;
  padding-top: 100px;
  padding-bottom: 120px;

  &__content {
    padding: 0 240px;
    position: relative;

    &-back {
      font-weight: 500;
      color: $color-yellow;
      margin-bottom: 25px;
    }

    &__info {
      display: flex;
      gap: 100px;

      &__images {
        width: 80%;

        &-selected {
          width: 100%;
        }

        .swiper {
          width: 100%;
          padding: 10px 20px;
          box-sizing: border-box;
          align-items: center;
          transition: width 0.5s linear;

          .swiper-wrapper {
            align-items: center;

            .swiper-slide {
              width: 70% !important;
            }

            .swiper-slide-prev {
              width: 55% !important;
            }

            .swiper-slide-next {
              width: 55% !important;
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

          .slide {
            .slide-image {
              width: 100%;
              object-fit: cover;
              border-radius: 5px;
            }
          }
        }
      }

      &__order {
        padding: 50px 0;
        display: flex;
        flex-direction: column;
        gap: 20px;

        &-name {
          font-size: 32px;
          font-weight: 600;
          color: $color-dark;

          .small {
            font-size: 18px;
            color: $color-yellow;
          }
        }

        &-description {
          max-width: 550px;
          font-size: 18px;
          opacity: 70%;
        }

        &-price {
          font-size: 24px;
          font-weight: 600;
        }

        &__controls {
          margin-top: auto;
          display: flex;
          align-items: center;
          gap: 15px;

          .icon {
            width: 32px;
            height: 32px;
            cursor: pointer;
          }
        }
      }
    }

    &__main {
      width: 80%;
      height: 800px;
      padding: 35px;
      margin: 75px auto;
      box-shadow: 0px 4px 39.79999923706055px 0px #00000040;
      border-radius: 25px;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 20px;

      &__column-titles {
        height: 800px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        p {
          font-size: 28px;
          text-align: center;
        }
      }

      &__column-values {
        height: 800px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        p {
          font-size: 28px;
          text-align: center;
        }
      }
    }

    &__another {

      &-title {
        font-size: 36px;
        font-weight: 500;
        margin-bottom: 50px;
      }

      &__cards {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 15px;

        &__card {
          width: 100%;
          border: 2px solid $color-yellow;
          border-radius: 25px;
          cursor: pointer;
          transition: transform 0.2s linear;

          &:hover {
            transform: translateY(-25px);
          }

          &-image {
            width: 100%;
            border-radius: 25px 25px 0 0;
            margin-bottom: 20px;
          }

          &-type {
            font-size: 14px;
            opacity: 80%;
            padding-left: 20px;
          }

          &-name {
            font-size: 20px;
            font-weight: 500;
            padding: 0 0 20px 20px
          }
        }
      }
    }
  }
}
</style>