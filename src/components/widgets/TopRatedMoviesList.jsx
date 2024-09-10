// import hooks
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// get the top rated movies from the tmdbApi
import { getTopRatedMovies } from '../../services/tmdbApi';

// import Slider library
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// import mui components
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';

// import styles
import styles from '../../styles/components/IncomingMoviesList.module.css';

// import WatchListIcon component
import WatchListIcon from '../common/watchlisticon';


function TopRatedMoviesList() {
    const [movies, setLocalMovies] = useState([]);
    const navigate = useNavigate();
    const handelMovieDetails = (movie) => {
        navigate(`/movie/${movie.id}`);
    };
    useEffect(() => {
        const fetchMovies = async () => {
            const response = await getTopRatedMovies();
            setLocalMovies(response.results);
        };
        fetchMovies();
    }, []);

    const sliderSettings = {
        infinite: true,
        speed: 500,
        slidesToShow: 7,  
        slidesToScroll: 7,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 5,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            }
        ]
    };

    const currentDate = new Date();
    
    return (
        <Box sx={{ padding: '20px' }}>
            <Slider {...sliderSettings}>
                {movies.map(movie => {
                    const movieDate = new Date(movie.release_date);
                    const isRecent = (currentDate - movieDate) < (365 * 24 * 60 * 60 * 1000); // Released within the past year
                    const isTrained = movie.vote_average >= 8 && isRecent;

                    return (
                        <Card
                            key={movie.id}
                            className={isTrained ? `${styles.card} ${styles.trained}` : styles.card}
                            onClick={() => handelMovieDetails(movie)}
                        >
                            <div className={styles.cardMediaContainer}>
                            <CardMedia
                                component="img"
                                className={styles.cardMedia}  
                                image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title}
                            />
                            <WatchListIcon movie={movie} />
                            </div>
                            <CardContent className={styles.movieDetails}>
                                <Typography gutterBottom variant="h6" component="div">
                                    <div className={styles.movieTitle}>{movie.title}</div> 
                                </Typography>
                                <Typography variant="body2" color="inherit">
                                    {movie.overview.length > 20
                                        ? movie.overview.substring(0, 20) + "..."
                                        : movie.overview}
                                </Typography>
                            </CardContent>
                        </Card>
                    );
                })}
            </Slider>
        </Box>
    );
}

export default TopRatedMoviesList;
