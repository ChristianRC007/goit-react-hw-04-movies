import { Route, Switch } from 'react-router-dom';
import AppBar from './components/AppBar/AppBar';
import HomeView from './views/HomeView';
import MoviesView from './views/MoviesView';
import routes from './routes';

const App = () => {
  return (
    <>
      <AppBar />
      <Switch>
        <Route exact path={routes.home} component={HomeView} />
        <Route path={routes.allMovies} component={MoviesView} />
      </Switch>
    </>
  );
};

export default App;
