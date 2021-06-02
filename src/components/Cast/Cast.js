import { Component } from 'react';
import fetchMovies from '../../services/apiService';

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
      <ul>
        {this.state.cast.map(el => (
          <li key={el.id}>
            <img
              src={`https://image.tmdb.org/t/p/w500${el.profile_path}`}
              alt={el.original_name}
            />
            <p>{el.original_name}</p>
            <p>Character: {el.character}</p>
          </li>
        ))}
      </ul>
    );
  }
}

export default Cast;
