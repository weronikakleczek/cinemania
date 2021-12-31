import axios from "axios";

const API_URL = "http://localhost:8080/auth/";

const register = (username,
                  email,
                  password,
                  firstName,
                  lastName) => {
  return axios.post(API_URL + "register", {
    username,
    email,
    password,
    firstName,
    lastName,
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

const Auth = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default Auth;