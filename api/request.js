import axios from "axios";

export default {
  async addRequest(body) {
    try {
      const { data } = await axios.post(`http://localhost:5000/api/request/create-request`, body);

      return data;
    } catch (error) {
      throw error.response.data.errors[0];
    }
  },
};
