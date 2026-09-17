// src/components/Layout/Layout.jsx

import Navigation from "../Navigation/Navigation";
import css from "./Layout.module.css";

export default function Layout({ children }) {
  return (
    <div className={css.container}>
      <Navigation />
      <div className={css.wrapper}>{children}</div>
    </div>
  );
}
