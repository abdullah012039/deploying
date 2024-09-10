// import hooks
import { useLocation } from 'react-router-dom';

// import styles
import styles from '../styles/layout/MainLayout.module.css';
import style1 from '../styles/components/Movies.module.css';

// import components
import IncomingMoviesList from '../components/widgets/IncomingMoviesList';
import DetailsCard from '../components/common/DetailsCard';
import TopRatedMoviesList from '../components/widgets/TopRatedMoviesList';
import useMovieInfo from '../features/hooks/useMovieInfo';

const TrailerPage = () => {
  const id = useLocation().pathname.split('/')[2];
  const { trailerUrl, movieDetails, loading, error } = useMovieInfo(id);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.container}>
      <div className={styles.mainSlider}>
        {trailerUrl ? (
          <div className={style1.rows}>
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${trailerUrl.results[0].key}`}
              title="Movie Trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        ) : (
          <p>Trailer not available</p>
        )}
      </div>
      <div className={styles.list}>
        {movieDetails ? (
          <DetailsCard
            id={movieDetails.id}
            poster={movieDetails.poster_path}
            title={movieDetails.title}
            releaseDate={movieDetails.release_date}
            rating={movieDetails.vote_average}
          />
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <div className={styles.secondSlider}>
        <IncomingMoviesList />
      </div>
      <div className={styles.thirdSlider}>
        <TopRatedMoviesList />
      </div>
    </div>
  );
};

export default TrailerPage;
