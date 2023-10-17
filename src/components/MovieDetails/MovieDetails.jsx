import React, { useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import { getMovieDetails } from 'components/movieAPI';
import { useRef } from 'react';

const defaultImg =
  'https://ireland.apollo.olxcdn.com/v1/files/0iq0gb9ppip8-UA/image;s=1000x700';

const MovieDetails = () => {
  const location = useLocation();
  const backLinkHref = useRef(location.state?.from ?? '/');

  const { movieId } = useParams();
  const [movieData, setMovieData] = useState(null);

  useEffect(() => {
    getMovieDetails(movieId)
      .then(response => {
        setMovieData(response);
      })
      .catch(error => {
        console.error('Помилка завантаження деталей фільму', error);
      });
  }, [movieId]);

  if (!movieData) {
    return <div>Loading...</div>;
  }

  const { title, release_date, overview, genres, vote_average, poster_path } =
    movieData;

  const date = new Date(release_date);
  const year = date.getFullYear();

  const userScoreInPercent = (vote_average * 10).toFixed(0);

  return (
    <>
      <Link to={backLinkHref.current}>Go Back</Link>
      <h1>
        {title} ({year})
      </h1>
      <img
        src={
          poster_path
            ? `https://image.tmdb.org/t/p/w300${poster_path}`
            : defaultImg
        }
        alt={title}
      />
      <h2>Overview</h2>
      <p>{overview}</p>
      <p>User Score: {userScoreInPercent}%</p>
      <h2>Genres</h2>
      <p> {genres.map(genre => genre.name).join(', ')}</p>
      <h2>Additional information</h2>
      <ul>
        <li>
          <Link to={`/movies/${movieId}/cast`}>View Cast</Link>
        </li>
        <li>
          <Link to={`/movies/${movieId}/reviews`}>View Reviews</Link>
        </li>
      </ul>
      <Outlet />
    </>
  );
};

export default MovieDetails;
