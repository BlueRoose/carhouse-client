import api from "@/api";

export const useSearchStore = defineStore("searchStore", () => {
  const brandId = ref(null);
  const searchedTypes = ref([]);
  const typeId = ref(null);
  const searchedModels = ref([]);
  const model = ref(null);
  const searchedYears = ref([]);
  const year = ref(null);

  async function getTypes() {
    try {
      const response = await api.getSearchTypes(brandId.value);

      searchedTypes.value = response.types;
    } catch (error) {
      throw error;
    }
  }

  async function getModels() {
    try {
      const response = await api.getModels(brandId.value, typeId.value);

      searchedModels.value = response.models;
    } catch (error) {
      throw error;
    }
  }

  async function getYears() {
    try {
      const response = await api.getYears(brandId.value, typeId.value, model.value);

      searchedYears.value = response.years;
    } catch (error) {
      throw error;
    }
  }

  return {
    brandId,
    searchedTypes,
    typeId,
    searchedModels,
    model,
    searchedYears,
    year,
    getTypes,
    getModels,
    getYears,
  };
});
