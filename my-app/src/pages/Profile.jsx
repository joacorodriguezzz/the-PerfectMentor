import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../components/SideBar";
import axios from "axios";

export default function Profile() {
  const [user, setUser] = useState({
    userName: "",
    email: "",
    role: "",
    age: "",
    country: "",
    language: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data on component mount
    axios
      .get("http://localhost:3001/api/userData", {
        withCredentials: true,
      })
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        alert("Error al obtener el perfil del usuario");
        navigate("/signIn");
      });
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      // Make sure to include user._id in the data sent to the backend
      const response = await axios.put(
        `http://localhost:3001/api/userData/update/${user._id}`, // Update endpoint with user._id
        user,
        {
          withCredentials: true,
        }
      );
      const updatedUser = response.data;
      setUser(updatedUser);
      alert("Perfil actualizado con éxito");
    } catch (error) {
      console.error("Error updating user data:", error);
      alert("Error al actualizar el perfil del usuario");
    }
  };

  return (
    <div className="flex flex-col md:flex-row bg-customGreen h-screen">
      <SideBar />
      <div className="bg-customGreen flex-grow p-4 md:p-8">
        <div className="bg-white mx-4 md:mx-8 my-4 md:my-8 p-4 md:p-8 rounded-3xl shadow-gray-600 shadow-xl h-full md:h-[92%] w-full md:w-auto">
          <h1 className="text-3xl md:text-5xl text-center text-gray-800 mb-8 md:mt-20">
            Profile
          </h1>
          <div className="bg-white mx-2 md:mx-8 my-4 md:my-8 p-2 md:p-4 rounded-3xl h-[70%] md:h-[78%] shadow-2xl overflow-auto">
            <div className="flex flex-col md:flex-row justify-between mb-8">
              <div className="w-full md:w-1/2 md:pr-8">
                <p className="text-lg mb-2 text-gray-400">Your name</p>
                <input
                  type="text"
                  name="userName"
                  className="border-b border-gray-400 focus:outline-none focus:border-gray-500 w-full"
                  onChange={handleInputChange}
                  value={user.userName}
                />
              </div>
              <div className="w-full md:w-1/2 md:pl-8 mt-4 md:mt-0">
                <p className="text-lg font-semibold mb-2 text-gray-400">
                  Your email
                </p>
                <input
                  type="email"
                  name="email"
                  className="border-b border-gray-400 focus:outline-none focus:border-gray-500 w-full"
                  onChange={handleInputChange}
                  value={user.email}
                />
              </div>
            </div>
            <hr className="border-gray-400 mb-8" />
            <div className="flex flex-col md:flex-row justify-between mb-8">
              <div className="w-full md:w-1/2 md:pr-8">
                <p className="text-lg font-semibold mb-2 text-gray-400">
                  Your role
                </p>
                <select
                  name="role"
                  className="border-b border-gray-400 focus:outline-none focus:border-gray-500 w-full"
                  onChange={handleInputChange}
                  value={user.role}
                >
                  <option value="" disabled hidden>
                    Select Role
                  </option>
                  <option value="mentor">Mentor</option>
                  <option value="mentee">Mentee</option>
                </select>
              </div>
              <div className="w-full md:w-1/2 md:pl-8 mt-4 md:mt-0">
                <p className="text-lg font-semibold mb-2 text-gray-400">
                  Your Skill
                </p>
                <select
                  name="skill"
                  className="border-b border-gray-400 focus:outline-none focus:border-gray-500 w-full"
                  onChange={handleInputChange}
                  value={user.skill}
                >
                  <option value="" disabled>
                    Select Skill
                  </option>
                  <option value="Frontend Web Dev">
                    Frontend web developer
                  </option>
                  <option value="Backend Web Dev">Backend web developer</option>
                  <option value="Fullstack Web Dev">
                    Full-stack web developer
                  </option>
                  <option value="Mobile App Dev">
                    Mobile application developer
                  </option>
                  <option value="Desktop Softw Dev">
                    Desktop software developer
                  </option>
                  <option value="Big Data Dev">
                    Data Scientist (Big Data Developer)
                  </option>
                </select>
              </div>
            </div>
            <hr className="border-gray-400 mb-8" />
            <div className="flex flex-col md:flex-row justify-between mb-8">
              <div className="w-full md:w-1/2 md:pr-8">
                <p className="text-lg font-semibold mb-2 text-gray-400">Age</p>
                <input
                  type="number"
                  name="age"
                  className="border-b border-gray-400 focus:outline-none focus:border-gray-500 w-full"
                  min="0"
                  max="100"
                  onChange={handleInputChange}
                  value={user.age}
                />
              </div>
              <div className="w-full md:w-1/2 md:pl-8 mt-4 md:mt-0">
                <p className="text-lg font-semibold mb-2 text-gray-400">
                  Country
                </p>
                <select
                  name="country"
                  className="border-b border-gray-400 focus:outline-none focus:border-gray-500 w-full"
                  onChange={handleInputChange}
                  value={user.country}
                >
                  <option value="" disabled hidden>
                    Select Country
                  </option>
                  <option value="Argentina">Argentina</option>
                  <option value="España">España</option>
                  <option value="Colombia">Colombia</option>
                  <option value="Mexico">Mexico</option>
                  <option value="Estados Unidos">Estados Unidos</option>
                </select>
              </div>
            </div>
            <hr className="border-gray-400 mb-8" />
            <div className="flex flex-col md:flex-row justify-between mb-8">
              <div className="w-full md:w-1/2 md:pr-8">
                <p className="text-lg font-semibold mb-2 text-gray-400">
                  Language
                </p>
                <select
                  name="language"
                  className="border-b border-gray-400 focus:outline-none focus:border-gray-500 w-full"
                  onChange={handleInputChange}
                  value={user.language}
                >
                  <option value="" disabled hidden>
                    Select Language
                  </option>
                  <option value="Español">Español</option>
                  <option value="Ingles">Ingles</option>
                  <option value="Portugues">Portugues</option>
                </select>
              </div>
            </div>
            <hr className="border-gray-400 mb-8" />
            <div className="flex justify-center">
              <button
                className="bg-customGreen text-white px-4 py-2 rounded"
                onClick={handleSubmit}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
