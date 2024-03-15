import { NavLink, useNavigate } from 'react-router-dom';
import useToken from "@galvanize-inc/jwtdown-for-react";

function Nav() {
  const navigate = useNavigate();
  const { logout, token } = useToken();
  const isLoggedIn = Boolean(token);

  const handleLogout = async () => {
    const logoutSuccess = await logout();
    if (logoutSuccess) {
      console.log('Logout successful');
      navigate('/');
    } else {
      console.error('Logout failed');
    }
  };

  return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
          <div className="container-fluid">
              <NavLink className="navbar-brand" to="/">Home</NavLink>
        {isLoggedIn ? (
          <>
            <NavLink className="navbar-brand" to="/wishes">Wishes</NavLink>
            <button onClick={handleLogout} className="btn btn-outline-light">Logout</button>
          </>
          ) : (
          <>
              <NavLink className="navbar-brand" to="/signup">Sign Up</NavLink>
              <NavLink className="navbar-brand" to="/login">Login</NavLink>
          </>
        )}
          </div>
      </nav>
  );
}

export default Nav;
