import React, { useState, useEffect } from "react";
import axios from "axios";
import SideBar from "../components/SideBar";

export default function InfoMent() {
  const [currentMentor, setCurrentMentor] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const loggedUserResponse = await axios.get(
          "http://localhost:3001/api/userData",
          {
            withCredentials: true,
          }
        );
        console.log("Logged user:", loggedUserResponse.data);

        // Check if there is a mentor assigned
        if (loggedUserResponse.data.mentorId) {
          try {
            // Fetch mentor details
            const mentorResponse = await axios.get(
              `http://localhost:3001/api/users/${loggedUserResponse.data.mentorId}`,
              {
                withCredentials: true,
              }
            );
            console.log("Current mentor:", mentorResponse.data);
            setCurrentMentor(mentorResponse.data);
          } catch (error) {
            console.error("Error fetching current mentor:", error);
            setCurrentMentor(null); // Handle error case
          }
        } else {
          console.log("No mentor assigned.");
          setCurrentMentor(null);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex bg-customGreen h-screen">
      <SideBar />
      <div className="bg-customGreen flex-grow relative">
        <div className="bg-white mx-8 my-8 p-8 rounded-3xl shadow-gray-600 shadow-xl h-[92%] w-944">
          <h1 className="flex items-center justify-center text-5xl absolute top-28 left-[50%] transform -translate-x-1/2 text-gray-800">
            Profile
          </h1>
          <div className="bg-white mx-auto mt-24 p-8 rounded-3xl h-[85%] shadow-2xl overflow-auto w-1/2 pt-[15%]">
            {currentMentor && (
              <div>
                <div className="flex justify-between">
                  <div>
                    <p className="text-lg mb-2 pl-4 text-gray-400">Name</p>
                    <input
                      type="text"
                      className="border-b border-gray-400 focus:outline-none focus:border-gray-500"
                      value={currentMentor.userName}
                      readOnly
                    />
                  </div>
                </div>
                <hr className="border-gray-400 mb-2" />
                <div className="flex justify-between">
                  <div>
                    <p className="text-lg font-semibold mb-2 pl-4 text-gray-400">
                      Email
                    </p>
                    <input
                      type="email"
                      className="border-b border-gray-400 focus:outline-none focus:border-gray-500"
                      value={currentMentor.email}
                      readOnly
                    />
                  </div>
                </div>
                <hr className="border-gray-400 mb-2" />
                <div className="flex justify-between">
                  <div>
                    <p className="text-lg font-semibold mb-2 pl-4 text-gray-400">
                      Role
                    </p>
                    <input
                      type="text"
                      className="border-b border-gray-400 focus:outline-none focus:border-gray-500"
                      value={currentMentor.role}
                      readOnly
                    />
                    <p className="text-lg font-semibold mb-2 pl-4 text-gray-400">
                      Skill
                    </p>
                    <input
                      type="text"
                      className="border-b border-gray-400 focus:outline-none focus:border-gray-500"
                      value={currentMentor.skill}
                      readOnly
                    />
                  </div>
                </div>
                <hr className="border-gray-400 mb-2" />
                <div className="flex justify-between">
                  <div>
                    <p className="text-lg font-semibold mb-2 pl-4 text-gray-400">
                      Age
                    </p>
                    <input
                      type="number"
                      className="border-b border-gray-400 focus:outline-none focus:border-gray-500"
                      value={currentMentor.age}
                      readOnly
                    />
                  </div>
                </div>
                <hr className="border-gray-400 mb-2" />
                <div className="flex justify-between">
                  <div>
                    <p className="text-lg font-semibold mb-2 pl-4 text-gray-400">
                      Country
                    </p>
                    <input
                      type="text"
                      className="border-b border-gray-400 focus:outline-none focus:border-gray-500"
                      value={currentMentor.country}
                      readOnly
                    />
                  </div>
                </div>
                <hr className="border-gray-400 mb-2" />
                <div className="flex justify-between">
                  <div>
                    <p className="text-lg font-semibold mb-2 pl-4 text-gray-400">
                      Language
                    </p>
                    <input
                      type="text"
                      className="border-b border-gray-400 focus:outline-none focus:border-gray-500"
                      value={currentMentor.language}
                      readOnly
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
