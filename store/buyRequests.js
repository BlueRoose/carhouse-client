import api from "@/api";

export const useBuyRequestsStore = defineStore("buyRequestsStore", () => {
  const allBuyRequests = ref([]);
  const userBuyRequests = ref([]);

  async function getAllBuyRequests() {
    try {
      const response = await api.getAllBuyRequests();

      allBuyRequests.value = response.buyRequests;
    } catch (error) {
      throw error;
    }
  }

  async function getUserBuyRequests() {
    try {
      const response = await api.getUserBuyRequests();

      userBuyRequests.value = response.userBuyRequests;
    } catch (error) {
      throw error;
    }
  }

  return {
    allBuyRequests,
    userBuyRequests,
    getAllBuyRequests,
    getUserBuyRequests,
  };
});
