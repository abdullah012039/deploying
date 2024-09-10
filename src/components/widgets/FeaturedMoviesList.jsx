// import Swiper library to move the slider by swiping
import { useSwipeable } from 'react-swipeable';

// import the FeaturedListState hook
import FeaturedListState from '../../features/hooks/useFeaturedList';

// import the styles
import styles from '../../styles/components/Movies.module.css';

// import the MovieCard component
import MovieCard from '../common/MovieCard';

// import the FontAwesomeIcon component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const FeaturedMoviesList = ({ setMovies }) => {
  // get hooks from the FeaturedListState
  const {
    movies,
    loading,
    error,
    currentIndex,
    movetoLeft,
    movetoRight,
    setShowTrailer,
  } = FeaturedListState(setMovies);

  // handle the swipe
  const handlers = useSwipeable({
    onSwipedLeft: () => movetoRight(),
    onSwipedRight: () => movetoLeft(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  // get the previous and next index
  const previousIndex = currentIndex === 0 ? movies.length - 1 : currentIndex - 1;
  const nextIndex = currentIndex === movies.length - 1 ? 0 : currentIndex + 1;

  return (
    <div
      {...handlers}
      onMouseEnter={() => setShowTrailer(true)}
      onMouseLeave={() => setShowTrailer(false)}
      className={styles.slider}
    >
      <div className={styles.rows}>
        <>
          <MovieCard
            key={movies[previousIndex].id}
            movie={movies[previousIndex]}
            className={styles.previous}
          />
          <MovieCard
            key={movies[currentIndex].id}
            movie={movies[currentIndex]}
            isHidden={false}
            className={styles.current}
          />
          <MovieCard
            key={movies[nextIndex].id}
            movie={movies[nextIndex]}
            className={styles.next}
          />
        </>
      </div>
      <button onClick={movetoLeft} className={styles.leftButton}><FontAwesomeIcon icon={faChevronLeft} /></button>
      <button onClick={movetoRight} className={styles.rightButton}><FontAwesomeIcon icon={faChevronRight} /></button>
    </div>
  );
};

export default FeaturedMoviesList;