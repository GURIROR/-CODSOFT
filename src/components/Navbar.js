import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const isAuthenticated = !!localStorage.getItem("token"); // ✅ Check if user is logged in

  // ✅ Handle Search Submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/listings?search=${searchQuery}`);
    }
  };

  // ✅ Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // ❌ Remove the token
    navigate("/auth"); // Redirect to Login/Signup page
  };

  return (
    <nav className="navbar is-primary" role="navigation" aria-label="main navigation">
      <div className="container">
        <div className="navbar-brand">
          <Link to="/" className="navbar-item title is-4 has-text-white">Job Board</Link>
        </div>

        <div className="navbar-menu">
          <div className="navbar-start">
            <Link to="/" className={`navbar-item ${location.pathname === "/" ? "is-active" : ""}`}>Home</Link>
            <Link to="/jobs" className={`navbar-item ${location.pathname.startsWith("/jobs") ? "is-active" : ""}`}>Job Listings</Link>
            <Link to="/employer-dashboard" className={`navbar-item ${location.pathname.startsWith("/employer-dashboard") ? "is-active" : ""}`}>Employer Dashboard</Link>
            <Link to="/candidate-dashboard" className={`navbar-item ${location.pathname.startsWith("/candidate-dashboard") ? "is-active" : ""}`}>Candidate Dashboard</Link>
            {!isAuthenticated ? (
              <Link to="/auth" className={`navbar-item ${location.pathname.startsWith("/auth") ? "is-active" : ""}`}>Login / Signup</Link>
            ) : (
              <button className="navbar-item button is-danger" onClick={handleLogout}>Logout</button>
            )}
          </div>

          <div className="navbar-end">
            <form className="navbar-item" onSubmit={handleSearch}>
              <div className="field has-addons">
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    placeholder="Search Jobs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="control">
                  <button className="button is-info" type="submit">Search</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
