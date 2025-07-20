import React, { useEffect, useState } from 'react';
import './ApplicationsView_Employer.css';

const ApplicationsView_Employer = () => {
  const [applications, setApplications] = useState([]);
  const employerId = localStorage.getItem('employerId');

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/job-applications/employer/${employerId}`);
        const data = await res.json();

        // Filter out applications where jobId is deleted (null/undefined) and sort by latest
        const filtered = data
          .filter((app) => app.jobId !== null && app.jobId !== undefined)
          .sort((a, b) => new Date(b.appliedAt) - new Date(a.appliedAt));

        setApplications(filtered);
      } catch (err) {
        console.error('Failed to fetch applications:', err);
      }
    };

    if (employerId) fetchApplications();
  }, [employerId]);

  const updateStatus = async (id, status) => {
    try {
      await fetch(`http://localhost:5000/api/job-applications/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      setApplications((prev) =>
        prev.map((app) =>
          app._id === id ? { ...app, status } : app
        )
      );
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  return (
    <div className="applications-container">
      <h2 className="applications-title">📋 Applications Received</h2>
      {applications.length === 0 ? (
        <p className="no-applications">No applications received yet.</p>
      ) : (
        <ul className="application-list">
          {applications.map((app) => (
            <li key={app._id} className="application-card">
              <p><strong>Job Title:</strong> {app.jobId?.title || "Job Deleted"}</p> {/* Display Job Title */}
              <p><strong>Candidate Name:</strong> {app.fullName}</p>
              <p><strong>Email:</strong> {app.email}</p>
              <p><strong>Phone:</strong> {app.phone}</p>
              <p><strong>Cover Letter:</strong> {app.coverLetter}</p>
              <p><strong>Status:</strong> {app.status || 'Pending'}</p>

              {(app.status === 'pending' || !app.status) && (
                <div className="button-group">
                  <button className="select-button" onClick={() => updateStatus(app._id, 'selected')}>✅ Select</button>
                  <button className="reject-button" onClick={() => updateStatus(app._id, 'rejected')}>❌ Reject</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ApplicationsView_Employer;
