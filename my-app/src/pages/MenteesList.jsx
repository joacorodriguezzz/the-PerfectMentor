import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import {
  faUsers,
  faChartBar,
  faFileAlt,
  faUser,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SideBar from "../components/SideBar";
import axios from "axios";
import { AuthContext } from "../components/AuthContext";
import Cookies from "js-cookie";
import SearchBar from "../components/SearchBar";

export default function MenteesList() {
  const [mentees, setMentees] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchMentees = async () => {
      const token = Cookies.get("authToken");
      try {
        const response = await axios.get(
          "http://localhost:3001/api/userData/mentees",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
        setMentees(response.data); // Suponiendo que la respuesta contiene la lista de mentees
      } catch (error) {
        console.error("Error fetching mentees:", error);
      }
    };

    if (user) {
      fetchMentees();
    }
  }, [user]);

  return (
    <div className="flex bg-customGreen h-screen w-screen">
      <SideBar />
      <div className="bg-customGreen flex-grow">
        <div className="bg-white mx-8 my-8 p-8 rounded-3xl shadow-gray-600 shadow-xl h-[92%] w-944">
          <div className="flex items-center mb-6 shadow-sm">
            <h1 className="text-3xl text-bold">
              My mentees
              <p className="text-base text">View all your mentees</p>
            </h1>
          </div>
          <div className="flex items-center mb-6 shadow-sm">
            {/* Search bar */}
            <SearchBar />
          </div>
          <div className="bg-white mx-8 my-8 p-4 rounded-3xl h-[78%] shadow-2xl overflow-auto">
            <div className="shadow-2xl">
              <table className="w-full">
                <thead>
                  <tr className="text-gray-400 text-sm">
                    <th className="px-4 py-6 border-b border-gray-500">Name</th>
                    <th className="px-4 py-6 border-b border-gray-500">Age</th>
                    <th className="px-4 py-6 border-b border-gray-500">
                      Email
                    </th>
                    <th className="px-4 py-6 border-b border-gray-500">
                      Skill
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {mentees.map((mentee, index) => (
                    <tr
                      key={index}
                      className={
                        " bg-opacity-80 bg-gray-300 border-b border-white shadow-sm"
                      }
                    >
                      <td className="px-4 py-6 text-center">
                        {mentee.userName}
                      </td>
                      <td className="px-4 py-6 text-center">{mentee.age}</td>
                      <td className="px-4 py-6 text-center">{mentee.email}</td>
                      <td className="px-4 py-6 text-center">
                        <div
                          className={`rounded-full ${
                            mentee.status === "Active"
                              ? "bg-green-300"
                              : "bg-pink-300"
                          } flex items-center justify-center px-1 py-0.5 min-w-max`}
                        >
                          <div
                            className={`h-2 w-2 rounded-full ${
                              mentee.status === "Active"
                                ? "bg-green-700"
                                : "bg-pink-700"
                            } mr-1`}
                          ></div>
                          <span
                            className={`text-${
                              mentee.status === "Active" ? "green" : "pink"
                            }-700`}
                          >
                            {mentee.status}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
