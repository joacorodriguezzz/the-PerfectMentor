import React, { useState, useEffect } from "react";
import axios from "axios";
import SideBar from "../components/SideBar";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfo,
  faXmark,
  faCheck,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

export default function MenteeDashboard() {
  const [matchRequests, setMatchRequests] = useState([]);
  const [loggedUser, setLoggedUser] = useState(null);
  const [currentMentor, setCurrentMentor] = useState(null);
  const [meetings, setMeetings] = useState([]);
  const [notes, setNotes] = useState("");

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
      if (loggedUser.mentorId) {
        const mentorResponse = await axios.get(
          `http://localhost:3001/api/users/${loggedUser.mentorId}`,
          {
            withCredentials: true,
          }
        );
        setCurrentMentor(mentorResponse.data);
      } else {
        setCurrentMentor(null); // No hay mentor asignado
      }

      window.location.reload(); // Opcional según tus requerimientos
      // Refrescar la página automáticamente o manejar de otra forma según tu flujo
    } catch (error) {
      console.error("Error accepting match request:", error);
      alert("Error al aceptar la solicitud de mentoria");
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
      const response = await axios.put(
        `http://localhost:3001/api/matchRequest/undoMatch/${loggedUser._id}`,
        {},
        { withCredentials: true }
      );

      // Obtener el ID de la reunión desde la respuesta del backend
      const meetingId = response.data.meetingId;

      // Si se proporciona un ID de reunión, eliminar la reunión correspondiente
      if (meetingId) {
        await axios.delete(`http://localhost:3001/api/meetings/${meetingId}`, {
          withCredentials: true,
        });
        console.log("Meeting deleted successfully");
      }

      // Actualizar el estado eliminando el mentor asignado
      setCurrentMentor(null);

      // Actualizar el usuario logueado para eliminar el mentorId
      setLoggedUser((prevUser) => ({
        ...prevUser,
        mentorId: null,
      }));

      // Mostrar una alerta o mensaje de éxito
      alert("Match deshecho exitosamente");
      window.location.reload();
    } catch (error) {
      console.error("Error undoing match:", error);
      alert("Error al deshacer el match");
    }
  };

  const deleteMeeting = async (meetingId) => {
    try {
      await axios.delete(`http://localhost:3001/api/meetings/${meetingId}`, {
        withCredentials: true,
      });

      setMeetings(meetings.filter((meeting) => meeting._id !== meetingId));
      alert("Meeting deleted successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Error deleting meeting:", error);
      alert("Error deleting meeting");
    }
  };

  return (
    <div className="flex flex-col md:flex-row bg-customGreen min-h-screen">
      <SideBar />
      <div className="bg-customGreen flex-grow p-4 md:p-8">
        <div className="bg-white mx-4 md:mx-8 my-4 md:my-8 p-4 md:p-8 rounded-3xl shadow-gray-600 shadow-xl h-full md:h-[92%] w-full md:w-auto">
          <div className="flex flex-col  mb-6 shadow-sm">
            <h1 className="text-xl md:text-3xl font-bold">
              {currentMentor ? "Actual Mentor" : "Match Requests"}
            </h1>
            <p className="text-sm md:text-base ">
              {currentMentor
                ? "View your current mentor"
                : "View and manage your match requests"}
            </p>
          </div>
          <div className="bg-white mx-2 md:mx-8 my-4 md:my-8 p-2 md:p-4 rounded-3xl h-[70%] md:h-[78%] shadow-2xl overflow-auto">
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
            <div className="mt-6 bg-slate-200 rounded-xl p-4">
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
                    <button
                      className="px-2 py-1 text-white bg-red-500 rounded"
                      onClick={() => deleteMeeting(meeting._id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
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
