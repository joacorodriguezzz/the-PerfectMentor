import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  faUsersLine,
  faChartBar,
  faIdBadge,
  faSignOutAlt,
  faBars,
  faFontAwesome,
  faBullseye,
  faSitemap,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import miImagen from "./img/thePerfectMentor.png";
import axios from "axios";
import Cookies from "js-cookie";
import { useAuth } from "./AuthContext";

export default function SideBar() {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const [userRole, setUserRole] = useState("");
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    const fetchUserRole = async () => {
      const token = Cookies.get("authToken"); // Obtener el token de las cookies
      if (token) {
        try {
          const response = await axios.post(
            "http://localhost:3001/api/userData",
            {}, // No se necesita un cuerpo para la solicitud
            {
              withCredentials: true, // Incluir credenciales en la solicitud
              headers: {
                Authorization: `Bearer ${token}`, // Incluir el token en los encabezados
              },
            }
          );
          console.log("Role response:", response.data.role); // Verificar la respuesta del servidor
          setUserRole(response.data.role);
        } catch (error) {
          console.error("Error al obtener el rol del usuario:", error);
        }
      }
    };

    fetchUserRole();
  }, [user]);

  const handleLogout = () => {
    // Eliminar la cookie de autenticación
    Cookies.remove("authToken"); // Asegúrate de que el nombre coincida con el nombre de la cookie de autenticación

    // Actualizar el estado de autenticación
    setUser(null);

    // Redirigir al usuario a la página de inicio de sesión
    navigate("/signIn");
  };

  return (
    <div className="md:bg-customGreen md:text-gray-500 md:w-[13%] md:pb-10">
      <div className="p-4 flex justify-between items-center md:block">
        {/* Sidebar Header */}
        <img src={miImagen} alt="Sidebar Header" className="md:block hidden" />
        <button
          className="md:hidden text-gray-500"
          onClick={() => setShowSidebar(!showSidebar)}
        >
          <FontAwesomeIcon icon={faBars} size="lg" />
        </button>
      </div>
      <div
        className={`md:block ${
          showSidebar ? "block" : "hidden"
        } md:w-auto w-full bg-customGreen text-gray-500`}
      >
        <ul className="py-4">
          <Link to="/users">
            <li className="px-4 py-6 cursor-pointer flex items-center hover:bg-gray-800 hover:text-customGreen hover:rounded-3xl">
              <FontAwesomeIcon icon={faUsersLine} className="mr-2" />
              Users
            </li>
          </Link>
          <Link to="/statistics">
            <li className="px-4 py-6 hover:bg-gray-800 hover:text-customGreen cursor-pointer flex items-center hover:rounded-3xl">
              <FontAwesomeIcon icon={faChartBar} className="mr-2" />
              Stadistics
            </li>
          </Link>
          <Link to="/profile">
            <li className="px-4 py-6 hover:bg-gray-800 hover:text-customGreen cursor-pointer flex items-center hover:rounded-3xl">
              <FontAwesomeIcon icon={faIdBadge} className="mr-2" />
              Profile
            </li>
          </Link>
          {userRole === "mentee" && (
            <>
              <Link to="/menteeDashboard">
                <li className="px-4 py-6 hover:bg-gray-800 hover:text-customGreen cursor-pointer flex items-center hover:rounded-3xl">
                  <FontAwesomeIcon icon={faFontAwesome} className="mr-2" />
                  Mentees Dashboard
                </li>
              </Link>
              <Link to="/objectives">
                <li className="px-4 py-6 hover:bg-gray-800 hover:text-customGreen cursor-pointer flex items-center hover:rounded-3xl">
                  <FontAwesomeIcon icon={faBullseye} className="mr-2" />
                  Objectives
                </li>
              </Link>
            </>
          )}
          {userRole === "mentor" && (
            <Link to="/mentorDashboard">
              <li className="px-4 py-6 hover:bg-gray-800 hover:text-customGreen cursor-pointer flex items-center hover:rounded-3xl">
                <FontAwesomeIcon icon={faSitemap} className="mr-2" />
                Mentor Dashboard
              </li>
            </Link>
          )}
          <div>
            <li
              onClick={handleLogout}
              className="px-4 py-6 hover:bg-gray-800 hover:text-customGreen cursor-pointer flex items-center hover:rounded-3xl"
            >
              <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
              Log Out
            </li>
          </div>
        </ul>
      </div>
    </div>
  );
}
