import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";

const MenteeDashboard = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      const token = Cookies.get("authToken");
      if (token) {
        try {
          const response = await axios.get(
            "http://localhost:3001/api/mentorship/requests",
            {
              withCredentials: true,
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setRequests(response.data);
        } catch (error) {
          console.error("Error fetching mentorship requests:", error);
        }
      }
    };

    fetchRequests();
  }, []);

  const handleRequestResponse = async (requestId, status) => {
    const token = Cookies.get("authToken");
    try {
      const response = await axios.post(
        "http://localhost:3001/api/mentorship/update-status",
        {
          requestId,
          status,
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.message);
      setRequests((prevRequests) =>
        prevRequests.filter((request) => request._id !== requestId)
      );
    } catch (error) {
      console.error("Error updating mentorship request status:", error);
    }
  };

  return (
    <div className="mentee-dashboard">
      <h2>Requests from Mentors</h2>
      <div className="requests-list">
        {requests.map((request) => (
          <div key={request._id} className="request-item">
            <p>{request.mentor.userName} wants to be your mentor.</p>
            {request.status === "pending" && (
              <div>
                <button
                  onClick={() => handleRequestResponse(request._id, "accepted")}
                >
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className="accept-icon"
                  />
                </button>
                <button
                  onClick={() => handleRequestResponse(request._id, "rejected")}
                >
                  <FontAwesomeIcon
                    icon={faTimesCircle}
                    className="reject-icon"
                  />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenteeDashboard;
