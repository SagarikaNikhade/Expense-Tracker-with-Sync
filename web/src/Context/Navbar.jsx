import { NavLink } from 'react-router-dom';
import './Navbar.css'

const Navbar = () => {
  return (
    <nav className="navbar">
      <NavLink to="/" className="nav-link" end>
        Home
      </NavLink>
      <NavLink to="/list" className="nav-link">
        Expense List
      </NavLink>
    </nav>
  );
};

export default Navbar;
