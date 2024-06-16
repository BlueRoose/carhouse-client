import axios from "axios";

const config = useRuntimeConfig();

export default {
  async addRequest(body) {
    try {
      const { data } = await axios.post(`https://carhouse-backend.onrender.com/api/request/create-request`, body);

      return data;
    } catch (error) {
      throw error.response.data.errors[0];
    }
  },

  async getAllRequests() {
    try {
      const { data } = await axios.get(
        `https://carhouse-backend.onrender.com/api/request/get-requests`,
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
        `https://carhouse-backend.onrender.com/api/request/send-answear`,
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
        `https://carhouse-backend.onrender.com/api/request/delete-request`,
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
