import axios from "axios";

const config = useRuntimeConfig();

export default {
  async getTypes() {
    try {
      const { data } = await axios.get(`https://carhouse-backend.onrender.com/api/type/get-types`);

      return data;
    } catch (error) {
      throw error.response.data.errors[0];
    }
  },

  async createType(name) {
    try {
      const { data } = await axios.post(
        `https://carhouse-backend.onrender.com/api/type/create-type`,
        { name },
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

  async deleteType(typeId) {
    try {
      const { data } = await axios.delete(
        `https://carhouse-backend.onrender.com/api/type/delete-type`,
        {
          data: {
            typeId,
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

  async updateType(typeId, name) {
    try {
      const { data } = await axios.patch(
        `https://carhouse-backend.onrender.com/api/type/update-type`,
        {
          typeId,
          name,
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
