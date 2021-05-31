import { Component } from 'react';
import fetchMovies from '../services/apiService';

class HomeView extends Component {
  state = {
    movies: [],
  };

  componentDidMount() {
    const fetchOptions = {
      method: 'get',
      url: 'trending/movie/day',
    };

    this.fetchData(fetchOptions);
  }

  fetchData(options) {
    fetchMovies(options).then(response => {
      this.setState({ movies: response.results });
    });
  }

  render() {
    return (
      <>
        <h1>Trending today</h1>
        <ul className="movies-list">
          {this.state.movies.map(el => (
            <li key={el.id}>{el.original_title}</li>
          ))}
        </ul>
      </>
    );
  }
}

export default HomeView;
