import axios from "axios";

export default {
  async getCars(page, pageSize, sort) {
    try {
      let url = `http://localhost:5000/api/car/get-cars?pageSize=${pageSize}`;
      if (page) {
        url += `&page=${page}`;
      }
      if (sort) {
        url += `&sort=${sort}`;
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
  }
};
