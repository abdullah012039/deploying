
// import hooks
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import useWatchList from '../features/hooks/useWatchlist';

// import styles
import styles from '../styles/pages/WatchlistPage.module.css';

// import FontAwesomeIcon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

function WatchlistPage() {
    const { id } = useParams();
    const { watchList, deleteItem, markDone } = useWatchList();
    const navigate = useNavigate();
    const watchlist = watchList.find(list => list.id === parseInt(id));

    if (!watchlist) {
        return <div className={styles.noWatchlist}>Watchlist not found</div>;
    }

    return (
        <div className={styles.container}>
            <button className={styles.backButton}>
                <FontAwesomeIcon icon={faArrowLeft} onClick={() => navigate('/watchlists')} />
            </button>
            <h1 className={styles.title}>{watchlist.title}</h1>
            {watchlist.items.length > 0 ? (
                <ul className={styles.movieList}>
                    {watchlist.items.map((item) => (
                        <li key={item.id} className={`${styles.movieItem} ${item.done ? styles.done : ''}`} onClick={() => navigate(`/movie/${item.id}`)}>
                            <img src={
                                item.poster_path
                                    ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                                    : 'https://via.placeholder.com/500x750'
                            } alt={item.title} width="100" className={styles.movieImage} />
                            <div className={styles.movieDetails}>
                                <h2 className={`${styles.movieTitle}`}>
                                    {item.title}
                                </h2>
                                <button onClick={(event) => { markDone(item.id); event.stopPropagation(); }} className={styles.button}>
                                    Mark as {item.done ? 'Undone' : 'Done'}
                                </button>
                                <button onClick={(event) => { deleteItem(item.id); event.stopPropagation(); }} className={styles.button}>
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className={styles.noWatchlist}>No items found in this watchlist</div>
            )}
        </div>
    );
}

export default WatchlistPage;
