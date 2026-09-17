// src/pages/HomePage/HomePage.jsx

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getMoviesByQuery } from "../../tmdb-api";
import MovieList from "../../components/MovieList/MovieList";
import css from "./MoviesPage.module.css";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") ?? "";
  const [inputValue, setInputValue] = useState(query);

  const updateSearchParams = (key, value) => {
    const updatedParams = new URLSearchParams(searchParams);
    value ? updatedParams.set(key, value) : updatedParams.delete(key);
    setSearchParams(updatedParams);
  };

  useEffect(() => {
    if (!query) {
      return;
    }

    async function fetchMovies() {
      try {
        setLoading(true);
        setError(false);
        const newMovies = await getMoviesByQuery(query);
        setMovies(newMovies);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, [query]);

  return (
    <div className={css.container}>
      <form
        className={css.searchForm}
        onSubmit={(e) => {
          e.preventDefault();
          updateSearchParams("query", inputValue.trim());
        }}
      >
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Search for movies..."
          className={css.searchInput}
        />
        <button
          type="button"
          className={css.searchButton}
          onClick={() => updateSearchParams("query", inputValue.trim())}
        >
          Search
        </button>
      </form>

      {loading && <p>Loading movies...</p>}
      {error && <p>Failed to load movies.</p>}

      {movies.length > 0 && (
        <>
          <h2>Search Results</h2>
          <MovieList movies={movies} />
        </>
      )}
    </div>
  );
}
