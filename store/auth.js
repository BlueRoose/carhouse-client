import api from "@/api";

export const useAuthStore = defineStore("authStore", () => {
  const isAuth = ref(false);
  const user = ref(null);

  function setIsAuth(userData) {
    isAuth.value = true;
    user.value = userData;
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
      localStorage.setItem("token", response.token);

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
      localStorage.setItem("token", response.token);

      return response;
    } catch (error) {
      throw error;
    }
  }

  function logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    isAuth.value = false;
    user.value = null;
  }

  return {
    isAuth,
    user,
    setIsAuth,
    preSignUp,
    signUp,
    preSignIn,
    signIn,
    logout
  };
});
