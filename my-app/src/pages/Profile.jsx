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
    <div className="flex bg-customGreen h-screen">
      <SideBar />
      <div className="bg-customGreen flex-grow relative">
        <div className="bg-white mx-8 my-8 p-8 rounded-3xl shadow-gray-600 shadow-xl h-[92%] w-944">
          <h1 className="flex items-center justify-center text-5xl absolute top-28 left-[50%] transform -translate-x-1/2 text-gray-800">
            Profile
          </h1>
          <div className="bg-white mx-auto mt-24 p-8 rounded-3xl h-[85%] shadow-2xl overflow-auto w-1/2 pt-[15%]">
            <div>
              <div className="flex justify-between">
                <div>
                  <p className="text-lg mb-2 pl-4 text-gray-400">Your name</p>
                  <input
                    type="text"
                    name="userName"
                    className="border-b border-gray-400 focus:outline-none focus:border-gray-500"
                    onChange={handleInputChange}
                    value={user.userName}
                  />
                </div>
              </div>
              <hr className="border-gray-400 mb-2" />
              <div className="flex justify-between">
                <div>
                  <p className="text-lg font-semibold mb-2 pl-4 text-gray-400">
                    Your email
                  </p>
                  <input
                    type="email"
                    name="email"
                    className="border-b border-gray-400 focus:outline-none focus:border-gray-500"
                    onChange={handleInputChange}
                    value={user.email}
                  />
                </div>
              </div>
              <hr className="border-gray-400 mb-2" />
              <div className="flex justify-between">
                <div>
                  <p className="text-lg font-semibold mb-2 pl-4 text-gray-400">
                    Your role
                  </p>
                  <select
                    name="role"
                    className="border-b border-gray-400 focus:outline-none focus:border-gray-500"
                    onChange={handleInputChange}
                    value={user.role}
                  >
                    <option value="" disabled hidden>
                      Select Role
                    </option>
                    <option value="mentor">Mentor</option>
                    <option value="mentee">Mentee</option>
                  </select>
                  <p className="text-lg font-semibold mb-2 pl-4 text-gray-400">
                    Your Skill
                  </p>
                  <select
                    name="skill"
                    className="border-b border-gray-400 focus:outline-none focus:border-gray-500"
                    onChange={handleInputChange}
                    value={user.skill}
                  >
                    <option value="" disabled hidden>
                      Select Skill
                    </option>
                    <option value="front">Frontend web developer</option>
                    <option value="back">Backend web developer</option>
                    <option value="fullstack">Full-stack web developer</option>
                    <option value="mobile">Mobile application developer</option>
                    <option value="desktop">Desktop software developer</option>
                    <option value="bigData">
                      Data Scientist (Big Data Developer)
                    </option>
                  </select>
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
                    name="age"
                    className="border-b border-gray-400 focus:outline-none focus:border-gray-500"
                    min="0"
                    max="100"
                    onChange={handleInputChange}
                    value={user.age}
                  />
                </div>
              </div>
              <hr className="border-gray-400 mb-2" />
              <div className="flex justify-between">
                <div>
                  <p className="text-lg font-semibold mb-2 pl-4 text-gray-400">
                    Country
                  </p>
                  <select
                    name="country"
                    className="border-b border-gray-400 focus:outline-none focus:border-gray-500"
                    onChange={handleInputChange}
                    value={user.country}
                  >
                    <option value="" disabled hidden>
                      Select Country
                    </option>
                    <option value="argentina">Argentina</option>
                    <option value="españa">España</option>
                    <option value="colombia">Colombia</option>
                    <option value="mexico">Mexico</option>
                    <option value="estadosUnidos">Estados Unidos</option>
                  </select>
                </div>
              </div>
              <hr className="border-gray-400 mb-2" />
              <div className="flex justify-between">
                <div>
                  <p className="text-lg font-semibold mb-2 pl-4 text-gray-400">
                    Language
                  </p>
                  <select
                    name="language"
                    className="border-b border-gray-400 focus:outline-none focus:border-gray-500"
                    onChange={handleInputChange}
                    value={user.language}
                  >
                    <option value="" disabled hidden>
                      Select Language
                    </option>
                    <option value="español">Español</option>
                    <option value="ingles">Ingles</option>
                    <option value="portugues">Portugues</option>
                  </select>
                </div>
              </div>
              <hr className="border-gray-400 mb-2" />
              <div className="flex justify-center mt-8">
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
    </div>
  );
}
