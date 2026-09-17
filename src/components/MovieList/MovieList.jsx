// src/components/MovieList/MovieList.jsx

import { Link, useLocation } from "react-router-dom";
import css from "./MovieList.module.css";

export default function MovieList({ movies }) {
  const location = useLocation();

  return (
    <div>
      {movies.length > 0 && (
        <ul className={css.container}>
          {movies.map(({ id, title }) => (
            <li key={id}>
              <Link className={css.link} to={`/movies/${id}`} state={location}>
                {title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
