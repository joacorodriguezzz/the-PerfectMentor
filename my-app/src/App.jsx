import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import OnBoarding from "./pages/OnBoarding";
import "tailwindcss/tailwind.css";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/SignIn";
import Users from "./pages/Users";
import Profile from "./pages/Profile";
import Stadistics from "./pages/Statistics";
import MenteesList from "./pages/MenteesList";
import { AuthProvider } from "./components/AuthContext";

import SideBar from "./components/SideBar";

function App() {
  return (
    <div className="font-sans">
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<OnBoarding />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/signIn" element={<LogIn />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/statistics" element={<Stadistics />} />
            <Route path="/users" element={<Users />} />
            <Route path="/menteesList" element={<MenteesList />} />
            <Route path="/infoMent" element={<Users />} />
            <Route path="/achievememts" element={<Users />} />
            <Route path="/goals" element={<Users />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
