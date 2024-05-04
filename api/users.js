import axios from "axios";

export default {
  async getUsers() {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/user/get-users",
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
        "http://localhost:5000/api/user/change-role",
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
