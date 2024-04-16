import api from "@/api";

export const useBrandsStore = defineStore("brandsStore", () => {
  const brands = ref([]);

  async function getBrands() {
    try {
      const response = await api.getBrands();

      brands.value = response.brands;
    } catch (error) {
      throw error;
    }
  }

  return {
    brands,
    getBrands
  };
});
