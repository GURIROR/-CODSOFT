import React, { useState } from "react";

const EmployerDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [job, setJob] = useState({ title: "", company: "", location: "", description: "" });

  const handleInputChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handlePostJob = (e) => {
    e.preventDefault();
    if (job.title && job.company && job.location && job.description) {
      setJobs([...jobs, { ...job, id: jobs.length + 1 }]);
      setJob({ title: "", company: "", location: "", description: "" });
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="title has-text-centered">Employer Dashboard</h2>

      <div className="box">
        <h3 className="subtitle">Post a New Job</h3>
        <form onSubmit={handlePostJob}>
          <div className="field">
            <label className="label">Job Title</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="title"
                placeholder="Enter job title"
                value={job.title}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Company Name</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="company"
                placeholder="Enter company name"
                value={job.company}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Location</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="location"
                placeholder="Enter location"
                value={job.location}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Job Description</label>
            <div className="control">
              <textarea
                className="textarea"
                name="description"
                placeholder="Describe the job"
                value={job.description}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="control">
            <button className="button is-primary" type="submit">Post Job</button>
          </div>
        </form>
      </div>

      <div className="box mt-5">
        <h3 className="subtitle">My Job Listings</h3>
        {jobs.length > 0 ? (
          <ul>
            {jobs.map((job) => (
              <li key={job.id}>
                <strong>{job.title}</strong> at {job.company} ({job.location})
                <p>{job.description}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No job listings available.</p>
        )}
      </div>
    </div>
  );
};

export default EmployerDashboard;
