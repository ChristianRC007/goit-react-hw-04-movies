import axios from 'axios';

const AUTH_KEY =
  'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZWM0ZDEwOGQ4MDc0NDVjNjM4NWZjMDBkZjNiNThiZiIsInN1YiI6IjYwYjRiYjRhYzc0MGQ5MDA3OWQ5MjJmZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bhauc9YWldg0iNw7d-k_WC1DCFYcSeYRFcTesUAtGtg';
axios.defaults.baseURL = 'https://api.themoviedb.org/3/';
axios.defaults.headers.common['Authorization'] = AUTH_KEY;

const fetchMovies = options => {
  return axios(options).then(response => response.data);
};

export default fetchMovies;
