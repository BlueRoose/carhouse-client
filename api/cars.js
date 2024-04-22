import axios from "axios";

export default {
  async getCars(brandId, typeId, model, year, page, pageSize, sort) {
    try {
      let url = `http://localhost:5000/api/car/get-cars?pageSize=${pageSize}`;
      if (page) {
        url += `&page=${page}`;
      }
      if (sort) {
        url += `&sort=${sort}`;
      }
      if (brandId && typeId && model && year) {
        url += `&brandId=${brandId}&typeId=${typeId}&model=${model}&year=${year}`;
      }
      
      const { data } = await axios.get(url);

      return data;
    } catch (error) {
      throw error.response.data.errors[0];
    }
  },

  async getCar(carId) {
    try {
      const { data } = await axios.get(`http://localhost:5000/api/car/get-car?id=${carId}`);

      return data;
    } catch (error) {
      throw error.response.data.errors[0];
    }
  },

  async getFavouritedCars() {
    try {
      const { data } = await axios.get(`http://localhost:5000/api/car/get-favourites`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      return data;
    } catch (error) {
      throw error.response.data.errors[0];
    }
  },

  async addToFavouritedCars(carId) {
    try {
      const { data } = await axios.post(`http://localhost:5000/api/car/add-to-favourites`,
        {
          carId
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
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
      const { data } = await axios.post(`http://localhost:5000/api/car/remove-from-favourites`,
        {
          carId
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      return data;
    } catch (error) {
      throw error.response.data.errors[0];
    }
  },
};
