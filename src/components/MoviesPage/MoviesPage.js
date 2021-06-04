import { Component } from 'react';
import { Link } from 'react-router-dom';
import fetchMovies from '../../services/apiService';
import queryString from 'query-string';

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
    const fetchOptions = {
      method: 'get',
      url: '/search/movie?',
      params: {
        query: this.state.query,
      },
    };
    this.onQueryChange(this.state.query);
    e.preventDefault();
    fetchMovies(fetchOptions)
      .then(response => {
        this.setState({ movies: response.results });
      })
      .catch(err => console.log(err));
  };

  onQueryChange = query => {
    this.props.history.push({
      pathname: this.props.location.pathname,
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
          {this.state.movies.map(el => (
            <li key={el.id}>
              <Link
                to={{
                  pathname: `${this.props.match.url}/${el.id}`,
                  state: {
                    from: this.props.location,
                  },
                }}
              >
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
