import React, { useState, useEffect } from "react";
import axios from "axios";
import SideBar from "../components/SideBar";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo, faXmark, faCheck } from "@fortawesome/free-solid-svg-icons";

export default function MenteeDashboard() {
  const [matchRequests, setMatchRequests] = useState([]);
  const [loggedUser, setLoggedUser] = useState(null);
  const [currentMentor, setCurrentMentor] = useState(null);
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    const fetchMatchRequests = async () => {
      try {
        const loggedUserResponse = await axios.get(
          "http://localhost:3001/api/userData",
          {
            withCredentials: true,
          }
        );
        console.log("Logged user:", loggedUserResponse.data);
        setLoggedUser(loggedUserResponse.data);

        const response = await axios.get(
          `http://localhost:3001/api/matchRequest/${loggedUserResponse.data._id}`,
          {
            withCredentials: true,
          }
        );
        console.log("Match requests:", response.data);
        setMatchRequests(response.data);

        // Verificar si hay un mentor asignado
        if (loggedUserResponse.data.mentorId) {
          try {
            // Obtener detalles del mentor usando el mentorId del usuario logueado
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
            setCurrentMentor(null); // Manejar caso de error
          }
        } else {
          console.log("No mentor assigned.");
          setCurrentMentor(null); // Manejar caso donde no hay mentor asignado
        }

        const meetingsResponse = await axios.get(
          `http://localhost:3001/api/meetings/mentee/${loggedUserResponse.data._id}`,
          { withCredentials: true }
        );
        console.log("Meetings:", meetingsResponse.data);
        setMeetings(meetingsResponse.data);
      } catch (error) {
        console.error("Error fetching match requests:", error);
      }
    };

    fetchMatchRequests();
  }, []);

  const acceptMatchRequest = async (requestId) => {
    try {
      // Llamar al endpoint para aceptar la solicitud
      await axios.put(
        `http://localhost:3001/api/matchRequest/accept/${requestId}`,
        {},
        { withCredentials: true }
      );

      // Actualizar el estado local eliminando la solicitud aceptada
      setMatchRequests(
        matchRequests.filter((request) => request._id !== requestId)
      );

      // Actualizar el estado para mostrar al mentor asignado
      const mentorResponse = await axios.get(
        `http://localhost:3001/api/users/${loggedUser.mentorId}`,
        {
          withCredentials: true,
        }
      );
      setCurrentMentor(mentorResponse.data);

      // Refrescar la página automáticamente
    } catch (error) {
      alert("Solicitud de mentoria aceptada exitosamente");
      window.location.reload();
      setMatchRequests(
        matchRequests.filter((request) => request._id !== requestId)
      );
    }
  };

  const rejectMatchRequest = async (requestId) => {
    try {
      // Llamar al endpoint para rechazar la solicitud
      await axios.put(
        `http://localhost:3001/api/matchRequest/reject/${requestId}`,
        {},
        { withCredentials: true }
      );

      // Actualizar el estado local eliminando la solicitud rechazada
      setMatchRequests(
        matchRequests.filter((request) => request._id !== requestId)
      );

      // Mostrar una alerta o mensaje de éxito
      alert("Solicitud rechazada correctamente");
    } catch (error) {
      console.error("Error rejecting match request:", error);
      alert("Error al rechazar la solicitud de mentoría");
    }
  };

  const undoMatch = async () => {
    try {
      // Llamar al endpoint para deshacer el match
      await axios.put(
        `http://localhost:3001/api/matchRequest/undoMatch/${loggedUser._id}`,
        {},
        { withCredentials: true }
      );

      // Actualizar el estado eliminando el mentor asignado
      setCurrentMentor(null);

      // Actualizar el usuario logueado para eliminar el mentorId
      setLoggedUser((prevUser) => ({
        ...prevUser,
        mentorId: null,
      }));

      // Mostrar una alerta o mensaje de éxito
      alert("Match deshecho excitosamente");
    } catch (error) {
      console.error("Error undoing match:", error);
      alert("Error al deshacer el match");
    }
  };

  return (
    <div className="flex bg-customGreen h-screen w-screen">
      <SideBar />
      <div className="bg-customGreen flex-grow">
        <div className="bg-white mx-8 my-8 p-8 rounded-3xl shadow-gray-600 shadow-xl h-[92%] w-944">
          <div className="flex items-center mb-6 shadow-sm">
            <h1 className="text-3xl text-bold">
              {currentMentor ? "Actual Mentor" : "Match Requests"}

              <p className="text-base text">
                {currentMentor
                  ? "View your current mentor"
                  : "View and manage your match requests"}
              </p>
            </h1>
          </div>
          <div className="bg-white mx-8 my-8 p-4 rounded-3xl h-[78%] shadow-2xl overflow-auto">
            <table className="w-full">
              <thead>
                <tr className="text-gray-400 text-sm">
                  {currentMentor ? (
                    <>
                      <th className="px-4 py-3 border-b border-gray-500">
                        Name
                      </th>
                      <th className="px-4 py-3 border-b border-gray-500">
                        Age
                      </th>
                      <th className="px-4 py-3 border-b border-gray-500">
                        Email
                      </th>
                      <th className="px-4 py-3 border-b border-gray-500">
                        Role
                      </th>
                      <th className="px-4 py-3 border-b border-gray-500">
                        Skill
                      </th>
                      <th className="px-4 py-3 border-b border-gray-500">
                        Action
                      </th>
                    </>
                  ) : (
                    <>
                      <th className="px-4 py-3 border-b border-gray-500">
                        Mentor Name
                      </th>
                      <th className="px-4 py-3 border-b border-gray-500">
                        Email
                      </th>
                      <th className="px-4 py-3 border-b border-gray-500">
                        Action
                      </th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {currentMentor ? (
                  <tr className="bg-pink-200 bg-opacity-80 border-b border-white shadow-sm">
                    <td className="px-4 py-3 text-center">
                      {currentMentor.userName}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {currentMentor.age}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {currentMentor.email}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {currentMentor.role}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {currentMentor.skill}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        className="w-7 h-7 rounded-full border-2 border-gray-800"
                        onClick={undoMatch}
                      >
                        <FontAwesomeIcon icon={faXmark} />
                      </button>
                      <Link to="/infoMent">
                        <button className="w-7 h-7 rounded-full border-2 border-gray-800 ml-2">
                          <FontAwesomeIcon icon={faInfo} />
                        </button>
                      </Link>
                    </td>
                  </tr>
                ) : (
                  matchRequests.map((request) => (
                    <tr
                      key={request._id}
                      className="bg-green-200 bg-opacity-80 border-b border-white shadow-sm"
                    >
                      <td className="px-4 py-3 text-center">
                        {request.mentorId.userName}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {request.mentorId.email}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button
                          className="w-7 h-7 rounded-full border-2 border-gray-800 ml-2"
                          onClick={() => acceptMatchRequest(request._id)}
                        >
                          <FontAwesomeIcon icon={faCheck} />
                        </button>
                        <button
                          className="w-7 h-7 rounded-full border-2 border-gray-800 ml-2"
                          onClick={() => rejectMatchRequest(request._id)}
                        >
                          <FontAwesomeIcon icon={faXmark} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            <div className="mt-6 bg-slate-200 rounded-xl">
              <h3 className="text-xl font-bold mb-2 text-center">
                Scheduled Meetings with your mentor
              </h3>
              <ul>
                {meetings.map((meeting) => (
                  <li key={meeting._id} className="mb-2">
                    <span className="font-semibold">Date:</span> {meeting.date}{" "}
                    <span className="font-semibold">Time:</span> {meeting.time}{" "}
                    <span className="font-semibold">Description:</span>{" "}
                    {meeting.description}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
