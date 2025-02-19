import React, { useState, useEffect, useCallback } from "react";

const JobListings = () => {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [company, setCompany] = useState("");

  // ✅ Use useCallback to memoize fetchJobs and avoid dependency issues
  const fetchJobs = useCallback(async () => {
    try {
      let url = "/api/jobs?";
      if (search) url += `search=${encodeURIComponent(search)}&`;
      if (location) url += `location=${encodeURIComponent(location)}&`;
      if (company) url += `company=${encodeURIComponent(company)}&`;

      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch jobs");

      const data = await response.json();
      setJobs(data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  }, [search, location, company]);

  // ✅ Fetch jobs when component mounts or filters change
  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  return (
    <div className="container mt-5">
      <h2 className="title is-3 has-text-centered">Job Listings</h2>

      {/* ✅ Search Filters */}
      <div className="columns is-centered">
        <div className="column is-half">
          <div className="field has-addons">
            <div className="control is-expanded">
              <input
                className="input"
                type="text"
                placeholder="Search by title..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="Search by location..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="Search by company..."
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </div>
            <div className="control">
              <button className="button is-info" onClick={fetchJobs}>
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Display Job Listings */}
      <div className="columns is-multiline">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <div className="column is-one-third" key={job._id}>
              <div className="box">
                <h3 className="title is-4">{job.title}</h3>
                <p className="subtitle">
                  <strong>Company:</strong> {job.company}
                </p>
                <p>
                  <strong>Location:</strong> {job.location}
                </p>
                <p>{job.description}</p>
                <button className="button is-primary mt-3">View Details</button>
              </div>
            </div>
          ))
        ) : (
          <p className="has-text-centered">No jobs found.</p>
        )}
      </div>
    </div>
  );
};

export default JobListings;
