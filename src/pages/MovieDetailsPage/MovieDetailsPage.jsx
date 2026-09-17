// src/pages/MovieDetailsPage/MovieDetailsPage.jsx

import { Suspense, useEffect, useState } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from "react-router-dom";
import { getMovieById } from "../../tmdb-api";
import MovieDetails from "../../components/MovieDetails/MovieDetails";
import css from "./MovieDetailsPage.module.css";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const location = useLocation();
  const [backLink] = useState(() => location.state ?? "/movies");

  useEffect(() => {
    if (!movieId) return;

    async function fetchMovieDetails() {
      setLoading(true);
      setError(false);

      try {
        const data = await getMovieById(movieId);
        setMovie(data);
      } catch (error) {
        console.error(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchMovieDetails();
  }, [movieId]);

  return (
    <div className={css.container}>
      <Link to={backLink} className={css.backBtn}>
        ← Go back
      </Link>

      {loading && <p className={css.loading}>Loading movie details...</p>}
      {error && <p className={css.error}>Failed to load movie details.</p>}

      {movie && (
        <>
          <MovieDetails movieDetails={movie} />

          <div className={css.additionalSection}>
            <p className={css.additionalTitle}>Additional information</p>
            <ul className={css.linksList}>
              <li>
                <NavLink
                  to="cast"
                  className={({ isActive }) =>
                    isActive ? `${css.link} ${css.activeLink}` : css.link
                  }
                >
                  Cast
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="reviews"
                  className={({ isActive }) =>
                    isActive ? `${css.link} ${css.activeLink}` : css.link
                  }
                >
                  Reviews
                </NavLink>
              </li>
            </ul>
          </div>

          <Suspense fallback={<p>Loading additional info...</p>}>
            <Outlet />
          </Suspense>
        </>
      )}
    </div>
  );
}
