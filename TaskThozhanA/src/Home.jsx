import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

import employeeIcon from "./assets/employee_icon.png"; // Employee icon
import employerIcon from "./assets/employer_icon.png"; // Employer icon
import logo from "./assets/Se-logo.jpg";

const Home = () => {
  const navigate = useNavigate();

  const handleSelection = (userType) => {
    if (userType === "Employee") {
      navigate("/loginEmployee");
    } else if (userType === "Employer") {
      navigate("/loginEmployer");
    }
  };

  return (
    <div className="home-container">
      {/* Top left logo 
      <img src={logo} alt="TaskThozhan Logo" className="home-logo" />*/}

      {/* Page title */}
      <h1 className="home-title">Choose Your Role</h1>

      {/* Role selection options */}
      <div className="role-selection">
        <div className="role-box employee" onClick={() => handleSelection("Employee")}>
          <img src={employeeIcon} alt="Employee Icon" />
          <span className="role-text">Employee</span>
        </div>
        <div className="role-box employer" onClick={() => handleSelection("Employer")}>
          <img src={employerIcon} alt="Employer Icon" />
          <span className="role-text">Employer</span>
        </div>
      </div>
    </div>
    
  );
};

export default Home;
