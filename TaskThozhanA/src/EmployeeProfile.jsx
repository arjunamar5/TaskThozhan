// import React, { useState, useEffect } from 'react';
// import './EmployeeProfile.css';

// const locationData = {
//   India: {
//     "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Erode", "Nammakal"],
//     "Kerala": ["Kochi", "Thiruvananthapuram", "Kozhikode", "Wayanad"],
//     "Karnataka": ["Bengaluru", "Mysuru", "Mangaluru"],
//     "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Kadapa", "Tirupati", "Nellore"],
//   },
//   USA: {
//     California: ["Los Angeles", "San Francisco", "San Diego"],
//     Texas: ["Houston", "Dallas", "Austin"],
//     Florida: ["Miami", "Orlando", "Tampa"],
//   },
// };

// const EmployeeProfile = () => {
//   const [employeeData, setEmployeeData] = useState(null);

//   useEffect(() => {
//     fetch('/employee/profile')
//       .then((response) => response.json())
//       .then((data) => setEmployeeData(data))
//       .catch((error) => console.log('Error fetching data: ', error));
//   }, []);

//   return (
//     <div className="employee-profile-container">
//       {employeeData ? (
//         <div className="profile-details">
//           <h2>{employeeData.name}</h2>
//           <p>Email: {employeeData.email}</p>
//           <p>Phone: {employeeData.phone}</p>
//           <p>Location: {employeeData.city}, {employeeData.state}, {employeeData.country}</p>
//           <button className="edit-profile-btn" onClick={() => window.location.href = '/employee/edit'}>Edit Profile</button>
//         </div>
//       ) : (
//         <p>Loading profile...</p>
//       )}
//     </div>
//   );
// };

// export default EmployeeProfile;


import React, { useEffect, useState } from 'react';
import './EmployeeProfile.css';

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
};

const EmployeeProfile = () => {
  const [employee, setEmployee] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    state: '',
    city: ''
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("employeetoken");
      if (!token) return;

      try {
        const response = await fetch("http://localhost:5000/api/employeeProfile", {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (response.ok) {
          const data = await response.json();
          setEmployee(data);
          setFormData({
            name: data.name || '',
            email: data.email || '',
            phone: data.phone || '',
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
    const token = localStorage.getItem("employeetoken");
    try {
      const response = await fetch("http://localhost:5000/api/employeeProfile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const updated = await response.json();
        setEmployee(updated);
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

  if (!employee) return <p>Loading profile...</p>;

  return (
    <div className="employee-profile-container">
      <div className="profile-header">Employee Profile</div>

      <div className="profile-field">
        <label>Name:</label>
        {editMode ? (
          <input name="name" value={formData.name} onChange={handleChange} />
        ) : (
          <p>{employee.name}</p>
        )}
      </div>

      <div className="profile-field">
        <label>Email:</label>
        <p>{employee.email}</p>
      </div>

      <div className="profile-field">
        <label>Phone:</label>
        {editMode ? (
          <input name="phone" value={formData.phone} onChange={handleChange} />
        ) : (
          <p>{employee.phone}</p>
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
          <p>{employee.country}</p>
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
            <p>{employee.state}</p>
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
            <p>{employee.city}</p>
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

export default EmployeeProfile;
