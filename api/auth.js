import axios from "axios";

export default {
  async preSignUp ({ email }) {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/auth/pre-signup",
        {
          email
        }
      );

      return data;
    } catch (error) {
      throw error.response.data.errors[0];
    }
  },

  async signUp ({ name, surname, email, activationMessage }) {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/auth/signup",
        {
          name,
          surname,
          email,
          activationMessage: activationMessage.join("")
        }
      );

      return data;
    } catch (error) {
      throw error.response.data.errors[0];
    }
  },

  async preSignIn ({ email }) {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/auth/pre-signin",
        {
          email
        }
      );

      return data;
    } catch (error) {
      throw error.response.data.errors[0];
    }
  },
  
  async signIn ({ email, activationMessage }) {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/auth/signin",
        {
          email,
          activationMessage: activationMessage.join("")
        }
      );

      return data;
    } catch (error) {
      throw error.response.data.errors[0];
    }
  }
};
