import api from "@/api";

export const useCarsStore = defineStore("carsStore", () => {
  const cars = ref([]);
  const totalCars = ref(0);
  const totalPages = ref(1);

  const selectedCar = ref(null);

  async function getCars(page) {
    try {
      const response = await api.getCars(page, 9);

      cars.value = response.cars;
      totalCars.value = response.meta.totalCars;
      totalPages.value = response.meta.totalPages;
    } catch (error) {
      throw error;
    }
  }

  async function getCar(carId) {
    try {
      const response = await api.getCar(carId);

      selectedCar.value = response.car;
    } catch (error) {
      throw error;
    }
  }

  return {
    cars,
    totalCars,
    totalPages,
    selectedCar,
    getCars,
    getCar,
  };
});
