import React from "react";
import miImagen from "../components/img/thePerfectMentor.png";
import { Link } from "react-router-dom";

export default function OnBoarding() {
  return (
    <div className="bg-customGreen min-h-screen flex justify-center items-center relative font-sans">
      {/* Div con bordes negros en el centro */}
      <div className="border-2 border-black p-4 flex items-center w-full h-[600px] rounded-3xl relative overflow-hidden md:w-[1000px]">
        {/* Imagen dentro del div */}
        <img
          src={miImagen}
          alt="thePerfectMentor"
          className="absolute top-[20%] left-[50%] h-[160px] w-[300px] transform -translate-x-1/2"
        />

        {/* Botones debajo de la imagen */}
        <div className="absolute top-[55%] left-[50%] transform -translate-x-1/2">
          {/* Botón Sign Up */}
          <Link to="/signUp">
            <button className="bg-gray-800 text-white py-2 px-4 rounded-full mb-4 block w-[90vw] max-w-[360px] h-[50px] font-sans">
              Sign Up
            </button>
          </Link>

          {/* Botón Log In */}
          <Link to="/signIn">
            <button className="bg-customGreen text-white py-2 px-4 rounded-full block border border-black w-[90vw] max-w-[360px] h-[50px] font-sans">
              Sign In
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
