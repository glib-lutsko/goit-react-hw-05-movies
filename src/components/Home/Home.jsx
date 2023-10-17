import { getTrandingMovies } from 'components/movieAPI';
import React, { useEffect, useState } from 'react';

import { Link, useLocation } from 'react-router-dom';

const Home = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const location = useLocation();
  useEffect(() => {
    getTrandingMovies()
      .then(response => {
        setTrendingMovies(response.results);
      })
      .catch(error => {
        console.error('Помилка завантаження списку популярних фільмів', error);
      });
  }, []);

  return (
    <div>
      <h1>Список популярних фільмів</h1>
      <ul>
        {trendingMovies.map(movie => (
          <li key={movie.id}>
            <Link state={{ from: location }} to={`/movies/${movie.id}`}>
              {movie.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
