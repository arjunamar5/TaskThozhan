import React, { useEffect, useState } from 'react';
import './EmployerProfile.css';

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

const EmployerProfile = () => {
  const [employer, setEmployer] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    companyName: '',
    country: '',
    state: '',
    city: ''
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await fetch("http://localhost:5000/api/employerProfile", {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (response.ok) {
          const data = await response.json();
          setEmployer(data);
          setFormData({
            name: data.name || '',
            email: data.email || '',
            phone: data.phone || '',
            companyName: data.companyName || '',
            country: data.country || '',
            state: data.state || '',
            city: data.city || ''
          });
        } else {
          console.error("Failed to fetch profile");
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:5000/api/employerProfile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const updated = await response.json();
        setEmployer(updated);
        setEditMode(false);
        alert("Profile updated successfully!");
      } else {
        alert("Failed to update profile");
      }
    } catch (err) {
      console.error("Error saving profile:", err);
      alert("Error updating profile");
    }
  };

  if (!employer) return <p>Loading profile...</p>;

  return (
    <div className="employer-profile-container">
      <div className="profile-header">Employer Profile</div>

      <div className="profile-field">
        <label>Name:</label>
        {editMode ? (
          <input name="name" value={formData.name} onChange={handleChange} />
        ) : (
          <p>{employer.name}</p>
        )}
      </div>

      <div className="profile-field">
        <label>Email:</label>
        <p>{employer.email}</p>
      </div>

      <div className="profile-field">
        <label>Phone:</label>
        {editMode ? (
          <input name="phone" value={formData.phone} onChange={handleChange} />
        ) : (
          <p>{employer.phone}</p>
        )}
      </div>

      <div className="profile-field">
        <label>Company Name:</label>
        {editMode ? (
          <input name="companyName" value={formData.companyName} onChange={handleChange} />
        ) : (
          <p>{employer.companyName}</p>
        )}
      </div>

      <div className="profile-field">
        <label>Country:</label>
        {editMode ? (
          <select name="country" value={formData.country} onChange={handleChange}>
            <option value="">Select Country</option>
            {Object.keys(locationData).map(country => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
        ) : (
          <p>{employer.country}</p>
        )}
      </div>

      {formData.country && (
        <div className="profile-field">
          <label>State:</label>
          {editMode ? (
            <select name="state" value={formData.state} onChange={handleChange}>
              <option value="">Select State</option>
              {Object.keys(locationData[formData.country]).map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          ) : (
            <p>{employer.state}</p>
          )}
        </div>
      )}

      {formData.state && (
        <div className="profile-field">
          <label>City:</label>
          {editMode ? (
            <select name="city" value={formData.city} onChange={handleChange}>
              <option value="">Select City</option>
              {locationData[formData.country][formData.state].map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          ) : (
            <p>{employer.city}</p>
          )}
        </div>
      )}

      {editMode ? (
        <button className="save-btn" onClick={handleSave}>Save</button>
      ) : (
        <button className="edit-btn" onClick={() => setEditMode(true)}>Edit</button>
      )}
    </div>
  );
};

export default EmployerProfile;
