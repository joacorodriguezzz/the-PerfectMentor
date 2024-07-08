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
    <div className="flex flex-col bg-customGreen min-h-screen md:flex-row">
      <SideBar />
      <div className="flex-grow p-4 bg-customGreen md:p-8">
        <div className="p-4 mx-4 my-4 bg-white rounded-3xl shadow-xl md:mx-8 md:my-8 md:p-8 md:h-[92%]">
          <h1 className="mb-8 text-3xl text-center text-gray-800 md:mt-20 md:text-5xl">
            Profile
          </h1>
          <div className="p-2 mx-2 my-4 bg-white rounded-3xl shadow-2xl md:mx-8 md:my-8 md:p-4 md:h-[78%] overflow-auto">
            {currentMentor && (
              <div>
                <div className="flex flex-col md:flex-row md:justify-between">
                  <div>
                    <p className="pl-4 mb-2 text-lg text-gray-400">Name</p>
                    <input
                      type="text"
                      className="w-full border-b border-gray-400 focus:outline-none focus:border-gray-500"
                      value={currentMentor.userName}
                      readOnly
                    />
                  </div>
                </div>
                <hr className="mb-2 border-gray-400" />
                <div className="flex flex-col md:flex-row md:justify-between">
                  <div>
                    <p className="pl-4 mb-2 text-lg font-semibold text-gray-400">
                      Email
                    </p>
                    <input
                      type="email"
                      className="w-full border-b border-gray-400 focus:outline-none focus:border-gray-500"
                      value={currentMentor.email}
                      readOnly
                    />
                  </div>
                </div>
                <hr className="mb-2 border-gray-400" />
                <div className="flex flex-col md:flex-row md:justify-between">
                  <div>
                    <p className="pl-4 mb-2 text-lg font-semibold text-gray-400">
                      Role
                    </p>
                    <input
                      type="text"
                      className="w-full border-b border-gray-400 focus:outline-none focus:border-gray-500"
                      value={currentMentor.role}
                      readOnly
                    />
                    <p className="pl-4 mb-2 text-lg font-semibold text-gray-400">
                      Skill
                    </p>
                    <input
                      type="text"
                      className="w-full border-b border-gray-400 focus:outline-none focus:border-gray-500"
                      value={currentMentor.skill}
                      readOnly
                    />
                  </div>
                </div>
                <hr className="mb-2 border-gray-400" />
                <div className="flex flex-col md:flex-row md:justify-between">
                  <div>
                    <p className="pl-4 mb-2 text-lg font-semibold text-gray-400">
                      Age
                    </p>
                    <input
                      type="number"
                      className="w-full border-b border-gray-400 focus:outline-none focus:border-gray-500"
                      value={currentMentor.age}
                      readOnly
                    />
                  </div>
                </div>
                <hr className="mb-2 border-gray-400" />
                <div className="flex flex-col md:flex-row md:justify-between">
                  <div>
                    <p className="pl-4 mb-2 text-lg font-semibold text-gray-400">
                      Country
                    </p>
                    <input
                      type="text"
                      className="w-full border-b border-gray-400 focus:outline-none focus:border-gray-500"
                      value={currentMentor.country}
                      readOnly
                    />
                  </div>
                </div>
                <hr className="mb-2 border-gray-400" />
                <div className="flex flex-col md:flex-row md:justify-between">
                  <div>
                    <p className="pl-4 mb-2 text-lg font-semibold text-gray-400">
                      Language
                    </p>
                    <input
                      type="text"
                      className="w-full border-b border-gray-400 focus:outline-none focus:border-gray-500"
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
