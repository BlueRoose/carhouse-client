import axios from "axios";

export default {
  async getCars(page, pageSize) {
    try {
      const { data } = await axios.get(`http://localhost:5000/api/car/get-cars?page=${page}&pageSize=${pageSize}`);

      return data;
    } catch (error) {
      throw error.response.data.errors[0];
    }
  }
};
