import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import JobList from "./pages/JobList";
import JobDetail from "./pages/JobDetail";
import PostJob from "./pages/PostJob";
import CandidateDashboard from "./pages/CandidateDashboard";
import EmployerDashboard from "./pages/EmployerDashboard";
import Profile from "./pages/Profile";
import RecommendedJobs from "./components/RecommendedJobs";
import Chatbot from "./components/Chatbot";
import ResumeUpload from "./components/ResumeUpload";
import InterviewSchedule from "./components/InterviewSchedule";
import Notifications from "./components/Notifications";
import "./App.css"; // normal CSS
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/jobs" element={<JobList />} />
          <Route path="/job/:id" element={<JobDetail />} />
          <Route path="/post-job" element={<PostJob />} />
          <Route path="/candidate-dashboard" element={<CandidateDashboard />} />
          <Route path="/employer-dashboard" element={<EmployerDashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/recommendedjobs" element={<RecommendedJobs />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/resume-upload" element={<ResumeUpload />} />
          <Route path="/interview-schedule" element={<InterviewSchedule />} />
          <Route path="/notifications" element={<Notifications />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
