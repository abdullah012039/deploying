// iimport hooks from react
import { useState, useEffect } from 'react';

const useWatchList = () => {
  // define the state variable
  const [watchList, setWatchList] = useState(() => {
    const storedWatchList = localStorage.getItem('watchList');
    return storedWatchList ? JSON.parse(storedWatchList) : [];
  });
// save the watchlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('watchList', JSON.stringify(watchList));
    } catch (error) {
      console.error('Failed to save watchlist to localStorage:', error);
    }
  }, [watchList]);

  // define the functions

  // add item to list
  const addItem = (updatedWatchList) => {
    setWatchList((prevList) =>
      prevList.map((list) =>
        list.id === updatedWatchList.id ? updatedWatchList : list
      )
    );
  };

  // delete item from list
  const deleteItem = (id) => {
    setWatchList((prevList) =>
      prevList.map((list) => ({
        ...list,
        items: list.items.filter((item) => item.id !== id),
      }))
    );
  };

  // delete list
  const deleteList = (id) => {
    setWatchList((prevList) => prevList.filter(list => list.id !== id));
  };

  // add list
  const addList = (newList) => {
    setWatchList((prevList) => [...prevList, newList]);
  };

  // highlight the item as done
  const markDone = (id) => {
    setWatchList((prevList) =>
      prevList.map((list) => ({
        ...list,
        items: list.items.map((item) =>
          item.id === id ? { ...item, done: !item.done } : item
        ),
      })
      )
    );
  };


  return {
    watchList,
    addItem,
    deleteItem,
    markDone,
    addList,
    deleteList
  };
};

export default useWatchList;
