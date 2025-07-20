import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
//import logo from "./assets/Se-logo.jpg";
import "./Login.css"; // Reusing the same styles

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const res = await axios.post("http://localhost:5000/api/employee/forgot-password", { email });
      setMessage("✅ Reset link sent to your email. \n If the mail is not in Inbox, Check in Spam");
    } catch (err) {
      console.error("❌ Error:", err.response?.data || err);
      setError(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="page-container">
    <div>
      {/* Top-left Logo 
      <img src={logo} alt="TaskThozhan Logo" className="top-left-logo" />*/}

      {/* Centered Forgot Password Box */}
      <div className="container-login-box">
        <h2 className="auth-title">Forgot Your Password?</h2>
        <form onSubmit={handleForgotPassword}>
          <input
            type="email"
            placeholder="Enter your registered email"
            className="auth-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="auth-button">Send Reset Link</button>
        </form>

        {message && <p style={{ color: "lightgreen", marginTop: "1rem" }}>{message}</p>}
        {error && <p className="error-message">{error}</p>}

        <br />
        <div className="auth-footer-single">
          <span className="auth-link" onClick={() => navigate("/")}>Back to Login</span>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ForgotPassword;
