import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
//import logo from "./assets/TaskThozhan_Logo.png";
import "./Login.css";

const EmployerResetPassword = () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const res = await axios.post(`http://localhost:5000/api/employer/reset-password/${token}`, {
        newPassword,
      });

      setMessage(res.data.message || "Password reset successful!");
      setTimeout(() => navigate("/LoginEmployer"), 2000);
    } catch (err) {
      console.error("❌ Reset Error:", err.response?.data || err);
      setError(err.response?.data?.error || "Failed to reset password");
    }
  };

  return (
    <div className="page-container">
    <div>
      
      <div className="container-login-box">
        <h2 className="auth-title">Reset Your Password (Employer)</h2>
        <form onSubmit={handleReset}>
          <input
            type="password"
            placeholder="Enter new password"
            className="auth-input"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <button type="submit" className="auth-button">Reset Password</button>
        </form>

        {message && <p style={{ color: "lightgreen" }}>{message}</p>}
        {error && <p className="error-message">{error}</p>}

        <br />
        <div className="auth-footer" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <span className="auth-link" onClick={() => navigate("/LoginEmployer")}>
            Back to Login
          </span>
        </div>
      </div>
    </div>
  </div>
  );
};

export default EmployerResetPassword;
