import React from "react";
import { Link } from "react-router-dom";
import {
  faUsers,
  faChartBar,
  faFileAlt,
  faUser,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import miImagen from "../components/img/thePerfectMentor.png";
import SideBar from "../components/SideBar";

export default function Statistics() {
  return (
    <div className="flex bg-customGreen h-screen">
      {/* Side bar */}
      <SideBar />

      {/* Content */}
      <div className="bg-customGreen flex-grow">
        <div className="bg-white mx-8 my-8 p-8 rounded-3xl shadow-gray-600 shadow-xl h-[92%] w-944">
          {/* Search bar */}
          <div className="flex items-center mb-6 shadow-sm">
            <h1 className="text-3xl text-bold">
              Stadistics
              <p className="text-base text">
                Check all the activity of your page
              </p>
            </h1>
          </div>
          <div className="absolute bottom-[84%] left-[70%] mt-16 mr-4 h-44 w-48">
            {" "}
            <img
              src="https://s3-alpha-sig.figma.com/img/fc43/9f1b/8d8b2b498de6fc99855946e3ffd03d83?Expires=1714953600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=BykV58YzeVZujA8xH-Lpgm5hY5em8ZQZ64~YJJZ3Bv3YwQGBm3D229JJ~rKe5YsZwqw-tCk3p7s2iv4U9jU0u5w2KiCbOGQxcVyjLgt9PSFy7ZGQvvPZbLs98IJWUyYm~ogvgTFFQw1XKpqFFg8F~F2I6qXGEfu6OvJkvdzLAwyU4nA4nS~MuaW-CByhPlPS4xol0fFIJ~k71WwraPL89kxspl1F41bKrh95zFHOOXDtrxx~mOK1-15Ez6el8iHc3bFl2OzzKqCobH7AgryIFh9RQGgJmS57nPHh2rIPSoDOsUvLaP4c2cHSV76nKIxnQ9TwbRhYoAlsm4UFGrAZXg__"
              alt="telefono"
              style={{ filter: "grayscale(100%)" }}
            />
          </div>
          <div className="absolute bottom-[80%] left-[60%] mt-16 mr-4 h-32 w-32 transform ">
            {" "}
            <img
              src="https://s3-alpha-sig.figma.com/img/46b4/ec58/f92a969bc1cb48d864d435ebd9d85984?Expires=1714953600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ZnIGhVI-0cmgU1MQWJMdPS5Cgq6Cr5gFsFDdPMwNJzSqRPrYj7o9HFURe8qaWGTanq6UReiJQqBhTo-rIjL6YNcbc0UM3x1Jj4tdKBsPm-cNtIWcVB0uk2nQjYBqfy7njN7MyygPsLvJSNHRH9I0LskLlSDY1UfzN~4~bdzIpcDhMJy-5gqDOvrxcFhSrS5O328NXMqSvD~CfP0I~XQZzSSKiBao77GGK9t7WHWQTfAcjRBnwt4ZfYbydlIL1C9RxCwCYZJdFs2fRFi9-b09MpGaXWZ4FD3V5Wkq4V5CYToZhsWzTKCQXRlwylsc~VzuzpTOYNMcAKQPIOP2sowKRg__"
              alt="doodle"
              style={{ filter: "grayscale(100%)" }}
            />
          </div>
          {/* Users table */}
          <div className="flex">
            <div className="bg-gray-200 my-2 p-8 rounded-3xl w-[50%] shadow-2xl text-gray-900 relative text-bold h-48">
              <h1 className="text-3xl font-bold mb-2">Total of users</h1>
              <hr className="border-dashed border-gray-400 mb-2" />
              <div className="text-lg">
                <div className="border-b border-gray-400 py-2 flex justify-between items-center h-8">
                  <p>Mentees</p> <span>25</span>
                </div>
                <div className="border-b border-gray-400 py-2 flex justify-between items-center h-8">
                  <p>Mentors</p> <span>30</span>
                </div>
                <div className="border-b border-gray-400 py-2 flex justify-between items-center h-8">
                  <p>Total users</p> <span>40</span>
                </div>
              </div>
            </div>
            <div className="bg-gray-200 mx-8 my-2 p-8 rounded-3xl w-[50%] shadow-2xl text-gray-900 relative text-bold h-48">
              <h1 className="text-3xl font-bold mb-2">New Users</h1>
              <hr className="border-dashed border-gray-400 mb-2" />
              <div className="text-lg">
                <div className="border-b border-gray-400 py-2 flex justify-between items-center h-8">
                  <p>New mentees</p> <span>15</span>
                </div>
                <div className="border-b border-gray-400 py-2 flex justify-between items-center h-8">
                  <p>New mentors</p> <span>20</span>
                </div>
                <div className="border-b border-gray-400 py-2 flex justify-between items-center h-8">
                  <p>Total users</p> <span>35</span>
                </div>
              </div>
            </div>
          </div>

          {/* Div inferior */}
          <div className="bg-gray-200 mx-8 my-8 p-8 rounded-3xl h-[59%] shadow-2xl overflow-auto text-gray-900 relative">
            <h1 className="text-3xl font-bold mb-4">Sign ups per month</h1>
            <hr className="border-dashed border-gray-400 mb-4" />
            <div className="grid grid-cols-12 grid-rows-7 gap-4"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
