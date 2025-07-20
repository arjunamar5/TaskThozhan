import React from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import "./DashboardLayout.css"; // External CSS for styling
import logo from "./assets/Se-logo.jpg"; // Import the logo

const DashboardLayout = () => {
  const location = useLocation(); // Get current route using useLocation
  const navigate = useNavigate();

  const handleLogout = () => {
    alert("Logged out successfully!");
    navigate("/"); // Navigate to the home page after logout

  };

  return (
    <>
      {/* Top Dashboard */}
      <div className="dashboard-topbar">
        <div className="topbar-container">
          {/* Logo */}
          <img src={logo} alt="TaskThozhan Logo" className="logo" />
          
          <div className="dashboard-links">
            {/* Common Links */}
            <Link to="/" className="dashboard-link">Home</Link>
            

            {/* Conditionally Render Links and Logout based on current path */}
            {/* Display "Main Page" link only when on "job-postings" */}
            {location.pathname === "/job-postings" && (
              <Link to="/employee-dashboard" className="dashboard-link">Main Page</Link>
            )}

            {location.pathname === "/job-postings-creation" && (
              <Link to="/employer-dashboard" className="dashboard-link">Main Page</Link>
            )}

            {location.pathname === "/my-applications-employee" && (
              <Link to="/employee-dashboard" className="dashboard-link">Main Page</Link>
            )}

            {location.pathname === "/applications-viewer-employer" && (
              <Link to="/employer-dashboard" className="dashboard-link">Main Page</Link>
            )}

            {location.pathname === "/employer-profile" && (
              <Link to="/employer-dashboard" className="dashboard-link">Main Page</Link>
            )}

            {location.pathname === "/employee-profile" && (
              <Link to="/employee-dashboard" className="dashboard-link">Main Page</Link>
            )}

            {location.pathname.startsWith("/job-application")  && (
              <Link to="/employee-dashboard" className="dashboard-link">Main Page</Link>
            )}


            {/* Profile pages*/}
            {location.pathname.startsWith("/employer-dashboard")  && (
              <Link to="/employer-profile" className="dashboard-link">Profile</Link>
            )}

            {location.pathname.startsWith("/employee-dashboard")  && (
              <Link to="/employee-profile" className="dashboard-link">Profile</Link>
            )}

            <Link to="/about" className="dashboard-link">About</Link>
            {/* Display Logout button only on "job-postings" or "employee-dashboard" 
            {(location.pathname === "/job-postings" || location.pathname === "/job-postings-creation" || 
            location.pathname === "/employee-dashboard" || location.pathname === "/employer-dashboard" || 
            location.pathname.startsWith("/job-application")) || location.pathname === "/my-applications-employee" || 
            location.pathname === "/applications-viewer-employer" || location.pathname === "/job-postings-creation" && (
              <button onClick={handleLogout} className="logout-button">Logout</button>
            )}*/}
    
    {(
  location.pathname === "/job-postings" ||
  location.pathname === "/job-postings-creation" ||
  location.pathname === "/employee-dashboard" ||
  location.pathname === "/employer-dashboard"
) ||
(
  location.pathname.startsWith("/job-application") ||
  location.pathname === "/my-applications-employee" ||
  location.pathname === "/applications-viewer-employer" ||
  location.pathname === "/employer-profile"||
  location.pathname === "/employee-profile"
) ? (
  <button onClick={handleLogout} className="logout-button">Logout</button>
) : null}

          
  

            
          </div>
        </div>
      </div>

      {/* Main Content Area - Push content below the topbar */}
      <div className="dashboard-content">
        <Outlet /> {/* This is where the child components will be rendered */}
      </div>
    </>
  );
};

export default DashboardLayout;
