import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieReviews } from 'components/movieAPI';

const Reviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getMovieReviews(movieId)
      .then(response => {
        setReviews(response);
      })
      .catch(error => {
        console.error('Помилка завантаження відгуків', error);
      });
  }, [movieId]);

  return (
    <div>
      <h2>Reviews</h2>
      <ul>
        {reviews.length > 0 ? (
          reviews.map(review => (
            <li key={review.id}>
              <h3>{review.author}</h3>
              <p>{review.content}</p>
            </li>
          ))
        ) : (
          <p>No reviews available for this movie.</p>
        )}
      </ul>
    </div>
  );
};

export default Reviews;
