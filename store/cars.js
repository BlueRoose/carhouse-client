import api from "@/api";

export const useCarsStore = defineStore("carsStore", () => {
  const cars = ref([]);
  const allCars = ref([]);
  const favouritedCars = ref([]);
  const totalCars = ref(0);
  const totalPages = ref(1);

  const selectedCar = ref(null);

  async function getCars(page, sort, brandId = null, typeId = null, model = null, year = null) {
    try {
      const response = await api.getCars(brandId, typeId, model, year, page, 9, sort);

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

  async function getFavouritedCars() {
    try {
      const response = await api.getFavouritedCars();

      favouritedCars.value = response.favouritedCars;
    } catch (error) {
      throw error;
    }
  }

  async function addToFavouritedCars(carId) {
    try {
      const response = await api.addToFavouritedCars(carId);
      
      await getFavouritedCars();

      return response;
    } catch (error) {
      throw error;
    }
  }

  async function removeFromFavouritedCars(carId) {
    try {
      const response = await api.removeFromFavouritedCars(carId);
      
      await getFavouritedCars();

      return response;
    } catch (error) {
      throw error;
    }
  }

  return {
    cars,
    favouritedCars,
    totalCars,
    totalPages,
    selectedCar,
    getCars,
    getCar,
    getFavouritedCars,
    addToFavouritedCars,
    removeFromFavouritedCars,
  };
});
