import React, { useEffect, useMemo, useState, Suspense, useRef } from "react";
import request from "../../helpers/request";
import MovieItem from "../MovieItem";
import styles from "./index.module.css";

const Modal = React.lazy(() => import("../Modal"));

const Movies = ({ searchItem }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [currentMovie, setCurrentMovie] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const imageUrl = useRef("");

  const updateMovieModal = (value) => {
    setCurrentMovie(value);
    setIsOpen(true);
  };
  const handleKeyDown = (e, value) => {
    /enter/i.test(e.key) && updateMovieModal(value);
  };
  const closeModal = () => {
    setIsOpen(false);
    setCurrentMovie({});
  };

  async function fetchMovies(signal) {
    const lastFetched = localStorage.getItem("T_lastFetched") || 0;
    const now = Date.now() / 1000;
    const expiration = 86400;
    const isExpired = now - lastFetched >= expiration;
    const config = {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
      signal,
    };
    if (isExpired) {
      return await Promise.all([
        request(
          "/discover/movie",
          config,
          `&language=en-US&sort_by=release_date.desc&year=${new Date().getFullYear()}&page=1`
        ),
        request("/configuration", config),
      ]);
    } else {
      return [
        await request(
          "/movie/now_playing",
          config,
          `&language=en-US&sort_by=release_date.desc&year=${new Date().getFullYear()}&page=1`
        ),
        localStorage.getItem("T_lastImagerl"),
      ];
    }
  }

  useEffect(() => {
    setLoading(true);
    const { signal } = new AbortController();
    try {
      (async () => {
        const [movieList, config] = await fetchMovies(signal);
        if (typeof config === "string") {
          imageUrl.current = config;
        } else {
          const { images } = config;
          const imageDomain = `${images.base_url}w500`;
          imageUrl.current = imageDomain;
          localStorage.setItem("T_lastFetched", (Date.now() / 1000).toString());
          localStorage.setItem("T_lastImagerl", imageDomain);
        }
        setMovies(movieList.results);
      })();
    } catch (error) {
      setError(error.message);
      console.error("error", error.message);
    } finally {
      setLoading(false);
    }
    return () => {};
  }, []);

  const filteredMovies = useMemo(
    () =>
      movies.filter((movie) => {
        const pattern = new RegExp(searchItem, "i");
        return pattern.test(movie.title);
      }),
    [movies, searchItem]
  );

  return (
    <>
      <h1 className={styles.heading}>Most Recent Movies</h1>
      {error ? (
        <h1 className={styles.error}>Error loading movies! Please try again</h1>
      ) : loading ? (
        <h1 title="loader" className={styles.loader}>
          Loading...
        </h1>
      ) : (
        <>
          <dl title="movies-list" className={styles.gridWrapper}>
            {updateMovieModal.length > 0 ? (
              filteredMovies.map(
                (
                  {
                    poster_path: image,
                    overview,
                    release_date: releaseDate,
                    title,
                    vote_average: rating,
                    vote_count: votes,
                  },
                  idx
                ) => (
                  <dd
                    data-testid="movie-item"
                    tabIndex="0"
                    onClick={() =>
                      updateMovieModal({
                        image,
                        releaseDate,
                        rating,
                        overview,
                        title,
                        votes,
                      })
                    }
                    onKeyDown={(e) =>
                      handleKeyDown(e, {
                        image,
                        releaseDate,
                        rating,
                        overview,
                        title,
                        votes,
                      })
                    }
                    key={image + idx}
                  >
                    <MovieItem
                      imageUrl={imageUrl.current}
                      movie={{
                        title,
                        image,
                        releaseDate,
                        rating,
                        overview,
                        votes,
                      }}
                    />
                  </dd>
                )
              )
            ) : (
              <h1 className={styles.noContent}> No movies found!</h1>
            )}
          </dl>
          <Suspense fallback={<div />}>
            {isOpen && (
              <Modal
                closeModal={closeModal}
                movie={currentMovie}
                imageUrl={imageUrl.current}
              />
            )}
          </Suspense>
        </>
      )}
    </>
  );
};

export default Movies;
