import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import miImagen from "../components/img/thePerfectMentor.png";
import { useNavigate } from "react-router-dom";
import {
  faUser,
  faEnvelope,
  faLock,
  faUserPen,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SignUp() {
  const [userName, setUserName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRegister = () => {
    axios
      .post(
        "http://localhost:3001/api/user/signUp",
        {
          userName: userName,
          role: role,
          email: email,
          password: password,
        },
        { withCredentials: true }
      )
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
          console.log("error");
        } else {
          alert("Usuario registrado correctamente");
          navigate("/signIn");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert(
          "Hubo un error al procesar la solicitud. Por favor, inténtalo de nuevo más tarde."
        );
      });
  };

  const userIcon = <FontAwesomeIcon icon={faUser} />;
  const emailIcon = <FontAwesomeIcon icon={faEnvelope} />;
  const passwordIcon = <FontAwesomeIcon icon={faLock} />;

  return (
    <div className="bg-customGreen min-h-screen flex flex-col items-center justify-center relative">
      <Link to="/" className="absolute top-4 left-4">
        <img src={miImagen} alt="thePerfectMentor" className="h-16 w-32" />
      </Link>
      <div className="border-2 border-black p-3 w-full md:w-3/4 lg:w-1/2 xl:w-2/5 rounded-3xl relative overflow-hidden">
        {/* Título "Sign Up" */}
        <h2 className="text-gray-800 text-3xl mb-4 text-center">Sign up</h2>
        <hr className="border-dashed border-gray-800 border-1 w-full mb-4" />

        {/* Inputs */}
        <div className="mb-4">
          <div className="relative mb-3">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              {userIcon}
            </div>
            <input
              type="text"
              className="rounded-full bg-customGreen py-2 px-4 pl-12 w-full h-12 border border-gray-800 placeholder-gray-800"
              placeholder="Username"
              onChange={handleUserNameChange}
            />
          </div>

          <div className="relative mb-3">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              {emailIcon}
            </div>
            <input
              type="email"
              className="rounded-full bg-customGreen py-2 px-4 pl-12 w-full h-12 border border-gray-800 placeholder-gray-800"
              placeholder="Email"
              onChange={handleEmailChange}
            />
          </div>

          <div className="relative mb-3">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              {passwordIcon}
            </div>
            <input
              type="password"
              className="rounded-full bg-customGreen py-2 px-4 pl-12 w-full h-12 border border-gray-800 placeholder-gray-800"
              placeholder="Password"
              onChange={handlePasswordChange}
            />
          </div>

          <div className="relative mb-3">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <FontAwesomeIcon icon={faUserPen} />
            </div>
            <select
              className="rounded-full bg-customGreen py-2 px-4 pl-12 w-full h-12 border border-gray-800 text-black"
              defaultValue=""
              onChange={handleRoleChange}
            >
              <option value="" disabled hidden>
                Select Role
              </option>
              <option value="mentor">Mentor</option>
              <option value="mentee">Mentee</option>
            </select>
          </div>
        </div>

        <button
          className="bg-gray-800 text-white py-2 px-4 rounded-full block w-full mb-4 font-sans"
          onClick={handleRegister}
        >
          Sign Up
        </button>

        {/* Enlaces adicionales */}
        <div className="flex justify-center text-sm">
          <span className="text-gray-800">
            Already have an account?{" "}
            <Link to="/signIn" className="text-gray-800 hover:underline">
              Sign In
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}
