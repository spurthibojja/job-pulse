import { Link } from "react-router-dom";
import {
  Search,
  Heart,
  User,
  LayoutDashboard,
  BriefcaseBusiness,
} from "lucide-react";
import { useAuth0 } from "@auth0/auth0-react";

const Nav = () => {
  const {
    loginWithRedirect,
    logout,
    isAuthenticated,
    user,
    isLoading,
  } = useAuth0();

  if (isLoading) {
    return null;
  }

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <span className="logo-mark">◈</span>
        <span>JobPulse</span>
      </Link>

      <div className="nav-links">
        <Link to="/">Home</Link>

        <Link to="/jobs">Jobs</Link>

        {isAuthenticated && (
          <>
            <Link to="/saved">
              <Heart size={17} />
              Saved
            </Link>

            <Link to="/applications">
              Applications
            </Link>

            <Link to="/dashboard">
              <LayoutDashboard size={17} />
              Dashboard
            </Link>

            <Link to="/profile">
              <User size={17} />
              Profile
            </Link>

            <Link to="/post-job">
              <BriefcaseBusiness size={17} />
              Post Job
            </Link>
          </>
        )}
      </div>

      <div className="nav-actions">
        <Search size={19} />

        {!isAuthenticated ? (
          <button
            className="login-btn"
            onClick={() => loginWithRedirect()}
          >
            <User size={17} />
            Login
          </button>
        ) : (
          <>
            <span className="nav-user-name">
              {user?.name}
            </span>

            <button
              className="login-btn"
              onClick={() =>
                logout({
                  logoutParams: {
                    returnTo: window.location.origin,
                  },
                })
              }
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;