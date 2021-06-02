import { Component } from 'react';
import { Link } from 'react-router-dom';
import fetchMovies from '../../services/apiService';

class MoviesPage extends Component {
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
    fetchMovies(fetchOptions)
      .then(response => {
        this.setState({ movies: response.results });
      })
      .catch(err => console.log(err));
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
            <li key={el.id}>
              <Link to={`${this.props.match.url}/${el.id}`}>
                {el.original_title}
              </Link>
            </li>
          ))}
        </ul>
      </>
    );
  }
}

export default MoviesPage;
