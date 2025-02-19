import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <section className="hero is-light is-fullheight">
      <div className="hero-body">
        <div className="container has-text-centered">
          <h1 className="title is-2">Find Your Dream Job Today!</h1>
          <p className="subtitle is-5">
            Explore thousands of job opportunities from top companies.
          </p>
          <div className="buttons is-centered">
            <Link to="/listings" className="button is-primary is-medium">Browse Jobs</Link>
            <Link to="/employer-dashboard" className="button is-link is-medium">Post a Job</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
