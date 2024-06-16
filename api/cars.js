import axios from "axios";

const config = useRuntimeConfig();

export default {
  async getCars(brandId, typeId, model, year, page, pageSize, sort) {
    try {
      let url = `https://carhouse-backend.onrender.com/api/car/get-cars?pageSize=${pageSize}`;
      if (page) {
        url += `&page=${page}`;
      }
      if (sort) {
        url += `&sort=${sort}`;
      }
      if (brandId) {
        url += `&brandId=${brandId}`;
      }
      if (typeId) {
        url += `&typeId=${typeId}`;
      }
      if (model) {
        url += `&model=${model}`;
      }
      if (year) {
        url += `&year=${year}`;
      }

      const { data } = await axios.get(url);

      return data;
    } catch (error) {
      throw error.response.data.errors[0];
    }
  },

  async getCar(carId) {
    try {
      const { data } = await axios.get(`https://carhouse-backend.onrender.com/api/car/get-car?id=${carId}`);

      return data;
    } catch (error) {
      throw error.response.data.errors[0];
    }
  },

  async checkCar(carId) {
    try {
      const { data } = await axios.get(`https://carhouse-backend.onrender.com/api/car/check-car?carId=${carId}`,
      {
        headers: {
          Authorization: `Bearer ${useCookie("token").value}`,
        },
      }
    );

      return data;
    } catch (error) {
      throw error.response.data.errors[0];
    }
  },

  async getFavouritedCars() {
    try {
      const { data } = await axios.get(`https://carhouse-backend.onrender.com/api/car/get-favourites`, {
        headers: {
          Authorization: `Bearer ${useCookie("token").value}`,
        },
      });

      return data;
    } catch (error) {
      throw error.response.data.errors[0];
    }
  },

  async addToFavouritedCars(carId) {
    try {
      const { data } = await axios.post(`https://carhouse-backend.onrender.com/api/car/add-to-favourites`,
        {
          carId
        },
        {
          headers: {
            Authorization: `Bearer ${useCookie("token").value}`,
          },
        }
      );

      return data;
    } catch (error) {
      throw error.response.data.errors[0];
    }
  },

  async removeFromFavouritedCars(carId) {
    try {
      const { data } = await axios.post(`https://carhouse-backend.onrender.com/api/car/remove-from-favourites`,
        {
          carId
        },
        {
          headers: {
            Authorization: `Bearer ${useCookie("token").value}`,
          },
        }
      );

      return data;
    } catch (error) {
      throw error.response.data.errors[0];
    }
  },
};
