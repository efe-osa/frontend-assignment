import React from "react";
import styles from "./index.module.css";
import placeholder from "../../images/film-svgrepo-com.svg";

const MovieItem = ({ movie, imageUrl }) => {
  const { rating, title, image } = movie;
  return (
    <div className={styles.wrapper}>
      <small className={styles.rating}>{parseFloat(rating).toFixed(1)}</small>
      <figure className={styles.card}>
        <img
          src={image ? imageUrl + image : placeholder}
          alt={title}
          className={styles.image}
        />
        <figcaption className={styles.title}>{title}</figcaption>
      </figure>
    </div>
  );
};

export default MovieItem;
