import { Component } from 'react';
import { Link } from 'react-router-dom';
import fetchMovies from '../../services/apiService';

class HomePage extends Component {
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
    fetchMovies(options)
      .then(response => {
        this.setState({ movies: response.results });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <>
        <h1>Trending today</h1>
        <ul className="movies-list">
          {this.state.movies.map(({ id, original_title }) => (
            <li key={id} className="movies-list__item">
              <Link
                to={{
                  pathname: `/movies/${id}`,
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

export default HomePage;
