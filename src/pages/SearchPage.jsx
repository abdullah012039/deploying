// import hooks
import { useState } from 'react';
import {  useLocation , useNavigate } from 'react-router-dom';
import useSearch from '../features/hooks/useSearch';

// import mui components
import { Skeleton, Grid, Card, CardMedia, CardContent, Typography } from '@mui/material';
import Pagination from '@mui/material/Pagination';

 // import styles
import styles from '../styles/pages/SearchPage.module.css';

// import components
import WatchListIcon from "../components/common/Watchlisticon";

function SearchPage() {
  
  // define the variables
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('query');
  const category = queryParams.get('category');

  const { results, loading, totalPages } = useSearch(query, category, currentPage);

  //  get the image url
  const getImageUrl = (result) => {
    switch (category) {
      case 'movie':
      case 'tv':
        return result.poster_path
          ? `https://image.tmdb.org/t/p/w500${result.poster_path}`
          : 'https://via.placeholder.com/500x750?text=No+Image';
      case 'person':
        return result.profile_path
          ? `https://image.tmdb.org/t/p/w500${result.profile_path}`
          : 'https://via.placeholder.com/500x750?text=No+Image';
      case 'company':
        return result.logo_path
          ? `https://image.tmdb.org/t/p/w500${result.logo_path}`
          : 'https://via.placeholder.com/500x750?text=No+Image';
      case 'collection':
        return result.poster_path
          ? `https://image.tmdb.org/t/p/w500${result.poster_path}`
          : 'https://via.placeholder.com/500x750?text=No+Image';
      case 'network':
        return result.logo_path
          ? `https://image.tmdb.org/t/p/w500${result.logo_path}`
          : 'https://via.placeholder.com/500x750?text=No+Image';
      default:
        return 'https://via.placeholder.com/500x750?text=No+Image';
    }
  };


  // get the title
  const getTitle = (result) => {
    switch (category) {
      case 'movie':
      case 'collection':
        return result.title || result.name;
      case 'tv':
      case 'person':
      case 'company':
      case 'network':
      case 'keyword':
        return result.name;
      default:
        return 'No Title';
    }
  };

  // render the skeletons
  const renderSkeletons = () => (
    <Grid container spacing={3} className={styles.resultGrid}> 
      {Array.from(new Array(8)).map((_, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
          <Card className={styles.resultCard} >
            <Skeleton variant="rectangular" width="100%" height={300} />
            <CardContent>
              <Skeleton variant="text" width="60%" />
              <Skeleton variant="text" width="40%" />
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );

  return (
    <div className={styles.searchPage}>
      <Typography variant="h4" component="h2" className={styles.title}>
        Search Results for "{query}" in {category}
      </Typography>
      {loading && (
        renderSkeletons()
      ) || (
        results.length === 0 && (
          <Typography variant="h5" component="p" className={styles.noResults}>
            No results found
          </Typography>
        )
        ||
        (
          <>
            <Grid container spacing={3}>
              {results.length === 0 && category === 'keyword' ? (
                <Typography variant="h6" component="p" className={styles.noResults}>
                  No results for the keyword "{query}"
                </Typography>
              ) : (
                results.map((result) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={result.id} className={styles.resultGrid}>
                    <Card className={styles.resultCard}   onClick={() => navigate("/movie/" + result.id)} >
                     {category === 'movie' && (<WatchListIcon movie={result} />)} 
                      {category !== 'keyword' && (
                        <CardMedia
                          component="img"
                          alt={getTitle(result)}
                          image={getImageUrl(result)}
                          className={styles.media}
                        />
                      )}
                      <CardContent>
                        <Typography variant="h6" component="h3" className={styles.titleText}>
                          {getTitle(result)}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))
              )}
            </Grid>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(event, page) => setCurrentPage(page)}
              sx={{ marginTop: 4, display: 'flex', justifyContent: 'center' }}
              color="primary"
            />
          </>
        )
      )}
    </div>
  );
}

export default SearchPage;
