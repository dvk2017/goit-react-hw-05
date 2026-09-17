import css from "./MovieDetails.module.css";

export default function MovieDetails({
  movieDetails: {
    title,
    release_date,
    poster_path,
    vote_average,
    overview,
    genres,
  },
}) {
  const posterUrl = `https://image.tmdb.org/t/p/w500/${poster_path}`;
  const releaseYear = release_date ? `(${release_date.slice(0, 4)})` : "";
  const userScore = vote_average ? Math.round(vote_average * 10) : "N/A";
  const genresList = genres.map((genre) => genre.name).join(" ");

  return (
    <div className={css.card}>
      {poster_path && (
        <img src={posterUrl} alt={title} className={css.poster} />
      )}

      <div className={css.info}>
        <h1 className={css.title}>
          {title} {releaseYear}
        </h1>
        <p className={css.score}>User Score: {userScore}%</p>

        <h2 className={css.subtitle}>Overview</h2>
        <p className={css.overview}>{overview || "No overview available."}</p>

        <h2 className={css.subtitle}>Genres</h2>
        <p className={css.genres}>{genresList}</p>
      </div>
    </div>
  );
}
