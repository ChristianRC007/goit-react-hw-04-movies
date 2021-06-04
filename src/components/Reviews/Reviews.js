import { Component } from 'react';
import fetchMovies from '../../services/apiService';

import './Reviews.scss';

class Reviews extends Component {
  state = { results: [] };

  componentDidMount() {
    const fetchOptions = {
      method: 'get',
      url: `movie/${this.props.movieId}/reviews`,
    };

    this.fetchData(fetchOptions);
  }

  fetchData(options) {
    fetchMovies(options)
      .then(response => {
        this.setState({ results: response.results });
      })
      .catch(err => console.log(err));
  }
  render() {
    return (
      <>
        {this.state.results.length === 0 ? (
          <h1>There is no reviews.</h1>
        ) : (
          <ul className="movie-reviews-list">
            {this.state.results.map(({ id, author, content }) => (
              <li key={id}>
                <p className="author">Author: {author}</p>
                <p>{content}</p>
              </li>
            ))}
          </ul>
        )}
      </>
    );
  }
}

export default Reviews;
