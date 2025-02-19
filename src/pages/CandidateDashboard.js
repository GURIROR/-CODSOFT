import React, { useState } from "react";

const CandidateDashboard = () => {
  const [profile, setProfile] = useState({ name: "", email: "", resume: "" });
  const [applications, ] = useState([]);

  const handleInputChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleResumeUpload = (e) => {
    setProfile({ ...profile, resume: e.target.files[0]?.name || "" });
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    alert("Profile Updated Successfully!");
  };

  return (
    <div className="container mt-5">
      <h2 className="title has-text-centered">Candidate Dashboard</h2>

      <div className="box">
        <h3 className="subtitle">Update Profile</h3>
        <form onSubmit={handleProfileUpdate}>
          <div className="field">
            <label className="label">Name</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="name"
                placeholder="Your Name"
                value={profile.name}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input
                className="input"
                type="email"
                name="email"
                placeholder="Your Email"
                value={profile.email}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Upload Resume</label>
            <div className="control">
              <input className="input" type="file" onChange={handleResumeUpload} />
            </div>
            {profile.resume && <p className="help">Uploaded: {profile.resume}</p>}
          </div>

          <div className="control">
            <button className="button is-primary" type="submit">Update Profile</button>
          </div>
        </form>
      </div>

      <div className="box mt-5">
        <h3 className="subtitle">My Applications</h3>
        {applications.length > 0 ? (
          <ul>
            {applications.map((app, idx) => (
              <li key={idx}>
                <strong>{app.jobTitle}</strong> at {app.company}
              </li>
            ))}
          </ul>
        ) : (
          <p>No applications yet.</p>
        )}
      </div>
    </div>
  );
};

export default CandidateDashboard;
