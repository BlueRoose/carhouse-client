import api from "@/api";

export const useBuyRequestsStore = defineStore("buyRequestsStore", () => {
  const userBuyRequests = ref([]);

  async function getUserBuyRequests() {
    try {
      const response = await api.getUserBuyRequests();

      userBuyRequests.value = response.userBuyRequests;
    } catch (error) {
      throw error;
    }
  }

  return {
    userBuyRequests,
    getUserBuyRequests,
  };
});
