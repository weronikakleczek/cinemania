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

const addTvShowToWatched = (username, tvShowId) => {
  return axios.post(API_URL + `watched/tv/add/${username}/${tvShowId}`, {}, {});
}

const getWatchedTvShows = (username) => {
  return axios.get(API_URL + `watched/tv/all/${username}`, {});
}

const addNewFriend = (username) => {
  return axios.post(API_URL + `user/friends/add/${username}`, {}, { headers: authHeader() });
}

const getAllFriends = () => {
  return axios.get(API_URL + `user/friends/all`, { headers: authHeader() });
}

const findFriendsByQuery = (query) => {
  return axios.get(API_URL + `user/friends/find/${query}`, {});
}

const getUserStats = () => {
  return axios.get(API_URL + `user/stats`, { headers: authHeader() });
}



const ApiCall = {
    getTrending,
    getGenres,
    getFilteredList,
    getQueriedList,
    getSinglePicture,
    getUserInfo,
    addMovieToWatched,
    getWatchedMovies,
    addTvShowToWatched,
    getWatchedTvShows,
    addNewFriend,
    getAllFriends,
    findFriendsByQuery,
    getUserStats
};

export default ApiCall;