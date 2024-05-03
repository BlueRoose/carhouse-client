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
            Authorization: `Bearer ${useCookie("token").value}`,
          },
        },
      );

      return data;
    } catch (error) {
      throw error.response.data.errors[0];
    }
  },

  async getAllBuyRequests() {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/buy-request/get-buy-requests",
        {
          headers: {
            Authorization: `Bearer ${useCookie("token").value}`,
          },
        },
      );

      return data;
    } catch (error) {
      throw error.response.data.errors[0];
    }
  },

  async updateBuyRequest(id, status) {
    try {
      const { data } = await axios.patch(
        "http://localhost:5000/api/buy-request/update-buy-request",
        {
          id,
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${useCookie("token").value}`,
          },
        },
      );

      return data;
    } catch (error) {
      throw error.response.data.errors[0];
    }
  },

  async deleteBuyRequest(id) {
    try {
      const { data } = await axios.delete(
        "http://localhost:5000/api/buy-request/delete-buy-request",
        {
          data: {
            id,
          },
          headers: {
            Authorization: `Bearer ${useCookie("token").value}`,
          },
        },
      );
      
      return data;
    } catch (error) {
      throw error.response.data.errors[0];
    }
  },

  async getUserBuyRequests() {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/buy-request/get-user-buy-requests",
        {
          headers: {
            Authorization: `Bearer ${useCookie("token").value}`,
          },
        },
      );

      return data;
    } catch (error) {
      throw error.response.data.errors[0];
    }
  },

  async cancelUserBuyRequest(buyRequestId) {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/buy-request/cancel-user-buy-request",
        {
          buyRequestId,
        },
        {
          headers: {
            Authorization: `Bearer ${useCookie("token").value}`,
          },
        },
      );

      return data;
    } catch (error) {
      throw error.response.data.errors[0];
    }
  },
};
