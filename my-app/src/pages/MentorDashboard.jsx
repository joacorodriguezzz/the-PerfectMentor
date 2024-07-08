import React, { useState, useEffect } from "react";
import axios from "axios";
import SideBar from "../components/SideBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandshake,
  faTrash,
  faNoteSticky,
} from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function MentorDashboard() {
  const [mentees, setMentees] = useState([]);
  const [meetings, setMeetings] = useState([]);
  const [selectedMentee, setSelectedMentee] = useState(null);
  const [meetingDate, setMeetingDate] = useState(new Date());
  const [description, setDescription] = useState("");
  const [menteeMeetings, setMenteeMeetings] = useState([]);
  const [notes, setNotes] = useState("");
  const [selectedMenteeNotes, setSelectedMenteeNotes] = useState(null);

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

  const saveNotes = async () => {
    try {
      await axios.put(
        `http://localhost:3001/api/userData/${selectedMenteeNotes._id}/notes`,
        { notes },
        { withCredentials: true }
      );
      alert("Notes saved successfully!");
    } catch (error) {
      console.error("Error saving notes:", error);
      alert("Error saving notes");
    }
  };

  const handleMenteeSelection = (mentee) => {
    if (selectedMentee && selectedMentee._id === mentee._id) {
      setSelectedMentee(null);
    } else {
      setSelectedMentee(mentee);
    }
  };

  const handleNotesSelection = (mentee) => {
    if (selectedMenteeNotes && selectedMenteeNotes._id === mentee._id) {
      setSelectedMenteeNotes(null);
    } else {
      setSelectedMenteeNotes(mentee);
      setNotes(mentee.notes || ""); // load existing notes if any
    }
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-customGreen md:flex-row md:h-screen">
      <SideBar />
      <div className="flex-grow p-4 bg-customGreen md:p-8">
        <div className="p-4 mx-2 my-4 bg-white rounded-3xl shadow-xl md:mx-8 md:my-8 md:p-8 md:h-[92%]">
          <div className="flex flex-col items-start mb-6 shadow-sm md:flex-row md:items-center">
            <h1 className="text-2xl font-bold md:text-3xl">Mentees</h1>
            <p className="mt-2 text-base text-gray-500 md:ml-2 md:mt-0">
              View and manage your mentees
            </p>
          </div>
          <div className="p-4 my-4 bg-white rounded-3xl shadow-2xl md:my-8 overflow-auto">
            <table className="w-full">
              <thead>
                <tr className="text-gray-400 text-sm">
                  <th className="px-2 py-2 border-b border-gray-500 md:px-4 md:py-3">
                    Name
                  </th>
                  <th className="px-2 py-2 border-b border-gray-500 md:px-4 md:py-3">
                    Email
                  </th>
                  <th className="px-2 py-2 border-b border-gray-500 md:px-4 md:py-3">
                    Skill
                  </th>
                  <th className="px-2 py-2 border-b border-gray-500 md:px-4 md:py-3">
                    Language
                  </th>
                  <th className="px-2 py-2 border-b border-gray-500 md:px-4 md:py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {mentees.map((mentee) => (
                  <tr
                    key={mentee._id}
                    className="bg-green-200 bg-opacity-80 border-b border-white shadow-sm"
                  >
                    <td className="px-2 py-2 text-center md:px-4 md:py-3">
                      {mentee.userName}
                    </td>
                    <td className="px-2 py-2 text-center md:px-4 md:py-3">
                      {mentee.email}
                    </td>
                    <td className="px-2 py-2 text-center md:px-4 md:py-3">
                      {mentee.skill}
                    </td>
                    <td className="px-2 py-2 text-center md:px-4 md:py-3">
                      {mentee.language}
                    </td>
                    <td className="px-2 py-2 text-center md:px-4 md:py-3">
                      <button
                        className={`w-7 h-7 rounded-full border-2 border-gray-800 ml-1 md:ml-2 ${
                          selectedMentee && selectedMentee._id === mentee._id
                            ? "bg-blue-500"
                            : ""
                        }`}
                        onClick={() => handleMenteeSelection(mentee)}
                      >
                        <FontAwesomeIcon icon={faHandshake} />
                      </button>

                      <button
                        className={`w-7 h-7 rounded-full border-2 border-gray-800 ml-1 md:ml-2 ${
                          selectedMenteeNotes &&
                          selectedMenteeNotes._id === mentee._id
                            ? "bg-blue-500"
                            : ""
                        }`}
                        onClick={() => handleNotesSelection(mentee)}
                      >
                        <FontAwesomeIcon icon={faNoteSticky} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {selectedMentee && (
              <div className="p-4 my-4 bg-white rounded-3xl shadow-2xl md:my-8">
                <h2 className="mb-4 text-2xl font-bold">
                  Schedule Meeting with {selectedMentee.userName}
                </h2>
                <div className="mb-4">
                  <DatePicker
                    selected={meetingDate}
                    onChange={(date) => setMeetingDate(date)}
                    showTimeSelect
                    dateFormat="Pp"
                    className="w-full p-2 border border-gray-300 rounded"
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
                  className="px-4 py-2 text-white bg-blue-500 rounded"
                  onClick={createMeeting}
                >
                  Schedule Meeting
                </button>
                <div className="mt-6">
                  <h3 className="mb-2 text-xl font-bold">
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
                        {meeting.description}{" "}
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
            )}
            {selectedMenteeNotes && (
              <div className="p-4 my-4 bg-white rounded-3xl shadow-2xl md:my-8">
                <h2 className="mb-4 text-2xl font-bold">
                  Notes for {selectedMenteeNotes.userName}
                </h2>
                <textarea
                  className="w-full p-2 border border-gray-300 rounded"
                  rows="10"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Enter notes here"
                ></textarea>
                <button
                  className="px-4 py-2 mt-4 text-white bg-blue-500 rounded"
                  onClick={saveNotes}
                >
                  Save Notes
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
