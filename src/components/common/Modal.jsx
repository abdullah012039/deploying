// import hooks and reactdom
import { useState } from 'react';
import ReactDOM from 'react-dom';

// import the styles
import styles from '../../styles/components/Modal.module.css';
import useWatchList from '../../features/hooks/useWatchlist';

function Modal({ isOpen, onClose, onConfirm, message }) {
    const { watchList } = useWatchList();
    const [selectedWatchlistId, setSelectedWatchlistId] = useState('');

    if (!isOpen) return null;

    const handleConfirm = () => {
        console.log(selectedWatchlistId);
        onConfirm(selectedWatchlistId);
        setSelectedWatchlistId(''); // Reset selected watchlist
    };

    return ReactDOM.createPortal(
        <div className={styles.overlay} onClick={(event) => {event.stopPropagation(); }}>
            <div className={styles.modal}>
                <h2>{message}</h2>
                <div className={styles.select}>
                    <select
                        name="watchlist"
                        id="watchlist"
                        onChange={(e) => setSelectedWatchlistId(e.target.value)}
                        value={selectedWatchlistId}
                    >
                        <option value="">Select a watchlist</option>
                        {watchList.map((list) => (
                            <option key={list.id} value={list.id}>
                                {list.title}
                            </option>
                        ))}
                    </select>
                </div>
                <div className={styles.actions}>
                    <button onClick={(event) => { handleConfirm(); event.stopPropagation(); }} className={styles.confirmButton}>Confirm</button>
                    <button onClick={(event) => { onClose(); event.stopPropagation(); }} className={styles.cancelButton}>Cancel</button>
                </div>
            </div>
        </div>,
        document.body
    );
}

export default Modal;
