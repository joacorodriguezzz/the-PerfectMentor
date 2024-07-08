import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import miImagen from "../components/img/thePerfectMentor.png";
import { useAuth } from "../components/AuthContext";

export default function SignIn() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    axios
      .post(
        "http://localhost:3001/api/user/signIn",
        { email, password },
        { withCredentials: true }
      )
      .then((response) => {
        const token = response.data.data.token;
        login(email, password);
        alert("Usuario logueado correctamente");
        navigate("/users");
      })
      .catch((error) => {
        alert("Error al intentar iniciar sesión");
        console.error("Error:", error);
      });
  };

  return (
    <div className="bg-customGreen min-h-screen flex flex-col items-center justify-center relative">
      <img
        src={miImagen}
        alt="thePerfectMentor"
        className="absolute top-4 md:top-8 left-1/2 transform -translate-x-1/2 h-24 md:h-32 lg:h-40 w-auto md:w-auto lg:w-auto"
      />

      <div className="border-2 border-black p-3 flex flex-col items-center w-full md:w-3/4 lg:w-2/3 xl:w-1/2 max-w-screen-lg rounded-3xl relative overflow-hidden">
        <h2 className="text-gray-800 text-3xl md:text-5xl mb-6 mt-8 md:mt-0 text-bold">
          Sign In
        </h2>
        <hr className="border-dashed border-gray-800 border-1 w-full mb-6" />

        <h3 className="text-gray-800 text-2xl md:text-4xl mb-4">Hi, Name</h3>

        <div className="relative mb-4 w-full max-w-md">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <FontAwesomeIcon icon={faEnvelope} />
          </div>
          <input
            type="email"
            className="rounded-full bg-customGreen py-2 px-4 pl-12 w-full h-12 border border-gray-800 placeholder-gray-800"
            placeholder="Email"
            onChange={handleEmailChange}
          />
        </div>

        <div className="relative mb-4 w-full max-w-md">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <FontAwesomeIcon icon={faLock} />
          </div>
          <input
            type="password"
            className="rounded-full bg-customGreen py-2 px-4 pl-12 w-full h-12 border border-gray-800 placeholder-gray-800"
            placeholder="Password"
            onChange={handlePasswordChange}
          />
        </div>

        <button
          className="bg-gray-800 text-white py-2 px-4 rounded-full w-full h-12 font-sans mb-4 hover:bg-gray-600"
          onClick={handleLogin}
        >
          Sign In
        </button>

        <div className="flex justify-center text-sm mb-4">
          <span className="text-gray-800">Don't have an account yet? </span>
          <Link to="/signUp" className="text-gray-800 hover:underline">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
{
}
