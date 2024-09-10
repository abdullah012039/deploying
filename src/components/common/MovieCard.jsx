// import hooks
import  { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// import styles
import styles from '../../styles/components/Movies.module.css';

// import FontAwesomeIcon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

// import WatchListIcon
import WatchListIcon from './watchlisticon';

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  const handlePlayTrailer = () => {
    navigate(`/trailer/${movie.id}`);
  };

  return (
    <div
      className={styles.card}
      onClick={handlePlayTrailer}
    >
      <div className={styles.image} style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})` }} ></div>
      <div className={styles.cardBody}>
        <div className={styles.posterContainer}>
          <div className={styles.poster}>
            <img src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} alt={movie.title} />
          </div>
          <WatchListIcon movie={movie} />
        </div>
        <button className={styles.playButton}>
          {/* icon play */}
          <FontAwesomeIcon icon={faPlay} />
        </button>
        <div className={styles.content}>
          <h2>{movie.title}</h2>
          <p>{movie.overview}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
