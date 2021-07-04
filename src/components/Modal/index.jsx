import React, { useRef, useEffect } from "react";
import close from "../../images/close-icon.svg";
import placeholder from "../../images/film-svgrepo-com.svg";
import styles from "./index.module.css";

const Modal = ({
  movie: { title, image, releaseDate = "-", rating = 0, overview, votes = 0 },
  closeModal,
  imageUrl,
}) => {
  const buttonRef = useRef(null);
  const handleKeyDown = (e) => {
    /enter/i.test(e.key.name) && closeModal();
  };
  
  useEffect(() => {
    buttonRef.current.focus();
  });

  return (
    <section data-testid="movie-modal" className={styles.modalOverlay}>
      <div className={styles.modalWrapper}>
        <div className={styles.modalHeader}>
          <h1 title="movie-title" className={styles.title}>
            {title}
          </h1>
          <button
            ref={buttonRef}
            type="button"
            className={styles.button}
            onClick={closeModal}
            onKeyDown={handleKeyDown}
          >
            <img src={close} alt="close" />
          </button>
        </div>
        <section className={styles.modalBody}>
          <img
            className={styles.movieImg}
            src={image ? imageUrl + image : placeholder}
            alt={title}
          />
          <div>
            <h2 title="release-date">
              <span className={styles.subtitle}>Release date: </span>
              {releaseDate}
            </h2>
            <p title="overview" className={styles["mt-1"]}>
              {overview}
            </p>
            <h3 title="rating" className={styles["mt-1"]}>
              <span className={styles.subtitle}>{rating}</span>
              /10 ({votes} total votes)
            </h3>
          </div>
        </section>
      </div>
    </section>
  );
};
export default Modal;
