// src/components/ReviewCard/ReviewCard.jsx

import css from "./ReviewCard.module.css";

export default function ReviewCard({ review: { author, content } }) {
  return (
    <div className={css.card}>
      <h3 className={css.author}>Author: {author}</h3>
      <p className={css.content}>{content}</p>
    </div>
  );
}
