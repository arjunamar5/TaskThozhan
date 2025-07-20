  import React, { useState } from "react";
  import { useNavigate } from "react-router-dom";
  import axios from "axios";
  import "./Login.css";
  //import logo from "./assets/Se-logo.jpg";

  const LoginEmployee = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleAuth = async (e) => {
    e.preventDefault();
    setError("");
    
    try {
      const response = await axios.post("http://localhost:5000/api/auth/employee/login", {
        email,
        password,
      });

      alert("Login Successful! ✅");
      console.log("Login Success:", response.data);

      const employee = response.data.employee;

      if (!employee || !employee.id) {
        throw new Error("Employee ID not found in login response");
      }

      // Store the token in localStorage
      localStorage.setItem("employeetoken", response.data.token);
      localStorage.setItem("employeeId", employee.id); // Store employee ID
      localStorage.setItem("user", JSON.stringify({
        fullName: employee.name,
        email: employee.email,
      }));

      navigate("/employee-dashboard");

    } catch (error) {
      console.error("Login Error:", error.response?.data || error.message || error);
      setError("Invalid email or password");
    }
  };

    
    

    return (
      <div className="page-container">
        {/* Top-left TaskThozhan Logo 
        <img src={logo} alt="TaskThozhan Logo" className="top-left-logo" />*/}

        {/* Centered Login Container */}
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
            <button type="submit" className="auth-button">Login</button>
            {error && <p className="error-message">{error}</p>}
          </form>
          <br />
          <div className="auth-footer">
            <span className="auth-link" onClick={() => navigate("/EmployeeRegister")}>
              Create an account
            </span>
            <></>
            <span className="auth-link" onClick={() => navigate("/forgot-password")}>
              Forgot Password?
            </span>
          </div>
        </div>
      </div>
    );
  };

  export default LoginEmployee;
