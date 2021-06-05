import React, { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import AppBar from './components/AppBar';
import Loader from 'react-loader-spinner';

import routes from './routes';

const HomePage = lazy(() => import('./components/HomePage'));
const MoviesPage = lazy(() => import('./components/MoviesPage'));
const MovieDetailsPage = lazy(() => import('./components/MovieDetailsPage'));
const NotFound = lazy(() => import('./components/NotFound'));

const App = () => {
  const { home, allMovies, movieId } = routes;

  return (
    <>
      <AppBar />
      <Suspense
        fallback={
          <Loader
            type="ThreeDots"
            color="#000000"
            height={100}
            width={100}
            timeout={3000}
          />
        }
      >
        <Switch>
          <Route exact path={home} component={HomePage} />
          <Route exact path={allMovies} component={MoviesPage} />
          <Route path={movieId} component={MovieDetailsPage} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </>
  );
};

export default App;
