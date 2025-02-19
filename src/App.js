import React from "react";
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import JobListings from "./pages/JobListings";
import JobDetails from "./pages/JobDetails";
import EmployerDashboard from "./pages/EmployerDashboard";
import CandidateDashboard from "./pages/CandidateDashboard";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute"; // ✅ Import Protected Route
import "./styles.css";

// If not used, REMOVE this line:



// If you plan to use it, apply it like this:



function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          {/* ✅ Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<JobListings />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
          <Route path="/auth" element={<Auth />} />

          {/* ✅ Protected Routes */}
          <Route path="/employer-dashboard" element={
            <ProtectedRoute>
              <EmployerDashboard />
            </ProtectedRoute>
          } />

          <Route path="/candidate-dashboard" element={
            <ProtectedRoute>
              <CandidateDashboard />
            </ProtectedRoute>
          } />

          {/* ✅ Catch-All Route for 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
