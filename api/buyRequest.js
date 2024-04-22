import axios from "axios";

export default {
  async createBuyRequest(carId, phone) {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/buy-request/create-buy-request",
        {
          carId,
          phone,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      return data;
    } catch (error) {
      throw error.response.data.errors[0];
    }
  }
};
