// // App.jsx
// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import DashboardLayout from "./DashboardLayout";
// import Home from "./Home";
// import LoginEmployee from "./loginEmployee";
// import LoginEmployer from "./LoginEmployer";
// import EmployeeRegister from "./EmployeeRegister";
// import EmployerRegister from "./EmployerRegister";
// import AboutTaskThozhan from "./AboutTaskThozhan"; // ✅ Import the About page
// import ForgotPassword from "./ForgotPassword";
// import ResetPassword from "./ResetPassword";
// import EmployerForgotPassword from "./EmployerForgotPassword";
// import EmployerResetPassword from "./EmployerResetPassword";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* DashboardLayout as the parent route */}
//         <Route path="/" element={<DashboardLayout />}>
//           <Route index element={<Home />} />
//           <Route path="LoginEmployee" element={<LoginEmployee />} />
//           <Route path="LoginEmployer" element={<LoginEmployer />} />
//           <Route path="EmployeeRegister" element={<EmployeeRegister />} />
//           <Route path="EmployerRegister" element={<EmployerRegister />} />
//           <Route path="about" element={<AboutTaskThozhan />} />
//           <Route path="/forgot-password" element={<ForgotPassword />} />
//           <Route path="/reset-password/:token" element={<ResetPassword />} />
//           <Route path="/employer/forgot-password" element={<EmployerForgotPassword />} />
//           <Route path="/employer/reset-password/:token" element={<EmployerResetPassword />} />
          
//         </Route>
//       </Routes>
//     </Router>
//   );
// }

// export default App;
// App.jsx
// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import DashboardLayout from "./DashboardLayout";
// import Home from "./Home";
// import LoginEmployee from "./loginEmployee";
// import LoginEmployer from "./LoginEmployer";
// import EmployeeRegister from "./EmployeeRegister";
// import EmployerRegister from "./EmployerRegister";
// import AboutTaskThozhan from "./AboutTaskThozhan";
// import ForgotPassword from "./ForgotPassword";
// import ResetPassword from "./ResetPassword";
// import EmployerForgotPassword from "./EmployerForgotPassword";
// import EmployerResetPassword from "./EmployerResetPassword";
// import Mainpage_employee from "./Mainpage_employee"; // ✅ Import your new dashboard

// function App() {
//   return (
//     <Router>
//       <Routes>

//         {/* ✅ Route for Employee Dashboard */}
//         <Route path="/employee-dashboard" element={<Mainpage_employee />} />

//         {/* Other routes wrapped in common layout */}
//         <Route path="/" element={<DashboardLayout />}>
//           <Route index element={<Home />} />
//           <Route path="LoginEmployee" element={<LoginEmployee />} />
//           <Route path="LoginEmployer" element={<LoginEmployer />} />
//           <Route path="EmployeeRegister" element={<EmployeeRegister />} />
//           <Route path="EmployerRegister" element={<EmployerRegister />} />
//           <Route path="about" element={<AboutTaskThozhan />} />
//           <Route path="forgot-password" element={<ForgotPassword />} />
//           <Route path="reset-password/:token" element={<ResetPassword />} />
//           <Route path="employer/forgot-password" element={<EmployerForgotPassword />} />
//           <Route path="employer/reset-password/:token" element={<EmployerResetPassword />} />
//         </Route>

//       </Routes>
//     </Router>
//   );
// }

// export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardLayout from "./DashboardLayout"; // The common layout component
import Mainpage_employee from "./Mainpage_employee"; // Employee Dashboard page
import Mainpage_employer from "./Mainpage_employer"; // Employer Dashboard page
import JobPostings from "./JobPostings"; // JobPostings component
import JobPostings_creation from "./JobPostings_creation"; // JobPostings component
import JobApplication from "./JobApplication"; // JobApplication component
import Home from "./Home"; // Home page, this will be the default page

import LoginEmployee from "./loginEmployee"; // Other necessary components
import LoginEmployer from "./LoginEmployer";
import EmployeeRegister from "./EmployeeRegister";
import EmployerRegister from "./EmployerRegister";
import AboutTaskThozhan1 from "./AboutTaskThozhan";
import AboutTaskThozhan_mainpage from "./AboutTaskThozhan_employee";
import AboutTaskThozhan_mainpage_employer from "./AboutTaskThozhan_employer";
import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword";
import EmployerForgotPassword from "./EmployerForgotPassword";
import EmployerResetPassword from "./EmployerResetPassword";
import MyApplication_employee from "./MyApplications_employee";
import ApplicationsView_Employer from "./ApplicationsView_Employer";
import EmployerProfile from "./EmployerProfile";
import EmployeeProfile from "./EmployeeProfile";

function App() {
  return (
    <Router>
      <Routes>
        {/* Main Layout Wrapper */}
        <Route path="/" element={<DashboardLayout />}>
          
          {/* Default route - Home Page */}
          <Route index element={<Home />} /> {/* Home page when the app starts */}

          {/* Employee Dashboard Route */}
          <Route path="employee-dashboard" element={<Mainpage_employee />} /> {/* Employee Dashboard */}

          {/* Employer Dashboard Route */}
          <Route path="employer-dashboard" element={<Mainpage_employer />} /> {/* Employer Dashboard */}

          {/* Job Postings Page */}
          <Route path="job-postings" element={<JobPostings />} /> {/* Job Postings Page */}

          {/* Job Postings Page */}
          <Route path="job-postings-creation" element={<JobPostings_creation />} /> {/* Job Postings Page */}

          {/* Job Application Page with dynamic jobId */}
          <Route path="job-application/:jobId" element={<JobApplication />} />

          <Route path="my-applications-employee" element={<MyApplication_employee/>} />

          <Route path="applications-viewer-employer" element={<ApplicationsView_Employer/>} />


          {/* Authentication Routes */}
          <Route path="LoginEmployee" element={<LoginEmployee />} />
          <Route path="LoginEmployer" element={<LoginEmployer />} />
          <Route path="EmployeeRegister" element={<EmployeeRegister />} />
          <Route path="EmployerRegister" element={<EmployerRegister />} />

          {/* Other Routes */}
          <Route path="About" element={<AboutTaskThozhan1 />} />
          <Route path="Aboutpage" element={<AboutTaskThozhan_mainpage />} />
          <Route path="About_page" element={<AboutTaskThozhan_mainpage_employer />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password/:token" element={<ResetPassword />} />
          <Route path="employer/forgot-password" element={<EmployerForgotPassword />} />
          <Route path="employer/reset-password/:token" element={<EmployerResetPassword />} />

          {/* Profile Routes */}
          <Route path="employer-profile" element={<EmployerProfile />} />
          <Route path="employee-profile" element={<EmployeeProfile />} />

        </Route>
      </Routes>
    </Router>
  );
}

export default App;

