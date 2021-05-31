import { Component } from 'react';
import fetchMovies from '../services/apiService';

class MoviesView extends Component {
  state = {
    query: '',
    movies: [],
  };

  handleChange = e => {
    this.setState({ query: e.currentTarget.value });
  };

  handleSubmit = e => {
    const fetchOptions = {
      method: 'get',
      url: '/search/movie?',
      params: {
        query: this.state.query,
      },
    };
    e.preventDefault();
    fetchMovies(fetchOptions).then(response => {
      this.setState({ movies: response.results });
    });
  };

  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit} className="search-form">
          <input
            type="text"
            value={this.state.query}
            onChange={this.handleChange}
          />
          <button>Search</button>
        </form>
        <ul className="movies-list">
          {this.state.movies.map(el => (
            <li key={el.id}>{el.original_title}</li>
          ))}
        </ul>
      </>
    );
  }
}

export default MoviesView;
