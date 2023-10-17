import { searchMovie } from 'components/movieAPI';
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';

const Movies = () => {
  const [searchResults, setSearchResults] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  const query = searchParams.get('query');

  useEffect(() => {
    if (query) {
      const fetchMovies = async () => {
        try {
          const movieData = await searchMovie(query);
          setSearchResults(movieData);
        } catch (error) {
          console.error('Помилка під час завантаження фільмів', error);
        }
      };

      fetchMovies();
    }
  }, [query]);

  const handleFormSubmit = event => {
    event.preventDefault();
    const searchValue = event.currentTarget.elements.searchMovie.value;
    setSearchParams({ query: searchValue });
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <input name="searchMovie" type="text" />
        <button type="submit">Пошук</button>
      </form>
      <section>
        {query === null ? (
          <p>Введіть запит для пошуку фільмів</p>
        ) : searchResults === null ? (
          <p>Завантаження...</p>
        ) : searchResults.results.length === 0 ? (
          <p>Фільми за вашим запитом не знайдені</p>
        ) : (
          <ul>
            {searchResults.results.map(({ id, title }) => (
              <li key={id}>
                <Link state={{ from: location }} to={`/movies/${id}`}>
                  {title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default Movies;
