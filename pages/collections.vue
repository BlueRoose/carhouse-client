<template>
  <div class="collections">
    <PageInfo
      subtitle="C o l l e c t i o n s"
      title="Find your dream car here"
      description="Carhouse is the best place to find your dream car. Choose it!"
    />
    <div class="collections__content">
      <div class="collections__content__search">
        <div class="collections__content__search__selects">
          <CustomSelect label="Brand" />
          <CustomSelect label="Model" />
          <CustomSelect label="Year" />
          <CustomSelect label="Type" />
        </div>
        <Button class="collections__content__search-button">Find</Button>
      </div>
      <div class="collections__content__info">
        <p v-if="!isLoading" class="collections__content__info-showed">Showing {{ cars.length }} from {{ totalCars }} results</p>
        <CustomSelect class="collections__content__info-sort" label="Sort By" />
      </div>
      <img
        v-if="isLoading"
        class="loader"
        src="/images/wheel.png"
        alt="wheel-loader"
      />
      <div v-else class="collections__content__cards">
        <CollectionCard
          v-for="car, index in cars"
          :key="index"
          :brand="car.brand"
          :name="car.name"
          :type="car.type"
          :transmission="car.transmission"
          :passenger="car.passenger"
          :topSpeed="car.topSpeed"
          :horsePower="car.horsePower"
          :time="car.time"
          :img="car.imgs[0]"
        />
      </div>
      <div v-if="totalPages > 1" class="collections__content__pagination">
        <Button
          v-for="_, index in totalPages"
          :key="index"
          class="collections__content__pagination-button"
          :class="{ 'active-button': index + 1 === page }"
          @click="changePage(index + 1)"
        >
          {{ index + 1 }}
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCarsStore } from "@/store/cars.js";

const carsStore = useCarsStore();

const { cars, totalCars, totalPages } = storeToRefs(carsStore);

const page = ref(1);
const isLoading = ref(true);
const error = ref("");

onMounted(async () => {
  try {
    await carsStore.getCars(page.value);
  } catch (e) {
    error.value = e;
    setTimeout(() => {
      error.value = "";
    }, 1000);
  } finally {
    isLoading.value = false;
  }
});

async function changePage(newPage) {
  page.value = newPage;
  await carsStore.getCars(page.value);
}
</script>

<style lang="scss" scoped>
.collections {
  background-color: $color-white;
  padding-bottom: 220px;

  &__content {
    padding: 0 240px;
    position: relative;

    &__search {
      max-width: 1200px;
      height: 140px;
      margin: 0 auto;
      padding: 0 64px;
      margin-bottom: 150px;
      box-shadow: 0 31px 81px rgba(37, 37, 37, .3);
      display: flex;
      justify-content: space-between;
      align-items: center;
      
      &__selects {
        display: flex;
        gap: 91px;
      }

      &-button {
        width: 145px;
        height: 64px;
        border-radius: 0;
      }
    }

    &__info {
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

      &-sort {
        justify-self: flex-end;
        grid-column-start: 2;
      }
    }

    &__cards {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-column-gap: 54px;
      grid-row-gap: 94px;
      margin-bottom: 90px;
    }

    &__pagination {
      width: fit-content;
      margin: 0 auto;
      display: flex;
      gap: 14px;

      &-button {
        background-color: #E1E1E1;
        transition: all 0.2s linear;
      }
    }
  }
}

.active-button {
  background-color: #464646;
  color: $color-white;
}

.loader {
  color: $color-yellow;
  font-size: 200px;
  text-indent: -9999em;
  overflow: hidden;
  width: 1em;
  height: 1em;
  display: block;
  margin: 150px auto 50px;
  border-radius: 50%;
  animation: round 1.7s infinite linear;
}

@keyframes round {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>