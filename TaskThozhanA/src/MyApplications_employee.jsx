import React, { useEffect, useState } from 'react';
import './MyApplication_employee.css';

const MyApplication_employee = () => {
  const [applications, setApplications] = useState([]);
  const employeeId = localStorage.getItem("employeeId");

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/job-applications/employee/${employeeId}`);
        const data = await res.json();
        // Filter out applications with deleted jobs
        const filteredData = data.filter((app) => app.jobId !== null && app.jobId !== undefined);

        // Sort applications so latest appears first
        setApplications(
          filteredData.sort((a, b) => new Date(b.appliedAt) - new Date(a.appliedAt))
        );
      } catch (err) {
        console.error("Failed to fetch applications:", err);
      }
    };

    if (employeeId) fetchApplications();
  }, [employeeId]);

  return (
    <div className="employee-apps-page">
      <div className="employee-apps-container">
        <h2 className="employee-apps-title">Your Job Applications</h2>

        {applications.length === 0 ? (
          <p className="employee-apps-subtext">You haven’t applied to any jobs yet.</p>
        ) : (
          <ul className="employee-apps-list">
            {applications.map((app) => (
              <li key={app._id} className="employee-apps-card">
                <h3>{app.jobId?.title || "Job Deleted"}</h3>
               <p><strong>Company:</strong> {app.jobId?.createdBy?.companyName || "Company Deleted"}</p>
 {/* Display company name */}
                <p><strong>Location:</strong> {app.jobId?.location}</p>
                <p><strong>Salary:</strong> ₹{app.jobId?.salary}</p>
                <p><strong>Job Type:</strong> {app.jobId?.jobType}</p>
                <p><strong>Applied On:</strong> {new Date(app.appliedAt).toLocaleDateString()}</p>
                <p><strong>Status:</strong> <span className={`status-badge ${app.status || 'pending'}`}>{app.status || "Pending"}</span></p>

                {app.status === 'selected' && (
                  <p className="congrats-message">
                    🎉 <strong>Congratulations!!</strong> <br></br> You are selected for this job. Offer letter along with other information will be mailed to your email.
                  </p>
                )}

                {app.status === 'rejected' && (
                  <p className="rejection-message">
                    <strong>Sorry!!</strong> <br></br> You have not been selected for this job. We encourage you to keep applying and wish you the best!
                  </p>
                )}

              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MyApplication_employee;
