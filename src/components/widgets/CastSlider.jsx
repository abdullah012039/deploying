// import hooks
import { useEffect, useState } from 'react';

// import Slider library
import Slider from 'react-slick';


import styles from '../../styles/components/CastSlider.module.css'; // Assuming you're using CSS modules

// get the movie credits from the tmdbApi
import { getMovieCredits } from '../../services/tmdbApi';


// Create the CastSlider component
const CastSlider = ({ movieId }) => {
  const [cast, setCast] = useState([]);

  // get the cast of the movie
  useEffect(() => {
    const fetchCast = async () => {
      try {
        const response = await getMovieCredits(movieId);
        setCast(response.cast);
      } catch (error) {
        console.error('Failed to fetch cast:', error);
      }
    };

    fetchCast();
  }, [movieId]);

  // settings for the slider
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 8,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  return (
    <div className={styles.castSliderContainer}>
      <Slider {...settings}>
        {cast.map((member) => (
          <div key={member.id} className={styles.castCard}>
            <img
              src={`https://image.tmdb.org/t/p/w200/${member.profile_path}`}
              alt={member.name}
              className={styles.castImage}
            />
            <div className={styles.castCardContent}>
              <h6>{member.name}</h6>
              <p>{member.character}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CastSlider;