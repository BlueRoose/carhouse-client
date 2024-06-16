import axios from "axios";

export default {
  async getUsers() {
    try {
      const { data } = await axios.get(
        `${process.env.BASE_URL}/api/user/get-users`,
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

  async changeRole(id, role) {
    try {
      const { data } = await axios.patch(
        `${process.env.BASE_URL}/api/user/change-role`,
        {
          id,
          role,
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
