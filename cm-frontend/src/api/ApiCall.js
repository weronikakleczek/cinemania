import axios from "axios";
import authHeader from "../auth/AuthHeader";

const API_URL = "http://localhost:8080/";

const getTrending = () => {
  return axios.get(API_URL + "movie/trending", {});
};

const getGenres = (type) => {
  return axios.get(API_URL + `movie/genres?type=${type}`, {});
};

const getFilteredList = (filters, page, type) => {
  return axios.post(API_URL + `movie/filter?page=${page}&type=${type}`, Object.fromEntries(filters), {})
}

const getQueriedList = (query, page) => {
  return axios.get(API_URL + `movie/query/${query}?page=${page}`, {})
}

const getSinglePicture = (id, type) => {
  return axios.get(API_URL + `${type}/${id}`, {});
};

const getUserInfo = (username) => {
  return axios.get(API_URL + `user/info/${username}`, { headers: authHeader() });
};

const addMovieToWatched = (username, movieId) => {
  return axios.post(API_URL + `watched/movie/add/${username}/${movieId}`, {}, {});
}

const getWatchedMovies = (username) => {
  return axios.get(API_URL + `watched/movie/all/${username}`, {});
}


const ApiCall = {
    getTrending,
    getGenres,
    getFilteredList,
    getQueriedList,
    getSinglePicture,
    getUserInfo,
    addMovieToWatched,
    getWatchedMovies
};

export default ApiCall;