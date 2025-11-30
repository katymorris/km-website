import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();
  const isHome = location.pathname === '/' || location.pathname.startsWith('/post/');
  const isProjects = location.pathname === '/projects';

  return (
    <nav className="navbar">
      <Link 
        to="/" 
        className={`nav-link ${isHome ? 'active' : ''}`}
      >
        Home
      </Link>
      <Link 
        to="/projects" 
        className={`nav-link ${isProjects ? 'active' : ''}`}
      >
        Projects
      </Link>
    </nav>
  );
}

export default Navbar;

