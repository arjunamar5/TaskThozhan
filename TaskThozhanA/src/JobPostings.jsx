import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './JobPostings.css';

const JobPostings = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [customJobTitle, setCustomJobTitle] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

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

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/jobs");
        const data = await response.json();
        setJobs(data);
        setFilteredJobs(data);
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
      }
    };
    fetchJobs();
  }, []);

  const filterJobs = () => {
    const titleToSearch = searchInput === "Custom" ? customJobTitle : searchInput;

    const filtered = jobs.filter((job) =>
      (titleToSearch === '' || job.title.toLowerCase().includes(titleToSearch.toLowerCase())) &&
      (
        selectedCountry === '' ||
        job.location.toLowerCase().includes(selectedCountry.toLowerCase())
      ) &&
      (
        selectedState === '' ||
        job.location.toLowerCase().includes(selectedState.toLowerCase())
      ) &&
      (
        selectedCity === '' ||
        job.location.toLowerCase().includes(selectedCity.toLowerCase())
      )
    );

    setFilteredJobs(filtered);
  };

  const clearFilters = () => {
    setSearchInput('');
    setCustomJobTitle('');
    setSelectedCountry('');
    setSelectedState('');
    setSelectedCity('');
    setFilteredJobs(jobs);
  };

  return (
    <div className="job-postings-container">
      <div className="top-box">
        <h1>TaskThozhan Job Portal</h1>
        <p>Your one-stop solution for finding the perfect job or employee</p>
      </div>

      <div className="main-container">
        <div className="search-column">
          <h2 className='search-heading'>Filter Your Search</h2>

          {/* Job title dropdown */}
          <select
            value={searchInput}
            onChange={(e) => {
              const selected = e.target.value;
              setSearchInput(selected);
              if (selected !== "Custom") {
                setCustomJobTitle('');
              }
            }}
          >
            <option value="">All Job Titles</option>
            <option value="Software Developer">Software Developer</option>
            <option value="Data Scientist">Data Scientist</option>
            <option value="Product Manager">Product Manager</option>
            <option value="Graphic Designer">Graphic Designer</option>
            <option value="Marketing Specialist">Marketing Specialist</option>
            <option value="Custom">Custom</option>
          </select>

          {searchInput === "Custom" && (
            <input
              type="text"
              placeholder="Enter custom job title"
              value={customJobTitle}
              onChange={(e) => setCustomJobTitle(e.target.value)}
            />
          )}

          {/* Location dropdowns */}
          <select value={selectedCountry} onChange={(e) => {
            setSelectedCountry(e.target.value);
            setSelectedState('');
            setSelectedCity('');
          }}>
            <option value="">All Country</option>
            {Object.keys(locationData).map((country) => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>

          {selectedCountry && (
            <select value={selectedState} onChange={(e) => {
              setSelectedState(e.target.value);
              setSelectedCity('');
            }}>
              <option value="">Select State</option>
              {Object.keys(locationData[selectedCountry]).map((state) => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          )}

          {selectedState && (
            <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
              <option value="">Select City</option>
              {locationData[selectedCountry][selectedState].map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          )}

          {/* Buttons */}
          <button onClick={filterJobs}>Search</button>
          <button onClick={clearFilters} style={{ marginTop: '2px', backgroundColor: 'gray', color: 'white' }}>
            Clear Filters
          </button>
        </div>

        <div className="job-listings-column">
          <h2 className="recent-jobs-title">Recent Job Listings</h2>
          {filteredJobs.length === 0 ? (
            <p>No jobs match your criteria.</p>
          ) : (
            filteredJobs.map((job) => (
              <div key={job._id} className="job-item">
                <div className="job-header">
                  <i className="fas fa-briefcase"></i>
                  <div>
                    <h3 className="job-title">{job.title}</h3>
                    <p className="job-title-company">Company: {job.createdBy?.companyName || "No Company title"}</p> {/* Display Company Name */}
                    <p className="job-location">Location: {job.location}</p>
                  </div>
                </div>
                
                <p className="job-description">{job.description}</p>
                <p className="job-salary">Salary: ₹{job.salary}</p>
                <p className="job-status">Type: {job.jobType}</p>
                <p className="job-status">Status: {job.status}</p>
                <Link to={`/job-application/${job._id}`} className="apply-button">Apply Now</Link>
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

export default JobPostings;
