import React from 'react';
import './AboutTaskThozhan.css'; // Import the CSS file
import DashboardLayout from './DashboardLayout'; // Assuming this is the common layout for the dashboard
import { useNavigate } from 'react-router-dom';
import dimage from "./assets/Dharshan_pic.jpg";
import pimage from "./assets/Pooja_mam_pic.jpg"
import aimage from "./assets/Arjun_pic.jpg"
import logo from "./assets/Se-logo - Copy.jpg";
import simg from "./assets/Siva_pic.jpg";

const AboutTaskThozhan = () => {
  const navigate = useNavigate(); // Initialize navigate function

  const handleGoToLogin = () => {
    navigate('/employee-dashboard'); // Navigate to the login page when clicked
  };

  return (
  
      <div className="about-container">
        <h1 className="page-title">About TaskThozhan</h1>

        <div className="about-logo-container">
          <img src={logo} alt="TaskThozhan Logo" className="about-logo" />
        </div>

        {/* Introduction Section */}
        <section className="intro">
          <h2>What is TaskThozhan?</h2>
          <p>
            TaskThozhan is an innovative platform designed to simplify job hunting and recruitment processes. It connects
            employees and employers, offering a streamlined system for job postings, job applications, and the hiring process.
          </p>
        </section>

        {/* Features Section */}
        <section className="features">
          <h2>Features</h2>
          <ul>
            <li>
              <strong>Job Postings:</strong> Employers can post job listings with details like position, requirements, and location. Job seekers can search for jobs based on various criteria, making it easier to find the right match.
            </li>
            <li>
              <strong>User Profiles:</strong> Employees can create detailed profiles showcasing their skills, experience, and qualifications.
            </li>
            <li>
              <strong>Advanced Search:</strong> The platform allows job seekers to search for jobs based on location, industry, and skillset.
            </li>
            <li>
              <strong>Application Process:</strong> Employees can quickly apply for jobs, streamlining the application process for both candidates and employers.
            </li>
            
          </ul>
        </section>

        {/* Team Section */}
        <section className="team">
          <h2>Our Team</h2>
          <p>
            TaskThozhan is built by a team of passionate developers, designers, and business experts dedicated to improving
            the hiring process for both employees and employers. Our goal is to provide a user-friendly platform that bridges
            the gap between talent and opportunity.
          </p>

          <div className="team-members">
          <div className="team-member">
            <img src={dimage} alt="Developer 1" className="team-photo" />
            <h3>Dharshan J Y</h3>
             {/*<p>Frontend Developer</p>*/}
          </div>
          <div className="team-member">
            <img src={aimage} alt="Developer 2" className="team-photo" />
            <h3>Arjun R Amarnath</h3>
             {/*<p>Backend Developer</p>*/}
          </div>
          <div className="team-member">
            <img src={simg} alt="Developer 3" className="team-photo" />
            <h3>G Siva Adithya</h3>
             {/*<p>UI/UX Designer</p>*/}
          </div>
          <div className="team-member">
            <img src={pimage} alt="Developer 3" className="team-photo" />
            <h3>Pooja Gowda</h3>
            {/*<p>UI/UX Designer</p>*/}
          </div>
        </div>
        </section>

        {/* Contact Section */}
        <section className="contact">
          <h2>Contact Us</h2>
          <p>If you have any questions or feedback, feel free to reach out to us!</p>
          <p>
            Email: <a href="mailto:taskthozhan@gmail.com">taskthozhan@gmail.com</a>
          </p>
        </section>

        {/* Button to demonstrate navigation */}
        <div className="navigation-button">
          <button className="btn-login" onClick={handleGoToLogin} >Go to Main Page</button>
        </div>
      </div>
  );
};

export default AboutTaskThozhan;
