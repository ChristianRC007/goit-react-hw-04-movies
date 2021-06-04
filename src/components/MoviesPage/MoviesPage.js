import { Component } from 'react';
import { Link } from 'react-router-dom';
import fetchMovies from '../../services/apiService';
import queryString from 'query-string';

import './MoviesPage.scss';

class MoviesPage extends Component {
  state = {
    query: '',
    movies: [],
  };

  componentDidMount() {
    const searchQuery = this.getQueryFromProps(this.props);

    if (searchQuery.query === undefined) {
      return;
    }

    const fetchOptions = {
      method: 'get',
      url: '/search/movie?',
      params: {
        query: searchQuery.query,
      },
    };

    fetchMovies(fetchOptions)
      .then(response => {
        this.setState({ movies: response.results });
      })
      .catch(err => console.log(err));
  }

  handleChange = e => {
    this.setState({ query: e.currentTarget.value });
  };

  handleSubmit = e => {
    const { query } = this.state;

    const fetchOptions = {
      method: 'get',
      url: '/search/movie?',
      params: {
        query: query,
      },
    };
    this.onQueryChange(query);
    e.preventDefault();
    fetchMovies(fetchOptions)
      .then(response => {
        this.setState({ movies: response.results });
      })
      .catch(err => console.log(err));
  };

  onQueryChange = query => {
    const { history, location } = this.props;

    history.push({
      pathname: location.pathname,
      search: `query=${query}`,
    });
  };

  getQueryFromProps = props => queryString.parse(props.location.search);

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
          {this.state.movies.map(({ id, original_title }) => (
            <li key={id} className="movies-list__item">
              <Link
                to={{
                  pathname: `${this.props.match.url}/${id}`,
                  state: {
                    from: this.props.location,
                  },
                }}
              >
                {original_title}
              </Link>
            </li>
          ))}
        </ul>
      </>
    );
  }
}

export default MoviesPage;
