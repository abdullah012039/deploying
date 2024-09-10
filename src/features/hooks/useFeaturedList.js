// imports 
import { useState, useEffect } from "react";
import { getPopularMovies } from "../../services/tmdbApi";
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';

// custom hook to fetch popular movies
const useFeaturedMovies = (setMovies) => {

  // define states 
  const [movies, setLocalMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showTrailer, setShowTrailer] = useState(false);

  // define ref
  const intervalIdRef = useRef(null);


  const navigate = useNavigate();

  // fetch popular movies
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getPopularMovies();
        setLocalMovies(data.results);
        setMovies(data.results, currentIndex);
      } catch (error) {
        setError('Failed to load popular movies.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [setMovies, currentIndex]);


  // move sider auto 
  useEffect(() => {
    const startInterval = setInterval(() => {
      if (!showTrailer) {
        setCurrentIndex((prevIndex) => (prevIndex === movies.length - 1 ? 0 : prevIndex + 1));
      }
    }, 10000);
    intervalIdRef.current = startInterval ;

    return () => clearInterval(intervalIdRef.current);
  }, [movies.length, showTrailer]);
  
  // move slider manually
  const movetoLeft = () => {
      setCurrentIndex((prevIndex) => (prevIndex === 0 ? movies.length - 1 : prevIndex - 1));
  };
  const movetoRight = () => {
      setCurrentIndex((prevIndex) => (prevIndex === movies.length - 1 ? 0 : prevIndex + 1));
  };




  return {
    movies,
    loading,
    error,
    currentIndex,
    showTrailer,
    movetoLeft,
    movetoRight,
    setShowTrailer,
  };
};

export default useFeaturedMovies;
