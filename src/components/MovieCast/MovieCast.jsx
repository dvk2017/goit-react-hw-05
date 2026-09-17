// src/components/MovieCast/MovieCast.jsx

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieCast } from "../../tmdb-api";
import CastCard from "../CastCard/CastCard";
import css from "./MovieCast.module.css";

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!movieId) return;

    async function fetchMovieCast() {
      setLoading(true);
      setError(false);

      try {
        const data = await getMovieCast(movieId);
        setCast(data);
      } catch (error) {
        console.error(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchMovieCast();
  }, [movieId]);

  return (
    <div className={css.container}>
      {loading && <p className={css.loading}>Loading cast...</p>}
      {error && <p className={css.error}>Failed to load cast.</p>}

      {cast.length > 0 && (
        <ul className={css.list}>
          {cast.map((castMember) => (
            <li key={castMember.id}>
              <CastCard castMember={castMember} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
