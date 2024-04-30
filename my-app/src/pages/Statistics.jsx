import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  faUsers,
  faChartBar,
  faFileAlt,
  faUser,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import SideBar from "../components/SideBar";

export default function Stadistics() {
  const [mentees, setMentees] = useState(0);
  const [mentors, setMentors] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [newMentees, setNewMentees] = useState(0);
  const [newMentors, setNewMentors] = useState(0);
  const [totalNewUsers, setTotalNewUsers] = useState(0);
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
            <div className="grid grid-cols-12 grid-rows-7 gap-4">
              {/* GRAFICO */}
              <div class=" w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 ">
                <div class="flex justify-between pb-4 mb-4 border-b border-gray-200 dark:border-gray-700">
                  <div class="flex items-center">
                    <div class="w-full h-12 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center me-3">
                      <svg
                        class="w-6 h-6 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 19"
                      >
                        <path d="M14.5 0A3.987 3.987 0 0 0 11 2.1a4.977 4.977 0 0 1 3.9 5.858A3.989 3.989 0 0 0 14.5 0ZM9 13h2a4 4 0 0 1 4 4v2H5v-2a4 4 0 0 1 4-4Z" />
                        <path d="M5 19h10v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2ZM5 7a5.008 5.008 0 0 1 4-4.9 3.988 3.988 0 1 0-3.9 5.859A4.974 4.974 0 0 1 5 7Zm5 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm5-1h-.424a5.016 5.016 0 0 1-1.942 2.232A6.007 6.007 0 0 1 17 17h2a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5ZM5.424 9H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h2a6.007 6.007 0 0 1 4.366-5.768A5.016 5.016 0 0 1 5.424 9Z" />
                      </svg>
                    </div>
                    <div>
                      <h5 class="leading-none text-2xl font-bold text-gray-900 dark:text-white pb-1">
                        3.4k
                      </h5>
                      <p class="text-sm font-normal text-gray-500 dark:text-gray-400">
                        Leads generated per week
                      </p>
                    </div>
                  </div>
                  <div>
                    <span class="bg-green-100 text-green-800 text-xs font-medium inline-flex items-center px-2.5 py-1 rounded-md dark:bg-green-900 dark:text-green-300">
                      <svg
                        class="w-2.5 h-2.5 me-1.5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 10 14"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M5 13V1m0 0L1 5m4-4 4 4"
                        />
                      </svg>
                      42.5%
                    </span>
                  </div>
                </div>

                <div class="grid grid-cols-2">
                  <dl class="flex items-center">
                    <dt class="text-gray-500 dark:text-gray-400 text-sm font-normal me-1">
                      Money spent:
                    </dt>
                    <dd class="text-gray-900 text-sm dark:text-white font-semibold">
                      $3,232
                    </dd>
                  </dl>
                  <dl class="flex items-center justify-end">
                    <dt class="text-gray-500 dark:text-gray-400 text-sm font-normal me-1">
                      Conversion rate:
                    </dt>
                    <dd class="text-gray-900 text-sm dark:text-white font-semibold">
                      1.2%
                    </dd>
                  </dl>
                </div>

                <div id="column-chart"></div>
                <div class="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between">
                  <div class="flex justify-between items-center pt-5">
                    <button
                      id="dropdownDefaultButton"
                      data-dropdown-toggle="lastDaysdropdown"
                      data-dropdown-placement="bottom"
                      class="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 text-center inline-flex items-center dark:hover:text-white"
                      type="button"
                    >
                      Last 7 days
                      <svg
                        class="w-2.5 m-2.5 ms-1.5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 10 6"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="m1 1 4 4 4-4"
                        />
                      </svg>
                    </button>

                    <div
                      id="lastDaysdropdown"
                      class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                    >
                      <ul
                        class="py-2 text-sm text-gray-700 dark:text-gray-200"
                        aria-labelledby="dropdownDefaultButton"
                      >
                        <li>
                          <a
                            href="#"
                            class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Yesterday
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Today
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Last 7 days
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Last 30 days
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Last 90 days
                          </a>
                        </li>
                      </ul>
                    </div>
                    <a
                      href="#"
                      class="uppercase text-sm font-semibold inline-flex items-center rounded-lg text-blue-600 hover:text-blue-700 dark:hover:text-blue-500  hover:bg-gray-100 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 px-3 py-2"
                    >
                      Leads Report
                      <svg
                        class="w-2.5 h-2.5 ms-1.5 rtl:rotate-180"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 6 10"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="m1 9 4-4-4-4"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
