import React, { useState, useEffect } from 'react';
import './jobpostings_creation.css';

const JobPostings_creation = () => {
  const locationData = {
    India: {
      "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Erode", "Nammakal"],
      "Kerala": ["Kochi", "Thiruvananthapuram", "Kozhikode", "Wayanad"],
      "Karnataka": ["Bengaluru", "Mysuru", "Mangaluru"],
      "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Kadapa", "Tirupati", "Nellore"],
    },
    USA: {
      California: ["Los Angeles", "San Francisco", "San Diego"],
      Texas: ["Houston", "Dallas", "Austin"],
      Florida: ["Miami", "Orlando", "Tampa"],
    },
    UK: {
      England: ["London", "Manchester", "Liverpool"],
      Scotland: ["Edinburgh", "Glasgow"],
      Wales: ["Cardiff", "Swansea"],
    },
  };

  const [employerJobs, setEmployerJobs] = useState([]);
  const [editingJobId, setEditingJobId] = useState(null);

  const [title, setTitle] = useState('');
  const [jobTitleOption, setJobTitleOption] = useState('');
  const [customTitle, setCustomTitle] = useState('');
  const [description, setDescription] = useState('');
  const [salary, setSalary] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [jobTypeOption, setJobTypeOption] = useState('');
  const [customJobType, setCustomJobType] = useState('');
  const [jobType, setJobType] = useState('');

  useEffect(() => {
    const fetchEmployerJobs = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await fetch("http://localhost:5000/api/employer/jobs", {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (response.ok) {
          const data = await response.json();
          setEmployerJobs(data);
        } else {
          console.error("Failed to fetch jobs");
        }
      } catch (err) {
        console.error("Error fetching jobs:", err);
      }
    };

    fetchEmployerJobs();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return alert("Employer not logged in");

    const location = `${selectedCity}, ${selectedState}, ${selectedCountry}`;
    const jobData = {
      title,
      description,
      location,
      salary,
      jobType,
    };

    try {
      let response;
      if (editingJobId) {
        response = await fetch(`http://localhost:5000/api/jobs/${editingJobId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(jobData),
        });
      } else {
        response = await fetch("http://localhost:5000/api/jobs", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(jobData),
        });
      }

      const data = await response.json();
      if (response.ok) {
        alert(`Job ${editingJobId ? "updated" : "posted"} successfully`);
        setEditingJobId(null);
        resetForm();
        setEmployerJobs((prev) => editingJobId
          ? prev.map(job => job._id === data._id ? data : job)
          : [data, ...prev]);
      } else {
        alert(data.message || "Error");
      }
    } catch (err) {
      console.error("Submit Error:", err);
      alert("Something went wrong. See console.");
    }
  };

  const resetForm = () => {
    setTitle('');
    setJobTitleOption('');
    setCustomTitle('');
    setDescription('');
    setSalary('');
    setSelectedCountry('');
    setSelectedState('');
    setSelectedCity('');
    setJobTypeOption('');
    setCustomJobType('');
    setJobType('');
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    if (!window.confirm("Are you sure you want to delete this job?")) return;

    try {
      const response = await fetch(`http://localhost:5000/api/jobs/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        setEmployerJobs((prev) => prev.filter(job => job._id !== id));
        alert("Job deleted successfully");
      } else {
        const data = await response.json();
        alert(data.message || "Failed to delete job");
      }
    } catch (err) {
      console.error("Delete Error:", err);
      alert("Something went wrong during deletion.");
    }
  };

  const handleEdit = (job) => {
    setEditingJobId(job._id);
    setTitle(job.title);
    setJobTitleOption(job.title);
    setCustomTitle(job.title);
    setDescription(job.description);
    setSalary(job.salary);
    setJobType(job.jobType);
    setJobTypeOption(job.jobType);
    setCustomJobType(job.jobType);

    const [city, state, country] = job.location.split(',').map(x => x.trim());
    setSelectedCity(city);
    setSelectedState(state);
    setSelectedCountry(country);
  };

  return (
    <div className="job-postings-container">
      <div className="top-box">
        <h1>TaskThozhan - Employer Job Management</h1>
        <p>Post jobs and manage your listings</p>
      </div>

      <div className="main-container">
        <div className="job-create-column">
          <h2 className='recent-jobs-title'>{editingJobId ? "Edit Posted Job" : "Create a New Job Post"}</h2>
          <form className="job-form" onSubmit={handleSubmit}>
            <select className="job-input" value={jobTitleOption}
              onChange={(e) => {
                const val = e.target.value;
                setJobTitleOption(val);
                setTitle(val === "Custom" ? "" : val);
              }} required>
              <option value="">Select Job Title</option>
              <option value="Software Developer">Software Developer</option>
              <option value="Data Scientist">Data Scientist</option>
              <option value="Product Manager">Product Manager</option>
              <option value="Graphic Designer">Graphic Designer</option>
              <option value="Marketing Specialist">Marketing Specialist</option>
              <option value="Custom">Custom</option>
            </select>

            {jobTitleOption === "Custom" && (
              <input type="text" className="job-input" placeholder="Custom Title" value={customTitle}
                onChange={(e) => {
                  setCustomTitle(e.target.value);
                  setTitle(e.target.value);
                }} required
              />
            )}

            <textarea className="job-input" placeholder="Description" value={description}
              onChange={e => setDescription(e.target.value)} required />

            <select className="job-input" value={selectedCountry}
              onChange={(e) => {
                setSelectedCountry(e.target.value);
                setSelectedState('');
                setSelectedCity('');
              }} required>
              <option value="">Select Country</option>
              {Object.keys(locationData).map(c => <option key={c} value={c}>{c}</option>)}
            </select>

            {selectedCountry && (
              <select className="job-input" value={selectedState}
                onChange={(e) => {
                  setSelectedState(e.target.value);
                  setSelectedCity('');
                }} required>
                <option value="">Select State</option>
                {Object.keys(locationData[selectedCountry]).map(state => <option key={state} value={state}>{state}</option>)}
              </select>
            )}

            {selectedState && (
              <select className="job-input" value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)} required>
                <option value="">Select City</option>
                {locationData[selectedCountry][selectedState].map(city => <option key={city} value={city}>{city}</option>)}
              </select>
            )}

            <input type="number" className="job-input" placeholder="Salary" value={salary}
              onChange={e => setSalary(e.target.value)} required />

            <select className="job-input" value={jobTypeOption}
              onChange={(e) => {
                const val = e.target.value;
                setJobTypeOption(val);
                setJobType(val === "Custom" ? "" : val);
              }} required>
              <option value="">Select Job Type</option>
              <option value="Full-Time">Full-Time</option>
              <option value="Part-Time">Part-Time</option>
              <option value="Custom">Custom</option>
            </select>

            {jobTypeOption === "Custom" && (
              <input type="text" className="job-input" placeholder="Custom Job Type"
                value={customJobType}
                onChange={(e) => {
                  setCustomJobType(e.target.value);
                  setJobType(e.target.value);
                }} required />
            )}

            <button type="submit" className="job-button">{editingJobId ? "Update Job" : "Post Job"}</button>
            {editingJobId && (
              <button
                type="button"
                className="job-button cancel-button"
                style={{ backgroundColor: "grey", marginTop: "5px" }}
                onClick={resetForm}
              >
                Cancel Edit
              </button>
            )}
          </form>
        </div>

        <div className="job-listings-column">
          <h2 className="recent-jobs-title">Your Posted Jobs</h2>
          {employerJobs.length === 0 ? (
            <p>No jobs posted yet.</p>
          ) : (
            [...employerJobs]
              .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
              .map((job) => (
                <div key={job._id} className="job-item">
                  <div className="job-header">
                    <i className="fas fa-briefcase"></i>
                    <div>
                      <h3 className="job-title">{job.title}</h3>
                      <p className="job-location">Location: {job.location}</p>
                    </div>
                  </div>
                  <p className="job-description">{job.description}</p>
                  <p className="job-salary">Salary: ₹{job.salary}</p>
                  <p className="job-status">Type: {job.jobType}</p>
                  <p className="job-status">Status: {job.status}</p>
                  <div className="job-action-buttons">
                    <button className="edit-button" onClick={() => handleEdit(job)}>Edit</button>
                    <button className="delete-button" onClick={() => handleDelete(job._id)}>Delete</button>
                  </div>
                </div>
              ))
          )}
        </div>
      </div>

      <footer>
        <p>&copy; 2025 TaskThozhan. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default JobPostings_creation;
