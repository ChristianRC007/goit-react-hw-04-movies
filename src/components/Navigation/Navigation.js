import { NavLink } from 'react-router-dom';
import routes from '../../routes';

const Navigation = () => {
  return (
    <nav className="nav-bar">
      <NavLink
        exact
        to={routes.home}
        className="nav-link"
        activeClassName="active"
      >
        Home
      </NavLink>
      <NavLink
        to={routes.allMovies}
        className="nav-link"
        activeClassName="active"
      >
        Movies
      </NavLink>
    </nav>
  );
};

export default Navigation;
