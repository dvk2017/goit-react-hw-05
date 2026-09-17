// src/tmdb-api.js

import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3";

const options = {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNWY3OGM0OTZiYWI3YTVkNDgwZDdmMDQyNjdhNzcxNCIsIm5iZiI6MTc4OTAzNzEwOC43NDUsInN1YiI6IjZhYTI4YTM0OGYxNjUzNzI0YTY5Mjk1YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YqvxbskMaGGB5Lcv20Y9fKOQFcEDcQk0rnyK7ZM_x-0",
  },
};

export const getTrendingMovies = async () => {
  const response = await axios.get("/trending/movie/week", options);
  return response.data.results;
};

export const getMoviesByQuery = async (query) => {
  const response = await axios.get("/search/movie", {
    ...options,
    params: { query },
  });
  return response.data.results;
};

export const getMovieById = async (movieId) => {
  const response = await axios.get(`/movie/${movieId}`, options);
  return response.data;
};

export const getMovieCast = async (movieId) => {
  const response = await axios.get(`/movie/${movieId}/credits`, options);
  return response.data.cast;
};

export const getMovieReviews = async (movieId) => {
  const response = await axios.get(`/movie/${movieId}/reviews`, options);
  return response.data.results;
};
