import axios from "axios";

const API_URL = "http://localhost:8080/auth/";

const register = (username, email, password) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
  });
};

const login = (username, password) => {
  return axios
    .post(API_URL + "authenticate", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.jwt) {
        localStorage.setItem("JwtToken", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("JwtToken");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("JwtToken"));
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
};