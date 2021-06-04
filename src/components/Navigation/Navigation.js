import { NavLink } from 'react-router-dom';
import routes from '../../routes';

import './Navigation.scss';

const Navigation = () => {
  const { home, allMovies } = routes;

  return (
    <nav className="nav-bar">
      <NavLink exact to={home} className="nav-link" activeClassName="active">
        Home
      </NavLink>
      <NavLink to={allMovies} className="nav-link" activeClassName="active">
        Movies
      </NavLink>
    </nav>
  );
};

export default Navigation;
