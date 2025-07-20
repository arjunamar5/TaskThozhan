import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

const LoginEmployer = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/api/auth/employer/login", {
        email,
        password,
      });

      const employer = response.data.employer;

      // ✅ Store everything needed
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("employerId", employer.id); // ✅ Save employerId
      localStorage.setItem("user", JSON.stringify(employer)); // Optional: save entire employer object

      alert(`Login successful for ${employer.name}`);
      navigate("/employer-dashboard");
    } catch (err) {
      console.error("❌ Login Error:", err.response?.data?.error || err.message);
      setError(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="page-container">
      <div className="container-login-box">
        <h2 className="auth-title">Welcome to TaskThozhan</h2>

        <form onSubmit={handleAuth}>
          <input
            type="email"
            placeholder="Email"
            className="auth-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="auth-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="auth-button">Login</button>
        </form>

        <div className="auth-footer">
          <span className="auth-link" onClick={() => navigate("/EmployerRegister")}>
            Create an account
          </span>
          <span className="auth-link" onClick={() => navigate("/employer/forgot-password")}>
            Forgot Password?
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginEmployer;
