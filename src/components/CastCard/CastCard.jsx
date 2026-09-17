// src/components/CastCard/CastCard.jsx

import css from "./CastCard.module.css";

export default function CastCard({
  castMember: { name, character, profile_path },
}) {
  const profileUrl = `https://image.tmdb.org/t/p/w500/${profile_path}`;

  return (
    <div className={css.card}>
      {profile_path && (
        <img src={profileUrl} alt={name} className={css.poster} />
      )}
      <div className={css.info}>
        <p className={css.name}>{name}</p>
        <p className={css.character}>Character: {character}</p>
      </div>
    </div>
  );
}
