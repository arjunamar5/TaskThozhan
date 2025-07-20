import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './JobApplication.css';

const JobApplication = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [jobDetails, setJobDetails] = useState(null);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    coverLetter: '',
  });

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/jobs/${jobId}`);
        const data = await res.json();
        setJobDetails(data);
      } catch (err) {
        console.error('Failed to load job details:', err);
      }
    };
    fetchJob();
  }, [jobId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const employeeId = localStorage.getItem("employeeId");
    if (!employeeId) {
      alert("You must be logged in as an employee.");
      return;
    }

    try {
      const payload = {
        jobId,
        employeeId,
        ...formData,
      };

      console.log("📩 Submitting payload:", payload);

      const res = await fetch("http://localhost:5000/api/job-applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      console.log("📥 Response from server:", result);

      if (res.ok) {
        alert("Application submitted successfully!");
        navigate("/my-applications-employee"); // 👈 Redirect after success
      } else {
        alert(result.message || "Submission failed.");
      }
    } catch (err) {
      console.error("❌ Error submitting application:", err);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="job-application-container">
      <div className="application-form-container">
        {jobDetails && (
          <>
            <h2 className="apply-title">Application for {jobDetails.title}</h2>
            <p className="apply-company-name"><strong>Company:</strong> {jobDetails.createdBy?.companyName || "Company Deleted"}</p> {/* Display Company Name */}
            <p className="apply-description">{jobDetails.description}</p>

            <form className="application-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="fullName">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="coverLetter">Cover Letter</label>
                <textarea
                  id="coverLetter"
                  name="coverLetter"
                  rows="4"
                  value={formData.coverLetter}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className="submit-button">Submit Application</button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default JobApplication;
