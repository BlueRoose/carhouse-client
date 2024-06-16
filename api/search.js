import axios from "axios";

export default {
  async getSearchTypes(brandId) {
    try {
      const { data } = await axios.get(`${process.env.BASE_URL}/api/search/get-types?brandId=${brandId}`);

      return data;
    } catch (error) {
      throw error.response.data.errors[0];
    }
  },

  async getModels(brandId, typeId) {
    try {
      const { data } = await axios.get(`${process.env.BASE_URL}/api/search/get-models?brandId=${brandId}&typeId=${typeId}`);

      return data;
    } catch (error) {
      throw error.response.data.errors[0];
    }
  },

  async getYears(brandId, typeId, model) {
    try {
      const { data } = await axios.get(`${process.env.BASE_URL}/api/search/get-years?brandId=${brandId}&typeId=${typeId}&model=${model}`);

      return data;
    } catch (error) {
      throw error.response.data.errors[0];
    }
  },
};
