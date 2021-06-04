import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import fetchMovies from '../../services/apiService';
import Cast from '../Cast';
import Reviews from '../Reviews';
import routes from '../../routes';

import './MovieDetailsPage.scss';

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
      .then(
        ({
          title,
          poster_path,
          release_date,
          vote_average,
          overview,
          genres,
        }) =>
          this.setState({
            title: title,
            poster: `https://image.tmdb.org/t/p/w500${poster_path}`,
            release_date: release_date.slice(0, 4),
            rating: vote_average,
            overview: overview,
            genres: genres,
          }),
      )
      .catch(err => console.log(err))
      .finally(() => this.setState({ isLoading: false }));
  }

  handleGoBack = () => {
    const { location, history } = this.props;

    history.push(location?.state?.from || routes.home);
  };

  render() {
    const { isLoading, title, release_date, rating, overview, genres, poster } =
      this.state;

    const { match, location } = this.props;

    return (
      <>
        <button type="button" onClick={this.handleGoBack} className="back-btn">
          <svg
            version="1.1"
            id="Capa_1"
            x="0px"
            y="0px"
            viewBox="0 0 447.243 447.243"
          >
            <g>
              <g>
                <path
                  d="M420.361,192.229c-1.83-0.297-3.682-0.434-5.535-0.41H99.305l6.88-3.2c6.725-3.183,12.843-7.515,18.08-12.8l88.48-88.48
			c11.653-11.124,13.611-29.019,4.64-42.4c-10.441-14.259-30.464-17.355-44.724-6.914c-1.152,0.844-2.247,1.764-3.276,2.754
			l-160,160C-3.119,213.269-3.13,233.53,9.36,246.034c0.008,0.008,0.017,0.017,0.025,0.025l160,160
			c12.514,12.479,32.775,12.451,45.255-0.063c0.982-0.985,1.899-2.033,2.745-3.137c8.971-13.381,7.013-31.276-4.64-42.4
			l-88.32-88.64c-4.695-4.7-10.093-8.641-16-11.68l-9.6-4.32h314.24c16.347,0.607,30.689-10.812,33.76-26.88
			C449.654,211.494,437.806,195.059,420.361,192.229z"
                />
              </g>
            </g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
          </svg>
          Go back
        </button>
        {isLoading ? (
          <h2>Loading...</h2>
        ) : (
          <>
            <div className="movie-wrapper">
              <img src={poster} alt={title} />
              <div className="movie-descr">
                <h2>
                  {title} ({release_date})
                </h2>
                <span>Rating: {rating}</span>
                <h3>Overview</h3>
                <p>{overview}</p>
                <h3>Genres</h3>
                <ul className="movie-genres-list">
                  {genres.map(({ id, name }) => (
                    <li key={id}>{name}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="movie-info">
              <p>Additional information:</p>
              <ul>
                <li key="1">
                  <Link
                    to={{
                      pathname: `${match.url}/cast`,
                      state: {
                        from: location.state?.from || routes.home,
                      },
                    }}
                  >
                    Cast
                  </Link>
                </li>
                <li key="2">
                  <Link
                    to={{
                      pathname: `${match.url}/reviews`,
                      state: {
                        from: location.state?.from || routes.home,
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
          path={`${match.path}/cast`}
          render={props => <Cast {...props} movieId={match.params.movieId} />}
        />
        <Route
          path={`${match.path}/reviews`}
          render={props => (
            <Reviews {...props} movieId={match.params.movieId} />
          )}
        />
      </>
    );
  }
}

export default MovieDetailsPage;
