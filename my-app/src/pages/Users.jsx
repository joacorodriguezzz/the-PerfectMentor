import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import {
  faUsers,
  faChartBar,
  faFileAlt,
  faUser,
  faSearch,
  faPersonCirclePlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SideBar from "../components/SideBar";
import axios from "axios";
import { useAuth } from "../components/AuthContext";
import Cookies from "js-cookie";

// Importar el contexto de autenticación
import { AuthContext } from "../components/AuthContext";

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/users", {
          withCredentials: true,
        });
        setUsers(response.data); // Acceder a res.data.users
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

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

  const handleAddMentee = async (menteeId) => {
    const token = Cookies.get("authToken");
    try {
      const response = await axios.post(
        "http://localhost:3001/api/users",
        { menteeId },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.message);
    } catch (error) {
      console.error("Error al agregar mentee:", error);
    }
  };

  return (
    <div className="flex bg-customGreen h-screen w-screen">
      <SideBar />
      <div className="bg-customGreen flex-grow">
        <div className="bg-white mx-8 my-8 p-8 rounded-3xl shadow-gray-600 shadow-xl h-[92%] w-944">
          <div className="flex items-center mb-6 shadow-sm">
            <h1 className="text-3xl text-bold">
              Users
              <p className="text-base text">View all the users</p>
            </h1>
          </div>
          <div className="flex items-center mb-6 shadow-sm">
            {/* Search bar */}
          </div>
          <div className="bg-white mx-8 my-8 p-4 rounded-3xl h-[78%] shadow-2xl overflow-auto">
            <div className="shadow-2xl">
              <table className="w-full">
                <thead>
                  <tr className="text-gray-400 text-sm">
                    <th className="px-4 py-6 border-b border-gray-500">Name</th>
                    <th className="px-4 py-6 border-b border-gray-500">Age</th>
                    <th className="px-4 py-6 border-b border-gray-500">
                      Email
                    </th>
                    <th className="px-4 py-6 border-b border-gray-500">Role</th>
                    <th className="px-4 py-6 border-b border-gray-500">
                      Match
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr
                      key={index}
                      className={`${
                        user.role === "mentee" ? "bg-green-200" : "bg-pink-200"
                      } bg-opacity-80 border-b border-white shadow-sm`}
                    >
                      <td className="px-4 py-6 text-center">{user.userName}</td>
                      <td className="px-4 py-6 text-center">{user.age}</td>
                      <td className="px-4 py-6 text-center">{user.email}</td>
                      <td className="px-4 py-6 text-center">{user.role}</td>
                      <td className="px-4 py-6 text-center">
                        {user.role === "mentee" && (
                          <button
                            className="w-7 h-7 rounded-full border-2 border-gray-800"
                            onClick={() => handleAddMentee(user._id)}
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
    </div>
  );
}
