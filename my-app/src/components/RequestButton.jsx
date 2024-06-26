// components/RequestButton.jsx

import React from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPersonCirclePlus,
  faPersonCircleMinus,
} from "@fortawesome/free-solid-svg-icons";

const RequestButton = ({
  mentorId,
  menteeId,
  requestStatus,
  onRequestChange,
}) => {
  const handleRequest = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/userData/request",
        {
          mentorId,
          menteeId,
        }
      );

      if (response.status === 200) {
        onRequestChange("pending");
      }
    } catch (error) {
      console.error("Error creating request:", error);
    }
  };

  const handleAccept = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/userData/request/accept",
        {
          requestId: requestStatus._id,
        }
      );

      if (response.status === 200) {
        onRequestChange("accepted");
      }
    } catch (error) {
      console.error("Error accepting request:", error);
    }
  };

  const handleReject = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/userData/request/reject",
        {
          requestId: requestStatus._id,
        }
      );

      if (response.status === 200) {
        onRequestChange("rejected");
      }
    } catch (error) {
      console.error("Error rejecting request:", error);
    }
  };

  return (
    <div>
      {requestStatus === "accepted" ? (
        <FontAwesomeIcon icon={faPersonCircleMinus} />
      ) : requestStatus === "pending" ? (
        <div>
          <button onClick={handleAccept}>Accept</button>
          <button onClick={handleReject}>Reject</button>
        </div>
      ) : (
        <button onClick={handleRequest}>
          <FontAwesomeIcon icon={faPersonCirclePlus} />
        </button>
      )}
    </div>
  );
};

export default RequestButton;
