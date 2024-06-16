import axios from "axios";

const config = useRuntimeConfig();

export default {
  async getBrands() {
    try {
      const { data } = await axios.get(
        `https://carhouse-backend.onrender.com/api/brand/get-brands`
      );

      return data;
    } catch (error) {
      throw error.response.data.errors[0];
    }
  },

  async createBrand(name) {
    try {
      const { data } = await axios.post(
        `https://carhouse-backend.onrender.com/api/brand/create-brand`,
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

  async deleteBrand(brandId) {
    try {
      const { data } = await axios.delete(
        `https://carhouse-backend.onrender.com/api/brand/delete-brand`,
        {
          data: {
            brandId,
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

  async updateBrand(brandId, name) {
    try {
      const { data } = await axios.patch(
        `https://carhouse-backend.onrender.com/api/brand/update-brand`,
        {
          brandId,
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
