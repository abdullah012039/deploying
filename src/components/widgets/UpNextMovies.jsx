// import movie item component
import MovieItem from '../common/MovieItem';

// import styles
import styles from '../../styles/components/UpNextMovies.module.css';

// import useNavigate
import { useNavigate } from 'react-router-dom';


// create the UpNextMovies list component
const UpNextMovies = ({ movies, currentIndex }) => {
  const navigate = useNavigate();

  
  const validIndex = Math.max(0, currentIndex - 1);
  const movieBeforeCurrent = movies.slice(0, validIndex + 1);
  const moviesToDisplay = [...movies.slice(currentIndex+1)].length < 3 ?  [...movies.slice(currentIndex+1), ...movieBeforeCurrent].filter(Boolean).slice(0, 3) : [...movies.slice(currentIndex+1)].slice(0, 3);


  return (
    <div className={styles.upNextContainer}>
      <h2>Up Next Movies</h2>
      <div className={styles.moviesList}>
        {moviesToDisplay.map((movie) => (
          <MovieItem
            key={movie.id}
            movie={movie}
            onPlayTrailer={() => navigate(`/trailer/${movie.id}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default UpNextMovies;
