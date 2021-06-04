import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import fetchMovies from '../../services/apiService';
import Cast from '../Cast';
import Reviews from '../Reviews';

class MovieDetailsPage extends Component {
  state = {
    title: null,
    poster: null,
    release_date: null,
    rating: null,
    overview: null,
    genres: [],
    isLoading: false,
  };

  componentDidMount() {
    this.setState({ isLoading: true });
    const { movieId } = this.props.match.params;

    const fetchOptions = {
      method: 'get',
      url: `movie/${movieId}`,
    };
    fetchMovies(fetchOptions)
      .then(response =>
        this.setState({
          title: response.title,
          poster: `https://image.tmdb.org/t/p/w500${response.poster_path}`,
          release_date: response.release_date.slice(0, 4),
          rating: response.vote_average,
          overview: response.overview,
          genres: response.genres,
        }),
      )
      .catch(err => console.log(err))
      .finally(() => this.setState({ isLoading: false }));
  }

  handleGoBack = () => {
    const { location, history } = this.props;
    history.push(location.state.from);
  };

  render() {
    return (
      <>
        <div>
          {this.state.isLoading ? (
            <h2>Loading...</h2>
          ) : (
            <>
              <button type="button" onClick={this.handleGoBack}>
                {'<-'} Go back
              </button>
              <h2>
                {this.state.title} ({this.state.release_date})
              </h2>
              <span>Rating: {this.state.rating}</span>
              <h3>Overview</h3>
              <p>{this.state.overview}</p>
              <h3>Genres</h3>
              <ul>
                {this.state.genres.map(el => (
                  <li key={el.id}>{el.name}</li>
                ))}
              </ul>
              <img src={this.state.poster} alt={this.state.title} />
              <div>
                <p>Additional information</p>
                <ul>
                  <li key="1">
                    <Link
                      to={{
                        pathname: `${this.props.match.url}/cast`,
                        state: {
                          from: this.props.location.state.from,
                        },
                      }}
                    >
                      Cast
                    </Link>
                  </li>
                  <li key="2">
                    <Link
                      to={{
                        pathname: `${this.props.match.url}/reviews`,
                        state: {
                          from: this.props.location.state.from,
                        },
                      }}
                    >
                      Reviews
                    </Link>
                  </li>
                </ul>
              </div>
            </>
          )}
          <Route
            path={`${this.props.match.path}/cast`}
            render={props => (
              <Cast {...props} movieId={this.props.match.params.movieId} />
            )}
          />
          <Route
            path={`${this.props.match.path}/reviews`}
            render={props => (
              <Reviews {...props} movieId={this.props.match.params.movieId} />
            )}
          />
        </div>
      </>
    );
  }
}

export default MovieDetailsPage;
