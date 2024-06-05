import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  faIdBadge,
  faChartBar,
  faFileAlt,
  faUsersLine,
  faSignOutAlt,
  faSitemap,
  faBullseye,
  faFontAwesome,
  faCircleInfo, // Nuevo icono para Log Out
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
    <div className="bg-customGreen text-gray-500 w-[13%] pb-10">
      <div className="p-4">
        {/* Sidebar Header */}
        <img src={miImagen} alt="Sidebar Header" />
      </div>
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
        <Link to="/reports">
          <li className="px-4 py-6 hover:bg-gray-800 hover:text-customGreen cursor-pointer flex items-center hover:rounded-3xl">
            <FontAwesomeIcon icon={faFileAlt} className="mr-2" />
            Reports
          </li>
        </Link>
        <Link to="/profile">
          <li className="px-4 py-6 hover:bg-gray-800 hover:text-customGreen cursor-pointer flex items-center hover:rounded-3xl">
            <FontAwesomeIcon icon={faIdBadge} className="mr-2" />
            Profile
          </li>
        </Link>
        {/* Mostrar opciones adicionales según el rol del usuario */}
        {userRole === "mentee" && (
          <>
            <Link to="/infoMent">
              <li className="px-4 py-6 hover:bg-gray-800 hover:text-customGreen cursor-pointer flex items-center hover:rounded-3xl">
                <FontAwesomeIcon icon={faCircleInfo} className="mr-2" />
                Info Ment
              </li>
            </Link>
            <Link to="/achievements">
              <li className="px-4 py-6 hover:bg-gray-800 hover:text-customGreen cursor-pointer flex items-center hover:rounded-3xl">
                <FontAwesomeIcon icon={faFontAwesome} className="mr-2" />
                Logros
              </li>
            </Link>
            <Link to="/goals">
              <li className="px-4 py-6 hover:bg-gray-800 hover:text-customGreen cursor-pointer flex items-center hover:rounded-3xl">
                <FontAwesomeIcon icon={faBullseye} className="mr-2" />
                Objetivos
              </li>
            </Link>
          </>
        )}
        {userRole === "mentor" && (
          <Link to="/mentees">
            <li className="px-4 py-6 hover:bg-gray-800 hover:text-customGreen cursor-pointer flex items-center hover:rounded-3xl">
              <FontAwesomeIcon icon={faSitemap} className="mr-2" />
              Lista de Mentees
            </li>
          </Link>
        )}
        <div>
          <li
            onClick={handleLogout}
            className="px-4 py-6 hover:bg-gray-800 hover:text-customGreen
            cursor-pointer flex items-center hover:rounded-3xl"
          >
            <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
            Log Out
          </li>
        </div>
      </ul>
      {/* Botón de Log Out */}
    </div>
  );
}
