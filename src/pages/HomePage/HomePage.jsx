// src/pages/MoviesPage/MoviesPage.jsx

import { useEffect, useState } from "react";
import { getTrendingMovies } from "../../tmdb-api";
import MovieList from "../../components/MovieList/MovieList";
import css from "./HomePage.module.css";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchMovies() {
      const movies = await getTrendingMovies();
      setMovies(movies);
    }

    fetchMovies();
  }, []);

  return (
    <div className={css.container}>
      <h2>Trending today</h2>
      <MovieList movies={movies} />
    </div>
  );
}
