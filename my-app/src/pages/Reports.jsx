import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import SideBar from "../components/SideBar";

export default function Reports() {
  const [users, setUsers] = useState([]);

  // Simular la obtención de los usuarios (puedes reemplazar esto con una llamada a una API)
  useEffect(() => {
    // Simulación de datos de usuarios
    const sampleUsers = [
      {
        name: "John Doe",
        age: 30,
        email: "john.doe@example.com",
        role: "Mentor",
        status: "Check it",
      },
      {
        name: "Jane Doe",
        email: "jane.doe@example.com",
        role: "Mentee",
        status: "No answer",
        age: 18,
      },
      {
        name: "Joaquin Rodriguez",
        email: "joaco.doe@example.com",
        role: "Mentee",
        status: "No answer",
        age: 30,
      },
      // Agrega más usuarios aquí
    ];

    // Establecer los usuarios en el estado
    setUsers(sampleUsers);
  }, []);
  return (
    <div className="flex bg-customGreen h-screen">
      {/* Side bar */}
      <SideBar />
      {/* Content */}
      <div className="bg-customGreen flex-grow">
        <div className="bg-white mx-8 my-8 p-8 rounded-3xl shadow-gray-600 shadow-xl h-[92%] w-944">
          <div className="flex items-center mb-6 shadow-sm">
            <h1 className="text-3xl text-bold">
              Reports
              <p className="text-base text">Check the reports of the Users</p>
            </h1>
            <div className="absolute bottom-[70%] left-[80%] mt-16 mr-4 h-64 w-64 transform ">
              {" "}
              <img
                src="https://s3-alpha-sig.figma.com/img/ab4f/00b4/5a447ab3464c1fb8fe0e6c2ae265c2a7?Expires=1714953600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=EH-5OvOKE6ZJAOXkX9qb0k0xe1L5uNDv3-By54Ra4GCl2SNG6Xzgr3G2LWxw8N--aw2ulISSRpA2~StZ4RyOw3z7jr88Nsk-Vg8eRKq8jpGQi30sw2M0wYN~U886sZOuuHkFYiYwySXKwUtYns4l4sdcTptpmr9UvxDcWpUt6smxnmof7LerH49iPCizYUHG6h5ADfRYIF7X0UHU928snz0n-AVkMw78v5~~F682f2z3qjatgL9qFialP6odU89oBc0FwXFqdfiLpJWVGpnkxK9Yq6GmSQb~Q2yuB8GX5oyJUddEXu4vRiOqzi3VmZ7Br8x-oJop0hOsDUGDegBqXg__"
                alt="ruloDiag"
                style={{ filter: "grayscale(100%)" }}
              />
            </div>
            <div className="absolute bottom-[65%] left-[65%] mt-16 mr-4 h-60 w-60 transform scale-y-[-1]">
              {" "}
              <img
                src="https://s3-alpha-sig.figma.com/img/7f53/b3c5/7afb6e81e8e2f3fb0adce00afb7428a2?Expires=1714953600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=HnR4LAYRiNZP2aGNY4B84JEtrL4IYGqqTGcGn-gkmFlNJaMJYPVUxOIpzg8RwnCDtxic-YUSjeVPbb74l4dEsKHaihSAwQes6Rl4vnJY7Xo5z9CUQ5pain6M8gmkbwnPm5Z2X9EXM2axSmJuuGFpj23iDdq33tzAV8opOyjL1eCWP0vKxdYnEDAYj~pMMj6NJeTKWFgCQEpEifyxOIjxVb8IqKaHq-KF2Ny1zEmFazpH8Xs0CDUfwkqxrxOTlpkVz2GIkWTlTm-sKJlCko~S16AsH8cDTElIeV5vT3wbfNq6Jc8ENhUq8fp5XrS0px7P35vq6JYpq2Nu~EASWdYFTQ__"
                alt="ruloVert"
                style={{ filter: "grayscale(100%)" }}
              />
            </div>
          </div>
          {/* Search bar */}
          <div className="flex items-center mb-6 shadow-sm">
            <FontAwesomeIcon icon={faSearch} className="text-gray-600 px-2" />
            <input
              type="text"
              placeholder="Search for users..."
              className="rounded-3xl py-2 px-4  focus:outline-none focus:border focus:border-blue-500 bg-white shadow-lg w-[50%]"
            />
          </div>

          {/* Users table */}
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
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr
                      key={index}
                      className={`${
                        user.status === "Check it"
                          ? "bg-green-200"
                          : "bg-pink-200"
                      } bg-opacity-80 border-b border-white shadow-sm`}
                    >
                      <td className="px-4 py-6 text-center">{user.name}</td>
                      <td className="px-4 py-6 text-center">{user.age}</td>
                      <td className="px-4 py-6 text-center">{user.email}</td>
                      <td className="px-4 py-6 text-center">{user.role}</td>
                      <td className="px-4 py-6 text-center">
                        <div
                          className={`rounded-full ${
                            user.status === "Check it"
                              ? "bg-green-300"
                              : "bg-pink-300"
                          } flex items-center justify-center px-1 py-0.5 min-w-max`}
                        >
                          <div
                            className={`h-2 w-2 rounded-full ${
                              user.status === "Check it"
                                ? "bg-green-700"
                                : "bg-pink-700"
                            } mr-1`}
                          ></div>
                          <span
                            className={`text-${
                              user.status === "Check it" ? "green" : "pink"
                            }-700`}
                          >
                            {user.status}
                          </span>
                        </div>
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
