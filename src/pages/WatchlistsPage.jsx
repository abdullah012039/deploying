import { useState } from 'react';
import useWatchList from '../features/hooks/useWatchlist';
import styles from '../styles/pages/WatchlistsPage.module.css';
import { useNavigate } from 'react-router-dom';

function WatchlistsPage() {
    const { watchList, deleteList, markDone, addList } = useWatchList();
    const [newListTitle, setNewListTitle] = useState('');
    const navigate = useNavigate();

    const handleAddList = (e) => {
        e.preventDefault();
        if (newListTitle.trim()) {
            const newList = {
                id: Date.now(), // Unique ID for the list
                title: newListTitle,
                done: false,
                items: [] // Start with an empty list of items
            };
            addList(newList);
            setNewListTitle('');
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Watchlists</h1>
            <form onSubmit={handleAddList} className={styles.addListForm}>
                <input
                    type="text"
                    value={newListTitle}
                    onChange={(e) => setNewListTitle(e.target.value)}
                    placeholder="Add new watchlist"
                    className={styles.addListInput}
                />
                <button type="submit" className={styles.addListButton}>Add Watchlist</button>
            </form>
            {watchList.length > 0 ? (
                <ul className={styles.watchlist}>
                    {watchList.map((list) => (
                        <li
                            key={list.id}
                            className={`${styles.watchlistItem} ${list.done ? styles.done : ''}`}
                            onClick={() => navigate(`/watchlist/${list.id}`)}
                        >
                            <div className={styles.watchlistDetails}>
                                <h2 className={styles.watchlistTitle}>{list.title}</h2>
                                <button onClick={(event) => { deleteList(list.id); event.stopPropagation(); }} className={styles.button}>
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className={styles.noWatchlist}>No watchlists found</div>
            )}
        </div>
    );
}

export default WatchlistsPage;
