// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom"; 
// import "./Login.css";
// import logo from "./assets/Se-logo.jpg";

// const EmployeeRegister = () => {
//   //console.log("check 1");
//   const navigate = useNavigate(); // ✅ Initialize navigate
//   //console.log("check 2");

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [password, setPassword] = useState("");
//   const [location, setLocation] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     setLoading(true); // Show loading state

//     const userData = { name, email, phone, password, location };


//     try {
//       console.log("going to create user data");
//       const response = await fetch("http://localhost:5000/api/employees/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(userData),
//       });
//       console.log("REsponse received");
//       if (!response.ok) {
//         //not proceeding after this why!!
//         const errorData = await response.json(); 
//         console.error("❌ Registration Error:", errorData);
//         throw new Error(errorData.message || "Registration failed.");
//       }
//       console.log("Mass");
//       alert("✅ Registration Successful!");
//       navigate("/LoginEmployee"); // Redirect to login

//     } catch (error) {
//       console.error("❌ Error:", error);
//       alert(error.message || "Something went wrong. Please try again.");
//     } finally {
//       setLoading(false); // Hide loading state
//     }
//   };

//   return (
//     <div className="page-container">
//       {/* TaskThozhan Logo at Top-Left */}
//       <img src={logo} alt="TaskThozhan Logo" className="top-left-logo" />

//       <div className="container">
//         <h2 className="auth-title">Employee Registration</h2>

//         <form onSubmit={handleRegister}>
//           <input
//             type="text"
//             placeholder="Name"
//             className="auth-input"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />
//           <input
//             type="email"
//             placeholder="Email"
//             className="auth-input"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//           <input
//             type="tel"
//             placeholder="Phone Number"
//             className="auth-input"
//             value={phone}
//             onChange={(e) => setPhone(e.target.value)}
//             pattern="\d{10}"      // ✅ only 10 digits
//             title="Phone number must be 10 digits"
//             required
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             className="auth-input"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           <input
//             type="text"
//             placeholder="Current Location"
//             className="auth-input"
//             value={location}
//             onChange={(e) => setLocation(e.target.value)}
//             required
//           />

//           <button type="submit" className="auth-button" disabled={loading}>
//             {loading ? "Registering..." : "Register"}
//           </button>
//         </form>

//         <br />
//         <div className="auth-footer-single">
//           <span className="auth-link" onClick={() => navigate("/LoginEmployee")}>
//             Back to Login
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EmployeeRegister;
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

const EmployeeRegister = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");

  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    const userData = {
      name,
      email,
      phone,
      password,
      country,
      state,
      city
    };
    

    try {
      const response = await fetch("http://localhost:5000/api/employees/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed.");
      }

      alert("✅ Registration Successful!");
      navigate("/LoginEmployee");
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
      

      <div className="container">
        <h2 className="auth-title">Employee Registration</h2>

        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Name"
            className="auth-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="auth-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="tel"
            placeholder="Phone Number"
            className="auth-input"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            pattern="\d{10}"
            title="Phone number must be of 10 digits"
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

          {/* Dynamic Country Dropdown */}
          <select
            className="auth-input"
            value={country}
            onChange={(e) => {
              setCountry(e.target.value);
              setState("");
              setCity("");
            }}
            required
          >
            <option value="" style={{ color: "gray" }}>Select Country</option>
            {countryList.map((c) => (
              <option key={c} value={c} style={{ color: "black" }}>{c}</option>
            ))}
          </select>

          {/* State Dropdown (dependent on country) */}
          <select
            className="auth-input"
            value={state}
            onChange={(e) => {
              setState(e.target.value);
              setCity("");
            }}
            disabled={!country}
            required
          >
            
            <option value="" style={{ color: "gray" }}>Select State</option>
            {stateList.map((c) => (
              <option key={c} value={c} style={{ color: "black" }}>{c}</option>
            ))}
          </select>

          {/* City Dropdown (dependent on state) */}
          <select
            className="auth-input"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            disabled={!state}
            required
          >
            
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
          <span className="auth-link" onClick={() => navigate("/LoginEmployee")}>
            Back to Login
          </span>
        </div>
      </div>
    </div>
  );
};

export default EmployeeRegister;