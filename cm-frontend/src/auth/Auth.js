import axios from "axios";
import authHeader from "../auth/AuthHeader";

const API_URL = "http://localhost:8081/pictures/auth/";

const register = (username, email, password, firstName, lastName) => {
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

//const login = (username, password) => {
//   return fetch(API_URL + "authenticate", {
//     method: "POST",
//     // mode: "no-cors",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(username, password),
//   }).then((response) => {
//     console.log("JWT: ", response.data);
//     if (response.data.jwt) {
//       localStorage.setItem("JwtToken", JSON.stringify(response.data));
//     }
//     return response.data;
//   });
// };

const logout = () => {
  localStorage.removeItem("JwtToken");
};

const getCurrentUser = () => {
  return axios
    .get(API_URL + "username", { headers: authHeader() })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log("Error getting username: ", err.message);
    });
};

const Auth = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default Auth;
