// import hooks
import { useState } from 'react';
// import components
import FeaturedMoviesList from '../components/widgets/FeaturedMoviesList';
import UpNextMovies from '../components/widgets/UpNextMovies';
import IncomingMoviesList from '../components/widgets/IncomingMoviesList';
import TopRatedMoviesList from '../components/widgets/TopRatedMoviesList';
// import layout
import  Layouts from '../styles/layout/MainLayout.module.css';
import MainLayout from '../components/layout/MainLayout';

const HomePage = () => {
  const [movies, setMovies] = useState([]); 
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSetMovies = (moviesList, index) => {
    setMovies(moviesList);
    setCurrentIndex(index);
  };
  return (
    <MainLayout>
      <div className={Layouts.mainSlider}>
        <FeaturedMoviesList setMovies={handleSetMovies} />
      </div>
      <div className={`${Layouts.list} ${Layouts.hide}`}>
        <UpNextMovies movies={movies} currentIndex={currentIndex} />
      </div>
      <div className={Layouts.secondSlider}>
        <IncomingMoviesList />
      </div>
      <div className={Layouts.thirdSlider}>
        <TopRatedMoviesList />
      </div>
    </MainLayout>
  );
};

export default HomePage;
