import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  faUsers,
  faChartBar,
  faFileAlt,
  faUser,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import SideBar from "../components/SideBar";
import axios from "axios";
import Chart from "../components/StatisticsChart";

export default function Statistics() {
  const [users, setUsers] = useState([]);
  const [totalMentors, setTotalMentors] = useState(0);
  const [totalMentees, setTotalMentees] = useState(0);
  const [recentUsers, setRecentUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/users", {
          withCredentials: true,
        });
        setUsers(response.data);
        const mentors = response.data.filter(
          (user) => user.role === "mentor"
        ).length;
        const mentees = response.data.filter(
          (user) => user.role === "mentee"
        ).length;
        setTotalMentors(mentors);
        setTotalMentees(mentees);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    const fetchRecentUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/users/recent-users",
          {
            withCredentials: true,
          }
        );
        setRecentUsers(response.data);
      } catch (error) {
        console.error("Error fetching recent users:", error);
      }
    };

    fetchUsers();
    fetchRecentUsers();
  }, []);

  return (
    <div className="flex bg-customGreen h-screen">
      <SideBar />
      <div className="bg-customGreen flex-grow">
        <div className="bg-white mx-8 my-8 p-8 rounded-3xl shadow-gray-600 shadow-xl h-[92%] w-944">
          <div className="flex items-center mb-6 shadow-sm">
            <h1 className="text-3xl text-bold">
              Statistics
              <p className="text-base text">
                Check all the activity of your page
              </p>
            </h1>
          </div>
          <div className="flex">
            <div className="bg-gray-200 my-2 p-8 rounded-3xl w-[50%] shadow-2xl text-gray-900 relative text-bold h-48">
              <h1 className="text-3xl font-bold mb-2">Total of users</h1>
              <hr className="border-dashed border-gray-400 mb-2" />
              <div className="text-lg">
                <div className="border-b border-gray-400 py-2 flex justify-between items-center h-8">
                  <p>Mentees</p> <span>{totalMentees}</span>
                </div>
                <div className="border-b border-gray-400 py-2 flex justify-between items-center h-8">
                  <p>Mentors</p> <span>{totalMentors}</span>
                </div>
                <div className="border-b border-gray-400 py-2 flex justify-between items-center h-8">
                  <p>Total users</p> <span>{users.length}</span>
                </div>
              </div>
            </div>
            <div className="bg-gray-200 mx-8 my-2 p-8 rounded-3xl w-[50%] shadow-2xl text-gray-900 relative text-bold h-48">
              <h1 className="text-3xl font-bold mb-2">New Users</h1>
              <hr className="border-dashed border-gray-400 mb-2" />
              <div className="text-lg">
                <div className="border-b border-gray-400 py-2 flex justify-between items-center h-8">
                  <p>Recent users</p> <span>{recentUsers.length}</span>
                </div>
              </div>
            </div>
          </div>
          <Chart />
        </div>
      </div>
    </div>
  );
}
