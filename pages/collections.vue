<template>
  <div class="collections">
    <PageInfo
      subtitle="C o l l e c t i o n s"
      title="Find your dream car here"
      description="Carhouse is the best place to find your dream car. Choose it!"
    />
    <div class="collections__content container">
      <div class="collections__content__search">
        <div class="collections__content__search__selects">
          <CustomSelect label="Brand" :options="brands" />
          <CustomSelect label="Type" :options="types" />
          <CustomSelect label="Model" :options="[1, 2, 3]" />
          <CustomSelect label="Year" :options="[1, 2, 3]" />
        </div>
        <Button class="collections__content__search-button">Find</Button>
      </div>
      <div v-if="!isLoading" class="collections__content__info">
        <p class="collections__content__info-showed">
          Showing {{ cars.length }} from {{ totalCars }} results
        </p>
        <CustomSelect
          v-model="sortValueChanged"
          class="collections__content__info-sort"
          label="Sort By"
          :options="sortOptions"
        />
      </div>
      <Loader v-if="isLoading" />
      <div v-else class="collections__content__cards">
        <CollectionCard
          v-for="car, index in cars"
          :key="index"
          :car="car"
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
import { useBrandsStore } from "@/store/brands.js";
import { useTypesStore } from "@/store/types.js";

const sortOptions = [
  {
    name: "Name ASC",
    value: "name,asc",
  },
  {
    name: "Name DESC",
    value: "name,desc",
  },
  {
    name: "Price ASC",
    value: "price,asc",
  },
  {
    name: "Price DESC",
    value: "price,desc",
  },
];

const router = useRouter();
const route = useRoute();

const carsStore = useCarsStore();
const brandsStore = useBrandsStore();
const typesStore = useTypesStore();

const { cars, totalCars, totalPages } = storeToRefs(carsStore);
const { brands } = storeToRefs(brandsStore);
const { types } = storeToRefs(typesStore);

const page = ref(Number(route.query.page) || 1);
const sortValue = ref(null);
const isLoading = ref(true);
const error = ref("");

const sortValueChanged = computed({
  get() {
    return sortValue.value;
  },
  async set(value) {
    sortValue.value = value;
    await getCars();
  },
});

onMounted(async () => {
  try {
    await getCars();
    await brandsStore.getBrands();
    await typesStore.getTypes();
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
  router.push({ query: { page: newPage }});
  await carsStore.getCars(page.value);
  const cardsBlock = document.getElementsByClassName("collections__content__cards")[0];
  window.scrollTo({ top: cardsBlock.offsetTop, behavior: "smooth" });
}

async function getCars() {
  try {
    isLoading.value = true;
    await carsStore.getCars(page.value, sortValue.value);
  } catch (e) {
    error.value = e;
    setTimeout(() => {
      error.value = "";
    }, 1000);
  } finally {
    isLoading.value = false;
  }
}
</script>

<style lang="scss" scoped>
.collections {
  background-color: $color-white;
  padding-bottom: 220px;

  &__content {
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
        gap: 40px;
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
</style>