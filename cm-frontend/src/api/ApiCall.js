import axios from "axios";
import authHeader from "../auth/AuthHeader";

const API_URL = "http://localhost:8081/pictures/";

const getTrending = () => {
  return axios.get(API_URL + "movie/trending", {});
};

const getGenres = (type) => {
  return axios.get(API_URL + `movie/genres?type=${type}`, {});
};

const getFilteredList = (filters, page, type) => {
  return axios.post(
    API_URL + `movie/filter?page=${page}&type=${type}`,
    Object.fromEntries(filters),
    {}
  );
};

const getQueriedList = (query, page) => {
  return axios.get(API_URL + `movie/query/${query}?page=${page}`, {});
};

const getSinglePicture = (id, type) => {
  return axios.get(API_URL + `${type}/${id}`, {});
};

const getUserInfo = (username) => {
  return axios.get(API_URL + `user/info/${username}`, {
    headers: authHeader(),
  });
};

const getUsernameById = (id) => {
  return axios.get(API_URL + `user/id/${id}`, { headers: authHeader() });
};

const addToWatched = (dto, type) => {
  return axios.post(API_URL + `watched/${type}/add`, JSON.stringify(dto), {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const getWatchedMovies = (username) => {
  return axios.get(API_URL + `watched/movie/all/${username}`, {});
};

const addTvShowToWatched = (username, tvShowId) => {
  return axios.post(API_URL + `watched/tv/add/${username}/${tvShowId}`, {}, {});
};

const getWatchedTvShows = (username) => {
  return axios.get(API_URL + `watched/tv/all/${username}`, {});
};

const addNewFriend = (username) => {
  return axios.post(
    API_URL + `user/friends/add/${username}`,
    {},
    { headers: authHeader() }
  );
};

const getAllFriends = () => {
  return axios.get(API_URL + `user/friends/all`, { headers: authHeader() });
};

const findFriendsByQuery = (query) => {
  return axios.get(API_URL + `user/friends/find/${query}`, {
    headers: authHeader(),
  });
};

const findUserByQuery = (query) => {
  console.log("im here!", query);
  return axios.get(API_URL + `user/find/${query}`, { headers: authHeader() });
};

const getUserStats = () => {
  return axios.get(API_URL + `user/stats`, { headers: authHeader() });
};

const getReviews = (id, type) => {
  return axios.get(API_URL + `${type}/${id}/reviews`, {});
};

const getRecommendedPictures = (id) => {
  return axios.get(API_URL + `movie/${id}/recommendations`, {});
};

const getIsWatched = (type, username, picture_id) => {
  return axios.get(
    API_URL + `watched/${type}/${picture_id}/${username}/isWatched`,
    {}
  );
};

const getScore = (type, username, picture_id) => {
  return axios.get(
    API_URL + `watched/${type}/${picture_id}/${username}/score`,
    {}
  );
};

const getReview = (type, username, picture_id) => {
  return axios.get(
    API_URL + `watched/${type}/${picture_id}/${username}/review`,
    {}
  );
};

const getRecentPictures = (type, id) => {
  return axios.get(API_URL + `watched/${type}/recent/${id}`, {});
};

const updateUserInfo = (firstName, lastName, email, password) => {
  axios.put(
    API_URL + `user/update`,
    { firstName, lastName, email, password },
    { headers: authHeader() }
  );
};

const removeFriendship = (userToRemoveId) => {
  axios.delete(API_URL + `user/friends/delete/${userToRemoveId}`, {
    headers: authHeader(),
  });
};

const deleteMyAccount = () => {
  axios.delete(API_URL + `user/delete`, { headers: authHeader() });
};

const deleteUser = (id) => {
  axios.delete(API_URL + `user/delete/${id}`, { headers: authHeader() });
};

const ApiCall = {
  getTrending,
  getGenres,
  getFilteredList,
  getQueriedList,
  getSinglePicture,
  getUserInfo,
  getUsernameById,
  addToWatched,
  getWatchedMovies,
  addTvShowToWatched,
  getWatchedTvShows,
  addNewFriend,
  getAllFriends,
  findFriendsByQuery,
  findUserByQuery,
  getUserStats,
  getReviews,
  getRecommendedPictures,
  getIsWatched,
  getScore,
  getReview,
  getRecentPictures,
  updateUserInfo,
  removeFriendship,
  deleteMyAccount,
  deleteUser,
};

export default ApiCall;
