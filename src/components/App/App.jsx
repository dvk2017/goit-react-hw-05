// src/components/App/App.jsx

import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "../Layout/Layout";
import css from "./App.module.css";

const HomePage = lazy(() => import("../../pages/HomePage/HomePage"));
const MoviesPage = lazy(() => import("../../pages/MoviesPage/MoviesPage"));
const MovieDetailsPage = lazy(
  () => import("../../pages/MovieDetailsPage/MovieDetailsPage"),
);
const MovieCast = lazy(() => import("../MovieCast/MovieCast"));
const MovieReviews = lazy(() => import("../MovieReviews/MovieReviews"));
const NotFoundPage = lazy(
  () => import("../../pages/NotFoundPage/NotFoundPage"),
);

export default function App() {
  return (
    <div className={css.container}>
      <Layout>
        <Suspense fallback={<div>Loading page...</div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movies" element={<MoviesPage />} />
            <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
              <Route path="cast" element={<MovieCast />} />
              <Route path="reviews" element={<MovieReviews />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </Layout>
    </div>
  );
}
