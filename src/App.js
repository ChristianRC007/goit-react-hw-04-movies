import { Route, Switch } from 'react-router-dom';
import AppBar from './components/AppBar';
import HomePage from './components/HomePage';
import MovieDetailsPage from './components/MovieDetailsPage';
import MoviesPage from './components/MoviesPage';
import NotFound from './components/NotFound';
import routes from './routes';

const App = () => {
  return (
    <>
      <AppBar />
      <Switch>
        <Route exact path={routes.home} component={HomePage} />
        <Route exact path={routes.allMovies} component={MoviesPage} />
        <Route path={routes.movieId} component={MovieDetailsPage} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
};

export default App;
