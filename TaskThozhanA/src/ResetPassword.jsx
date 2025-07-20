import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
//import logo from "./assets/Se-logo.jpg";
import "./Login.css"; // Reuse your styles

const ResetPassword = () => {
  const { token } = useParams(); // get token from URL
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const res = await axios.post(`http://localhost:5000/api/employee/reset-password/${token}`, {
        newPassword,
      });

      setMessage(res.data.message || "Password reset successful!");
      setTimeout(() => navigate("/"), 2000); // Redirect to login after 2s
    } catch (err) {
      setError(err.response?.data?.error || "Failed to reset password");
    }
  };

  return (
    <div className="page-container">
    <div>
      {/*}img src={logo} alt="TaskThozhan Logo" className="top-left-logo" />*/}

      <div className="container-login-box">
        <h2 className="auth-title">Reset Your Password</h2>
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

        {message && <p style={{ color: "lightgreen", marginTop: "1rem" }}>{message}</p>}
        {error && <p className="error-message">{error}</p>}

        <br />
        <div className="auth-footer" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <span className="auth-link" onClick={() => navigate("/LoginEmployee")}>
            Back to Login
          </span>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ResetPassword;
