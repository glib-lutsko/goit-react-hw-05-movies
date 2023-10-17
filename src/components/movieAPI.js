const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiN2Y0NmViZjcxYmJmZmU3NDEzNWU2NzYxOWRhNzY2NSIsInN1YiI6IjY1MmJlYTM0MDI0ZWM4MDBhZWNiZTlkYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.klPQQBJe5Lhk9HVnJ4xE_40TAG5Ue_X8mgHZEIXawIE',
  },
};

export const getTrandingMovies = () =>
  fetch(
    'https://api.themoviedb.org/3/trending/movie/day?language=en-US',
    options
  ).then(response => response.json());

export const searchMovie = movie =>
  fetch(
    `https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&language=en-US&page=1`,
    options
  ).then(response => response.json());

export const getMovieDetails = movieId =>
  fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
    options
  ).then(response => response.json());

export const getMovieCast = id =>
  fetch(
    `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`,
    options
  ).then(response => response.json());

export const getMovieReviews = id =>
  fetch(
    `https://api.themoviedb.org/3/movie/${id}/reviews?language=en-US&page=1`,
    options
  ).then(response => response.json());
