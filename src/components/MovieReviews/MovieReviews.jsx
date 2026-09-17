// src/components/MovieReviews/MovieReviews.jsx

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieReviews } from "../../tmdb-api";
import ReviewCard from "../ReviewCard/ReviewCard";
import css from "./MovieReviews.module.css";

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!movieId) return;

    async function fetchMovieReviews() {
      setLoading(true);
      setError(false);

      try {
        const data = await getMovieReviews(movieId);
        setReviews(data);
      } catch (error) {
        console.error(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchMovieReviews();
  }, [movieId]);

  return (
    <div className={css.container}>
      {loading && <p className={css.loading}>Loading reviews...</p>}
      {error && <p className={css.error}>Failed to load reviews.</p>}

      {reviews.length > 0 ? (
        <ul className={css.list}>
          {reviews.map((review) => (
            <li key={review.id}>
              <ReviewCard review={review} />
            </li>
          ))}
        </ul>
      ) : (
        !loading &&
        !error && (
          <p className={css.noReviews}>
            We don`t have any reviews for this movie.
          </p>
        )
      )}
    </div>
  );
}
