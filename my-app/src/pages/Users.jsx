import React, { useState, useEffect } from "react";
import axios from "axios";
import SideBar from "../components/SideBar";
import SearchBar from "../components/SearchBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPersonCirclePlus } from "@fortawesome/free-solid-svg-icons";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/users", {
          withCredentials: true,
        });
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex bg-customGreen h-screen w-screen">
      <SideBar />
      <div className="bg-customGreen flex-grow">
        <div className="bg-white mx-8 my-8 p-8 rounded-3xl shadow-gray-600 shadow-xl h-[92%] w-944">
          <div className="flex items-center mb-6 shadow-sm">
            <h1 className="text-3xl font-bold">Users</h1>
            <p className="text-base ml-2 text-gray-500">View all the users</p>
          </div>
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />{" "}
          {/* Pasa setSearchTerm como prop */}
          <div className="bg-white mx-8 my-8 p-4 rounded-3xl h-[78%] shadow-2xl overflow-auto">
            <table className="w-full">
              <thead>
                <tr className="text-gray-400 text-sm">
                  <th className="px-4 py-3 border-b border-gray-500">Name</th>
                  <th className="px-4 py-3 border-b border-gray-500">Age</th>
                  <th className="px-4 py-3 border-b border-gray-500">Email</th>
                  <th className="px-4 py-3 border-b border-gray-500">Role</th>
                  <th className="px-4 py-3 border-b border-gray-500">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user, index) => (
                  <tr
                    key={index}
                    className={`${
                      user.role === "mentee" ? "bg-green-200" : "bg-pink-200"
                    } bg-opacity-80 border-b border-white shadow-sm`}
                  >
                    <td className="px-4 py-3 text-center">{user.userName}</td>
                    <td className="px-4 py-3 text-center">{user.age}</td>
                    <td className="px-4 py-3 text-center">{user.email}</td>
                    <td className="px-4 py-3 text-center">{user.role}</td>
                    <td className="px-4 py-3 text-center">
                      {user.role === "mentee" && (
                        <button
                          className="w-7 h-7 rounded-full border-2 border-gray-800"
                          // onClick={() => sendMentorshipRequest(user._id)}
                        >
                          <FontAwesomeIcon
                            icon={faPersonCirclePlus}
                            className="text-gray-700"
                          />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
