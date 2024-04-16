import axios from "axios";

export default {
  async getTypes() {
    try {
      const { data } = await axios.get("http://localhost:5000/api/type/get-types");

      return data;
    } catch (error) {
      throw error.response.data.errors[0];
    }
  }
};
