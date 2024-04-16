import api from "@/api";

export const useTypesStore = defineStore("typesStore", () => {
  const types = ref([]);

  async function getTypes() {
    try {
      const response = await api.getTypes();

      types.value = response.types;
    } catch (error) {
      throw error;
    }
  }

  return {
    types,
    getTypes
  };
});
