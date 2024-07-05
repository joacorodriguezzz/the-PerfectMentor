import React, { useState, useEffect } from "react";
import axios from "axios";
import SideBar from "../components/SideBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandshake,
  faInfo,
  faTrash,
  faNoteSticky,
} from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";

export default function MentorDashboard() {
  const [mentees, setMentees] = useState([]);
  const [meetings, setMeetings] = useState([]);
  const [selectedMentee, setSelectedMentee] = useState(null);
  const [meetingDate, setMeetingDate] = useState(new Date());
  const [description, setDescription] = useState("");
  const [menteeMeetings, setMenteeMeetings] = useState([]);

  useEffect(() => {
    const fetchMentorData = async () => {
      try {
        const mentorResponse = await axios.get(
          "http://localhost:3001/api/userData",
          { withCredentials: true }
        );
        const mentorId = mentorResponse.data._id;

        const menteesResponse = await axios.get(
          `http://localhost:3001/api/users/${mentorId}/mentees`,
          { withCredentials: true }
        );
        setMentees(menteesResponse.data);

        const meetingsResponse = await axios.get(
          `http://localhost:3001/api/meetings/mentor/${mentorId}`,
          { withCredentials: true }
        );
        setMeetings(meetingsResponse.data);
      } catch (error) {
        console.error("Error fetching mentor data:", error);
      }
    };

    fetchMentorData();
  }, []);

  useEffect(() => {
    const fetchMenteeMeetings = async () => {
      if (selectedMentee) {
        try {
          const response = await axios.get(
            `http://localhost:3001/api/meetings/mentee/${selectedMentee._id}`,
            { withCredentials: true }
          );
          setMenteeMeetings(response.data);
        } catch (error) {
          console.error("Error fetching mentee meetings:", error);
        }
      }
    };

    fetchMenteeMeetings();
  }, [selectedMentee]);

  const createMeeting = async () => {
    try {
      const mentorResponse = await axios.get(
        "http://localhost:3001/api/userData",
        { withCredentials: true }
      );
      const mentorId = mentorResponse.data._id;

      const formattedDate = meetingDate.toISOString().split("T")[0];
      const formattedTime = meetingDate.toTimeString().split(" ")[0];

      const response = await axios.post(
        "http://localhost:3001/api/meetings/create",
        {
          mentorId,
          menteeId: selectedMentee._id,
          date: formattedDate,
          time: formattedTime,
          description,
        },
        { withCredentials: true }
      );

      setMeetings([...meetings, response.data]);
      setMenteeMeetings([...menteeMeetings, response.data]);
      alert("Meeting scheduled successfully!");
    } catch (error) {
      console.error("Error creating meeting:", error);
      alert("Error scheduling meeting");
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
    <div className="flex bg-customGreen h-screen w-screen">
      <SideBar />
      <div className="bg-customGreen flex-grow">
        <div className="bg-white mx-8 my-8 p-8 rounded-3xl shadow-gray-600 shadow-xl h-[92%] w-944">
          <div className="flex items-center mb-6 shadow-sm">
            <h1 className="text-3xl font-bold">Mentees</h1>
            <p className="text-base ml-2 text-gray-500">
              View and manage your mentees
            </p>
          </div>
          <div className="bg-white mx-8 my-8 p-4 rounded-3xl h-[78%] shadow-2xl overflow-auto">
            <table className="w-full">
              <thead>
                <tr className="text-gray-400 text-sm">
                  <th className="px-4 py-3 border-b border-gray-500">Name</th>
                  <th className="px-4 py-3 border-b border-gray-500">Email</th>
                  <th className="px-4 py-3 border-b border-gray-500">Skill</th>
                  <th className="px-4 py-3 border-b border-gray-500">
                    Language
                  </th>
                  <th className="px-4 py-3 border-b border-gray-500">Action</th>
                </tr>
              </thead>
              <tbody>
                {mentees.map((mentee) => (
                  <tr
                    key={mentee._id}
                    className="bg-green-200 bg-opacity-80 border-b border-white shadow-sm"
                  >
                    <td className="px-4 py-3 text-center">{mentee.userName}</td>
                    <td className="px-4 py-3 text-center">{mentee.email}</td>
                    <td className="px-4 py-3 text-center">{mentee.skill}</td>
                    <td className="px-4 py-3 text-center">{mentee.language}</td>
                    <td className="px-4 py-3 text-center">
                      <button
                        className="w-7 h-7 rounded-full border-2 border-gray-800 ml-2"
                        onClick={() => setSelectedMentee(mentee)}
                      >
                        <FontAwesomeIcon icon={faHandshake} />
                      </button>

                      <button className="w-7 h-7 rounded-full border-2 border-gray-800 ml-2">
                        <FontAwesomeIcon icon={faNoteSticky} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {selectedMentee && (
              <div className="bg-white mx-8 my-8 p-4 rounded-3xl h-[78%] shadow-2xl">
                <h2 className="text-2xl font-bold mb-4">
                  Schedule Meeting with {selectedMentee.userName}
                </h2>
                <div className="mb-4">
                  <DatePicker
                    selected={meetingDate}
                    onChange={(date) => setMeetingDate(date)}
                    showTimeSelect
                    dateFormat="Pp"
                  />
                </div>
                <div className="mb-4">
                  <textarea
                    className="w-full p-2 border border-gray-300 rounded"
                    rows="4"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Meeting description"
                  ></textarea>
                </div>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={createMeeting}
                >
                  Schedule Meeting
                </button>
                <div className="mt-6">
                  <h3 className="text-xl font-bold mb-2">
                    Scheduled Meetings with {selectedMentee.userName}
                  </h3>
                  <ul>
                    {menteeMeetings.map((meeting) => (
                      <li key={meeting._id} className="mb-2">
                        <span className="font-semibold">Date:</span>{" "}
                        {meeting.date}{" "}
                        <span className="font-semibold">Time:</span>{" "}
                        {meeting.time}{" "}
                        <span className="font-semibold">Description:</span>{" "}
                        {meeting.description}
                        <button
                          className="w-7 h-7 rounded-full border-2 border-gray-800 ml-2"
                          onClick={() => deleteMeeting(meeting._id)}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
