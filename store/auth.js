import api from "@/api";

export const useAuthStore = defineStore("authStore", () => {
  const isAuth = ref(false);
  const user = ref(null);
  
  if (process.client) {
    const userData = JSON.parse(localStorage.getItem("user"));

    if (userData) {
      isAuth.value = true;
      user.value = userData;
    }
  }

  async function preSignUp(data) {
    try {
      const response = await api.preSignUp(data);

      return response;
    } catch (error) {
      throw error;
    }
  }

  async function signUp(data) {
    try {
      const response = await api.signUp(data);

      isAuth.value = true;
      user.value = response.user;
      localStorage.setItem("user", JSON.stringify(response.user));

      return response;
    } catch (error) {
      throw error;
    }
  }

  async function preSignIn(data) {
    try {
      const response = await api.preSignIn(data);

      return response;
    } catch (error) {
      throw error;
    }
  }

  async function signIn(data) {
    try {
      const response = await api.signIn(data);

      isAuth.value = true;
      user.value = response.user;
      localStorage.setItem("user", JSON.stringify(response.user));

      return response;
    } catch (error) {
      throw error;
    }
  }

  function logout() {
    localStorage.removeItem("user");
    isAuth.value = false;
    user.value = null;
  }

  return {
    isAuth,
    user,
    preSignUp,
    signUp,
    preSignIn,
    signIn,
    logout
  };
});
