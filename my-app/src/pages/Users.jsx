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
import ruloVert from "../components/img/vertical.png";
import ruloDiag from "../components/img/diagonal.png";
import pelota from "../components/img/pelota.png";
import SideBar from "../components/SideBar";

export default function Users() {
  return (
    <div className="flex bg-customGreen h-screen">
      {/* Side bar */}
      <SideBar />
      {/* Content */}
      <div className="bg-customGreen flex-grow">
        <div className="bg-white mx-8 my-8 p-8 rounded-3xl shadow-gray-600 shadow-xl h-[92%] w-944 ">
          <div className="flex items-center mb-6 shadow-sm">
            <h1 className="text-3xl text-bold">
              Users
              <p className="text-base text">View all the users</p>
            </h1>
            <div className="absolute bottom-[75%] left-[60%] mt-16 mr-4 h-44 w-44 transform scale-x-[-1]">
              {" "}
              <img
                src="https://s3-alpha-sig.figma.com/img/ab4f/00b4/5a447ab3464c1fb8fe0e6c2ae265c2a7?Expires=1714953600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=EH-5OvOKE6ZJAOXkX9qb0k0xe1L5uNDv3-By54Ra4GCl2SNG6Xzgr3G2LWxw8N--aw2ulISSRpA2~StZ4RyOw3z7jr88Nsk-Vg8eRKq8jpGQi30sw2M0wYN~U886sZOuuHkFYiYwySXKwUtYns4l4sdcTptpmr9UvxDcWpUt6smxnmof7LerH49iPCizYUHG6h5ADfRYIF7X0UHU928snz0n-AVkMw78v5~~F682f2z3qjatgL9qFialP6odU89oBc0FwXFqdfiLpJWVGpnkxK9Yq6GmSQb~Q2yuB8GX5oyJUddEXu4vRiOqzi3VmZ7Br8x-oJop0hOsDUGDegBqXg__"
                alt="ruloDiag"
                style={{ filter: "grayscale(100%)" }}
              />
            </div>
            <div className="absolute top-0 left-[75%] mt-16 mr-4 h-64 w-64">
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
            <FontAwesomeIcon icon={faSearch} className="text-gray-800 px-2" />
            <input
              type="text"
              placeholder="Search for users..."
              className="rounded-3xl py-2 px-4 focus:outline-none focus:border focus:border-blue-500 w-[50%] bg-white shadow-lg"
            />
          </div>

          {/* Users table */}
          <div className="bg-white mx-8 my-8 p-8 rounded-3xl h-[80%] shadow-2xl overflow-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="px-4 py-6 border-b border-gray-500">Name</th>
                  <th className="px-4 py-6 border-b border-gray-500">Age</th>
                  <th className="px-4 py-6 border-b border-gray-500">Email</th>
                  <th className="px-4 py-6 border-b border-gray-500">Role</th>
                  <th className="px-4 py-6 border-b border-gray-500">Status</th>
                </tr>
              </thead>
              <tbody>
                {/* Aquí puedes mapear los usuarios y mostrarlos en filas de la tabla */}
                <tr className="border-b border-gray-500 shadow-sm">
                  <td className="px-4 py-6">John Doe</td>
                  <td className="px-4 py-6">30</td>
                  <td className="px-4 py-6">john.doe@example.com</td>
                  <td className="px-4 py-6">Admin</td>
                  <td className="px-4 py-6">Active</td>
                </tr>
                {/* Filas adicionales */}
                <tr className="border-b border-gray-500 shadow-sm">
                  <td className="px-4 py-3">Jane Doe</td>
                  <td className="px-4 py-6">25</td>
                  <td className="px-4 py-6">jane.doe@example.com</td>
                  <td className="px-4 py-6">User</td>
                  <td className="px-4 py-6">Inactive</td>
                </tr>
                <tr className="border-b border-gray-500 shadow-sm">
                  <td className="px-4 py-3">Jane Doe</td>
                  <td className="px-4 py-6">25</td>
                  <td className="px-4 py-6">jane.doe@example.com</td>
                  <td className="px-4 py-6">User</td>
                  <td className="px-4 py-6">Inactive</td>
                </tr>
                <tr className="border-b border-gray-500 shadow-sm">
                  <td className="px-4 py-3">Jane Doe</td>
                  <td className="px-4 py-6">25</td>
                  <td className="px-4 py-6">jane.doe@example.com</td>
                  <td className="px-4 py-6">User</td>
                  <td className="px-4 py-6">Inactive</td>
                </tr>
                <tr className="border-b border-gray-500 shadow-sm">
                  <td className="px-4 py-3">Jane Doe</td>
                  <td className="px-4 py-6">25</td>
                  <td className="px-4 py-6">jane.doe@example.com</td>
                  <td className="px-4 py-6">User</td>
                  <td className="px-4 py-6">Inactive</td>
                </tr>
                <tr className="border-b border-gray-500 shadow-sm">
                  <td className="px-4 py-3">Jane Doe</td>
                  <td className="px-4 py-6">25</td>
                  <td className="px-4 py-6">jane.doe@example.com</td>
                  <td className="px-4 py-6">User</td>
                  <td className="px-4 py-6">Inactive</td>
                </tr>
                <tr className="border-b border-gray-500 shadow-sm">
                  <td className="px-4 py-3">Jane Doe</td>
                  <td className="px-4 py-6">25</td>
                  <td className="px-4 py-6">jane.doe@example.com</td>
                  <td className="px-4 py-6">User</td>
                  <td className="px-4 py-6">Inactive</td>
                </tr>
                {/* Repite este bloque de <tr> para cada usuario */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
