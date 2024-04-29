import React from "react";
import { Link } from "react-router-dom";
import {
  faIdBadge,
  faChartBar,
  faFileAlt,
  faUsersLine,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import miImagen from "./img/thePerfectMentor.png";

export default function SideBar() {
  return (
    <div className="bg-customGreen text-gray-500 w-[13%] pb-10">
      <div className="p-4">
        {/* Sidebar Header */}
        <img src={miImagen} alt="Sidebar Header" />
      </div>
      <ul className="py-4">
        <Link to="/users">
          <li className="px-4 py-6  cursor-pointer flex items-center  hover:bg-gray-800 hover:text-customGreen hover:rounded-3xl">
            <FontAwesomeIcon icon={faUsersLine} className="mr-2" />
            Users
          </li>
        </Link>
        <Link to="/statistics">
          <li className="px-4 py-6  hover:bg-gray-800 hover:text-customGreen cursor-pointer flex items-center hover:rounded-3xl">
            <FontAwesomeIcon icon={faChartBar} className="mr-2" />
            Stadistics
          </li>
        </Link>
        <Link to="/reports">
          <li className="px-4 py-6  hover:bg-gray-800 hover:text-customGreen cursor-pointer flex items-center hover:rounded-3xl">
            <FontAwesomeIcon icon={faFileAlt} className="mr-2" />
            Reports
          </li>
        </Link>
        <Link to="/profile">
          <li className="px-4 py-6  hover:bg-gray-800 hover:text-customGreen cursor-pointer flex items-center hover:rounded-3xl">
            <FontAwesomeIcon icon={faIdBadge} className="mr-2" />
            Profile
          </li>
        </Link>
      </ul>
    </div>
  );
}
