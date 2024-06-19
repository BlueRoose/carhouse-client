<template>
  <div class="bg-white pb-20">
    <PageInfo
      subtitle="C o l l e c t i o n s"
      title="Find your dream car here"
      description="Carhouse is the best place to find your dream car. Choose it!"
    />
    <div class="relative container mx-auto px-4">
      <div class="max-w-[1200px] h-fit py-4 mx-auto px-16 max-md:px-1 mb-20 shadow-[0_31px_81px_rgba(37,37,37,.3)] flex justify-between items-center max-md:flex-col max-md:gap-6">
        <div class="flex max-lg:grid grid-cols-2 gap-10 max-md:gap-4">
          <CustomSelect
            v-model="brandChanged"
            label="Brand"
            :options="brands"
            :disabled="!brands.length"
          />
          <CustomSelect
            v-model="typeChanged"
            label="Type"
            :options="searchedTypes"
            :disabled="!searchedTypes.length"
          />
          <CustomSelect
            v-model="modelChanged"
            label="Model"
            :options="searchedModels"
            :disabled="!searchedModels.length"
          />
          <CustomSelect
            v-model="yearChanged"
            label="Year"
            :options="searchedYears"
            :disabled="!searchedYears.length"
          />
        </div>
        <Button
          class="w-[145px] h-16 rounded-none"
          :disabled="!brandId"
          :isLoading="isLoading"
          @click="getCars"
        >
          Find
        </Button>
      </div>
      <div v-if="!isLoading && cars.length" class="mb-20 grid grid-cols-2 justify-between">
        <p class="text-black text-3xl max-md:text-2xl font-semibold self-center">
          Showing {{ cars.length }} from {{ totalCars }} results
        </p>
        <CustomSelect
          v-model="sortValueChanged"
          class="max-w-[150px] ml-auto sort"
          label="Sort By"
          :options="sortOptions"
        />
      </div>
      <Loader v-if="isLoading" />
      <template v-else>
        <div
          v-if="cars.length"
          class="cars-cards grid grid-cols-3 max-lg:grid-cols-2 auto-rows-max max-md:flex flex-col gap-x-14 gap-y-24 mb-20"
        >
          <CollectionCard
            v-for="(car, index) in cars"
            :key="index"
            :car="car"
          />
        </div>
        <h1 v-else class="text-center mt-52 mb-24">We are sorry, but we don't have any cars at the moment</h1>
      </template>
      <div v-if="totalPages > 1 && !isLoading" class="w-fit mx-auto flex gap-3.5">
        <Button
          v-for="(_, index) in totalPages"
          :key="index"
          class="bg-[#E1E1E1] transition-all ease-linear"
          :class="{ 'bg-[#464646] text-white': index + 1 === page }"
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
import { useSearchStore } from "@/store/search.js";
import { useNotificationsStore } from "@/store/notifications.js";

const sortOptions = [
  {
    name: "Name ↑",
    value: "name,asc",
  },
  {
    name: "Name ↓",
    value: "name,desc",
  },
  {
    name: "Price ↑",
    value: "price,asc",
  },
  {
    name: "Price ↓",
    value: "price,desc",
  },
];

const router = useRouter();
const route = useRoute();

const carsStore = useCarsStore();
const brandsStore = useBrandsStore();
const typesStore = useTypesStore();
const searchStore = useSearchStore();
const notificationsStore = useNotificationsStore();

const { cars, totalCars, totalPages } = storeToRefs(carsStore);
const { brands } = storeToRefs(brandsStore);
const { types } = storeToRefs(typesStore);
const { brandId, searchedTypes, typeId, searchedModels, model, searchedYears, year } = storeToRefs(searchStore);
const { successMessage, errorMessage } = storeToRefs(notificationsStore);

const page = ref(Number(route.query.page) || 1);
const sortValue = ref(route.query.sort || null);
const isLoading = ref(true);
const carsRef = ref(null);

const brandChanged = computed({
  get() {
    return brands.value.find(brand => brand.id === brandId.value)?.name;
  },
  async set(value) {
    const currentQueryParams = Object.assign({}, route.query);

    searchedTypes.value = [];
    searchedModels.value = [];
    searchedYears.value = [];
    typeId.value = null;
    model.value = null;
    year.value = null;
    delete currentQueryParams.typeId;
    delete currentQueryParams.model;
    delete currentQueryParams.year;
    router.push({ query: currentQueryParams });

    if (!value) {
      brandId.value = null;
      delete currentQueryParams.brandId;
      router.push({ query: currentQueryParams });
      await getCars();
    } else {
      const id = brands.value.find(brand => brand.name === value).id;
      brandId.value = id;
      router.push({ query: { ...route.query, brandId: id } });
      await searchStore.getTypes();
    }
  },
});

const typeChanged = computed({
  get() {
    return types.value.find(type => type.id === typeId.value)?.name;
  },
  async set(value) {
    const currentQueryParams = Object.assign({}, route.query);

    searchedModels.value = [];
    searchedYears.value = [];
    model.value = null;
    year.value = null;
    delete currentQueryParams.model;
    delete currentQueryParams.year;
    router.push({ query: currentQueryParams });

    if (!value) {
      typeId.value = null;
      delete currentQueryParams.typeId;
      router.push({ query: currentQueryParams });
    } else {
      const id = types.value.find(type => type.name === value).id;
      typeId.value = id;
      router.push({ query: { ...route.query, typeId: id } });
      await searchStore.getModels();
    }
  },
});

const modelChanged = computed({
  get() {
    return model.value;
  },
  async set(value) {
    const currentQueryParams = Object.assign({}, route.query);
    
    searchedYears.value = [];
    year.value = null;
    delete currentQueryParams.year;
    router.push({ query: currentQueryParams });

    if (!value) {
      model.value = null;
      delete currentQueryParams.model;
      router.push({ query: currentQueryParams });
    } else {
      model.value = value;
      router.push({ query: { ...route.query, model: model.value } });
      await searchStore.getYears();
    }
  },
});

const yearChanged = computed({
  get() {
    return year.value;
  },
  async set(value) {
    const currentQueryParams = Object.assign({}, route.query);

    if (!value) {
      year.value = null;
      delete currentQueryParams.year;
      router.push({ query: currentQueryParams });

      await getCars();
    } else {
      year.value = value;
      router.push({ query: { ...route.query, year: year.value } });
    }
  },
});

const sortValueChanged = computed({
  get() {
    return sortValue.value;
  },
  async set(value) {
    const currentQueryParams = Object.assign({}, route.query);

    if (!value) {
      sortValue.value = null;
      delete currentQueryParams.sort;
      router.push({ query: currentQueryParams });
    } else {
      sortValue.value = value;
      router.push({ query: { ...route.query, sort: sortValue.value } });
      await getCars();
    }
  },
});

onMounted(async () => {
  try {
    await brandsStore.getBrands();
    await typesStore.getTypes();

    const query = route.query;
    if (query.brandId) {
      brandId.value = Number(query.brandId);
      await searchStore.getTypes();
    }
    if (query.typeId) {
      typeId.value = Number(query.typeId);
      await searchStore.getModels();
    }
    if (query.model) {
      model.value = query.model;
      await searchStore.getYears();
    }
    if (query.year) {
      year.value = query.year;
    }
    await getCars();
  } catch (e) {
    errorMessage.value = e;
    setTimeout(() => errorMessage.value = "", 2000);
  } finally {
    isLoading.value = false;
  }
});

async function changePage(newPage) {
  page.value = newPage;
  router.push({ query: { page: newPage }});
  await getCars();
  const cardsBlock = document.getElementsByClassName("cars-cards")[0];
  window.scrollTo({ top: cardsBlock.offsetTop, behavior: "smooth" });
}

async function getCars() {
  try {
    isLoading.value = true;
    await carsStore.getCars(page.value, sortValue.value, brandId.value, typeId.value, model.value, year.value);
  } catch (e) {
    errorMessage.value = e;
    setTimeout(() => errorMessage.value = "", 2000);
  } finally {
    isLoading.value = false;
  }
}
</script>

<style lang="scss" scoped>
.sort {
  grid-column-start: 2;
}
</style>