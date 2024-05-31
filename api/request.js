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

  async getAllRequests() {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/request/get-requests",
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

  async sendAnswear(id, answear) {
    try {
      const { data } = await axios.patch(
        "http://localhost:5000/api/request/send-answear",
        {
          id,
          answear,
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

  async deleteRequest(id) {
    try {
      const { data } = await axios.delete(
        "http://localhost:5000/api/request/delete-request",
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
};
