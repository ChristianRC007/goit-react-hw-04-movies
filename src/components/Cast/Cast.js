import { Component } from 'react';
import fetchMovies from '../../services/apiService';

import './Cast.scss';

class Cast extends Component {
  state = { cast: [] };

  componentDidMount() {
    const fetchOptions = {
      method: 'get',
      url: `movie/${this.props.movieId}/credits`,
    };

    this.fetchData(fetchOptions);
  }

  fetchData(options) {
    fetchMovies(options)
      .then(response => {
        this.setState({ cast: response.cast });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <>
        {this.state.cast.length === 0 ? (
          <h1>There is no information.</h1>
        ) : (
          <ul className="movie-cast-list">
            {this.state.cast.map(
              ({ id, profile_path, original_name, character }) => (
                <li key={id}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500${profile_path}`}
                    alt={original_name}
                  />
                  <p>{original_name}</p>
                  <p>Character: {character}</p>
                </li>
              ),
            )}
          </ul>
        )}
      </>
    );
  }
}

export default Cast;
