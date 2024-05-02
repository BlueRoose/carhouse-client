import axios from "axios";

export default {
  async getTypes() {
    try {
      const { data } = await axios.get("http://localhost:5000/api/type/get-types");

      return data;
    } catch (error) {
      throw error.response.data.errors[0];
    }
  },

  async createType(name) {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/type/create-type",
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
        "http://localhost:5000/api/type/delete-type",
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
        "http://localhost:5000/api/type/update-type",
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
