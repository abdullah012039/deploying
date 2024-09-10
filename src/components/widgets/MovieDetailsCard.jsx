// import details card component
import styles from '../../styles/components/MovieDetailsCard.module.css';

// Create the MovieDetailsCard component
function MovieDetailsCard({ image, title, releaseDate, rating, overview, genres, runtime }) {
    return (
        <div className={styles.card}>
            <img src={`https://image.tmdb.org/t/p/w500${image}`} alt={title} className={styles.poster} />
            <div className={styles.details}>
                <h2 className={styles.title}>{title}</h2>
                <p className={styles.releaseDate}>Release Date: {releaseDate}</p>
                <p className={styles.rating}>Rating: {rating}/10</p>
                <p className={styles.runtime}>Runtime: {runtime} minutes</p>
                <p className={styles.genres}>Genres: {genres.join(', ')}</p>
                <h3 className={styles.overviewTitle}>Plot</h3>
                <p className={styles.overview}>{overview}</p>

            </div>
        </div>
    );
}

export default MovieDetailsCard;
