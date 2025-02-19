import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [applicantName, setApplicantName] = useState("");
  const [email, setEmail] = useState("");
  const [resume, setResume] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/api/jobs/${id}`)
      .then((res) => res.json())
      .then((data) => setJob(data))
      .catch((err) => console.error("Error fetching job details:", err));
  }, [id]);

  const handleApply = async (e) => {
    e.preventDefault();

    if (!applicantName || !email || !resume) {
      setMessage("Please fill all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("jobId", job._id);
    formData.append("name", applicantName);
    formData.append("email", email);
    formData.append("resume", resume);

    try {
      const response = await fetch("http://localhost:5000/api/apply", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setMessage("Application submitted successfully!");
        setApplicantName("");
        setEmail("");
        setResume(null);
      } else {
        setMessage("Failed to submit application.");
      }
    } catch (error) {
      setMessage("Error submitting application.");
    }
  };

  if (!job) return <p>Loading job details...</p>;

  return (
    <div className="job-details-container">
      <h1>{job.title}</h1>
      <h3>{job.company} - {job.location}</h3>
      <p>{job.description}</p>

      <h2>Apply for this Job</h2>
      {message && <p className="message">{message}</p>}

      <form onSubmit={handleApply} className="apply-form">
        <input
          type="text"
          placeholder="Your Name"
          value={applicantName}
          onChange={(e) => setApplicantName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => setResume(e.target.files[0])}
          required
        />
        <button type="submit">Apply Now</button>
      </form>
    </div>
  );
};

export default JobDetails;
