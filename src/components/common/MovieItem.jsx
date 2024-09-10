// import styles 
import styles from '../../styles/components/MovieItem.module.css';

// import FontAwesomeIcon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

// import WatchListIcon component
import WatchListIcon from './watchlisticon';

// Create the MovieItem component
const MovieItem = ({ movie, onPlayTrailer }) => {
  return (
    <div className={styles.movieItem} onClick={onPlayTrailer}>
      <WatchListIcon movie={movie} />
      <div className={styles.poster}>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      </div>
      <div className={styles.info}>
        <button  className={styles.playButton}>
          <FontAwesomeIcon icon={faPlay} />
        </button>
        <div className={styles.details}>
          <h3>{movie.title}</h3>
          <p>{movie.release_date}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieItem;
