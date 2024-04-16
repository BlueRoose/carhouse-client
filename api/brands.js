import axios from "axios";

export default {
  async getBrands() {
    try {
      const { data } = await axios.get("http://localhost:5000/api/brand/get-brands");

      return data;
    } catch (error) {
      throw error.response.data.errors[0];
    }
  }
};
