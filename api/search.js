import axios from "axios";

const config = useRuntimeConfig();

export default {
  async getSearchTypes(brandId) {
    try {
      const { data } = await axios.get(`https://carhouse-backend.onrender.com/api/search/get-types?brandId=${brandId}`);

      return data;
    } catch (error) {
      throw error.response.data.errors[0];
    }
  },

  async getModels(brandId, typeId) {
    try {
      const { data } = await axios.get(`https://carhouse-backend.onrender.com/api/search/get-models?brandId=${brandId}&typeId=${typeId}`);

      return data;
    } catch (error) {
      throw error.response.data.errors[0];
    }
  },

  async getYears(brandId, typeId, model) {
    try {
      const { data } = await axios.get(`https://carhouse-backend.onrender.com/api/search/get-years?brandId=${brandId}&typeId=${typeId}&model=${model}`);

      return data;
    } catch (error) {
      throw error.response.data.errors[0];
    }
  },
};
