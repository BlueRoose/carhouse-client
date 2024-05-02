import axios from "axios";

export default {
  async getBrands() {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/brand/get-brands"
      );

      return data;
    } catch (error) {
      throw error.response.data.errors[0];
    }
  },

  async createBrand(name) {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/brand/create-brand",
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
        "http://localhost:5000/api/brand/delete-brand",
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
        "http://localhost:5000/api/brand/update-brand",
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
