// import hooks
import { useState, useEffect } from 'react';

// import FontAwesomeIcon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark as solid } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as regular } from '@fortawesome/free-regular-svg-icons';

// import useWatchList hook
import useWatchList from '../../features/hooks/useWatchlist';

// import Modal component
import Modal from './Modal';

// import styles
import styles from '../../styles/components/WatchListIcon.module.css';


// Create the WatchListIcon component
function WatchListIcon({ movie }) {
    // create the state variables
    const { addItem, watchList, deleteItem, markDone } = useWatchList();
    const [isOnWatchList, setIsOnWatchList] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [pendingMovie, setPendingMovie] = useState(null);

    useEffect(() => {
        setIsOnWatchList(watchList.some((item) => item.items.some((i) => i.id === movie.id)));
    }, [watchList, movie.id]);

    const handleWatchlist = (event, movie) => {
        event.stopPropagation();
        if (isOnWatchList) {
            deleteItem(movie.id);
        } else {
            setPendingMovie({ ...movie, done: false });
            setIsModalOpen(true);
        }
    };

    const handleConfirmAdd = (watchlistId) => {
        if (pendingMovie) {
            const watchlist = watchList.find((list) => list.id == watchlistId);
            if (watchlist) {
                addItem({
                    ...watchlist,
                    items: [...watchlist.items, pendingMovie],
                });
            }
            setPendingMovie(null);
            setIsModalOpen(false);
        }
    };

    const handleCloseModal = () => {
        setPendingMovie(null);
        setIsModalOpen(false);
    };

    return (
        <>
            <div className={styles.watchlisticon} onClick={(event) => handleWatchlist(event, movie)}>
                <FontAwesomeIcon
                    icon={isOnWatchList ? solid : regular}
                    className={styles.bookmarkIcon}
                />
                <FontAwesomeIcon icon={solid} className={styles.solidbookmarkIcon} />
            </div>
            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onConfirm={handleConfirmAdd}
                message={`Are you sure you want to add "${pendingMovie?.title}" to your watchlist?`}
            />
        </>
    );
}

export default WatchListIcon;
