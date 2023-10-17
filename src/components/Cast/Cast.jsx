import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieCast } from 'components/movieAPI';
const defaultImg =
  'https://ireland.apollo.olxcdn.com/v1/files/0iq0gb9ppip8-UA/image;s=1000x700';

const Cast = () => {
  const { movieId } = useParams();
  const [casts, setCast] = useState([]);

  useEffect(() => {
    getMovieCast(movieId)
      .then(response => {
        setCast(response);
      })
      .catch(error => {
        console.error('Помилка завантаження акторського складу', error);
      });
  }, [movieId]);

  return (
    <div>
      <h2>Cast</h2>
      <ul>
        {casts && casts.cast ? (
          casts.cast.map(({ id, name, profile_path, character }) => (
            <li key={id}>
              <img
                src={
                  profile_path
                    ? `https://image.tmdb.org/t/p/w200${profile_path}`
                    : defaultImg
                }
                width="200"
                alt={name}
              />
              <p>{name}</p>
              <p>Character: {character}</p>
            </li>
          ))
        ) : (
          <p>Loading cast data...</p>
        )}
      </ul>
    </div>
  );
};

export default Cast;
