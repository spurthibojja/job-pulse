import "./App.css";
import { Routes, Route } from "react-router-dom";

import Nav from "./Components/Nav";
import ProtectedRoute from "./Components/ProtectedRoute";

import Home from "./Pages/Home";
import Jobs from "./Pages/Jobs";
import SavedJobs from "./Pages/SavedJobs";
import Applications from "./Pages/Applications";
import JobDetails from "./Pages/JobDetails";
import Apply from "./Pages/Apply";
import Profile from "./Pages/Profile";
import PostJob from "./Pages/PostJob";
import Dashboard from "./Pages/Dashboard";

const App = () => {
  return (
    <>
      <Nav />

      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobs/:id" element={<JobDetails />} />

        {/* PROTECTED ROUTES */}
        <Route
          path="/saved"
          element={
            <ProtectedRoute>
              <SavedJobs />
            </ProtectedRoute>
          }
        />

        <Route
          path="/applications"
          element={
            <ProtectedRoute>
              <Applications />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/post-job"
          element={
            <ProtectedRoute>
              <PostJob />
            </ProtectedRoute>
          }
        />

        <Route
          path="/apply"
          element={
            <ProtectedRoute>
              <Apply />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;