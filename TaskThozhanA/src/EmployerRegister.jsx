import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
//import logo from "./assets/Se-logo.jpg";

const locationData = {
  India: {
    "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Erode","Nammakal"],
    "Kerala": ["Kochi", "Thiruvananthapuram", "Kozhikode", "Wayanad"],
    "Karnataka": ["Bengaluru", "Mysuru", "Mangaluru"],
    "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Kadapa","Tirupati","Nellore"],
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

const EmployerRegister = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [companyName, setCompanyName] = useState("");
  

  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");

  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    const employerData = {
      name,
      email,
      phone,
      password,
      companyName,
      country,
      state,
      city,
    };

    try {
      const response = await fetch("http://localhost:5000/api/employers/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(employerData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("❌ Registration Error:", errorData);
        throw new Error(errorData.message || "Registration failed.");
      }

      alert("✅ Registration Successful!");
      navigate("/LoginEmployer");
    } catch (error) {
      console.error("❌ Error:", error);
      alert(error.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const countryList = Object.keys(locationData);
  const stateList = country ? Object.keys(locationData[country]) : [];
  const cityList = country && state ? locationData[country][state] : [];

  return (
    <div className="page-container">
      {/*<img src={logo} alt="TaskThozhan Logo" className="top-left-logo" />*/}

      <div className="container">
        <h2 className="auth-title">Employer Registration</h2>

        <form onSubmit={handleRegister}>
          <input type="text" placeholder="Name" className="auth-input" value={name} onChange={(e) => setName(e.target.value)} required />
          <input type="email" placeholder="Email" className="auth-input" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="tel" placeholder="Phone Number" className="auth-input" value={phone} onChange={(e) => setPhone(e.target.value)} pattern="\d{10}" title="Phone number must be 10 digits" required />
          <input type="password" placeholder="Password" className="auth-input" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <input type="text" placeholder="Company Name" className="auth-input" value={companyName} onChange={(e) => setCompanyName(e.target.value)} required />

          

          <select className="auth-input" value={country} onChange={(e) => { setCountry(e.target.value); setState(""); setCity(""); }} required>
          <option value="" style={{ color: "gray" }}>Select Country</option>
            {countryList.map((c) => (
              <option key={c} value={c} style={{ color: "black" }}>{c}</option>
            ))}
          </select>

          <select className="auth-input" value={state} onChange={(e) => { setState(e.target.value); setCity(""); }} disabled={!country} required>
          <option value="" style={{ color: "gray" }}>Select State</option>
            {stateList.map((c) => (
              <option key={c} value={c} style={{ color: "black" }}>{c}</option>
            ))}
          </select>

          <select className="auth-input" value={city} onChange={(e) => setCity(e.target.value)} disabled={!state} required>
          <option value="" style={{ color: "gray" }}>Select City</option>
            {cityList.map((c) => (
              <option key={c} value={c} style={{ color: "black" }}>{c}</option>
            ))}
          </select>

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <br />
        <div className="auth-footer-single">
          <span className="auth-link" onClick={() => navigate("/LoginEmployer")}>
            Back to Login
          </span>
        </div>
      </div>
    </div>
  );
};

export default EmployerRegister;
