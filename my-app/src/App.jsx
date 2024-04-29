import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import OnBoarding from "./pages/OnBoarding";
import "tailwindcss/tailwind.css";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/SignIn";
import Users from "./pages/Users";
import Profile from "./pages/Profile";
import Statistics from "./pages/Statistics";
import Reports from "./pages/Reports";

function App() {
  return (
    <div className="font-sans">
      <Router>
        <Routes>
          <Route path="/" element={<OnBoarding />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/signIn" element={<LogIn />} />

          <Route path="/profile" element={<Profile />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;