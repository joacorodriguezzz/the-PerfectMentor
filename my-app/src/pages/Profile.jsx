import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { faEdit, faCheck, faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SideBar from "../components/SideBar";

export default function Profile() {
  const [user, setUser] = useState({
    name: "John Doe",
    age: 30,
    email: "john.doe@example.com",
    role: "Mentor",
    status: "Active",
    image:
      "https://static.vecteezy.com/system/resources/previews/004/274/186/non_2x/person-icon-user-interface-icon-silhouette-of-man-simple-symbol-a-glyph-symbol-in-your-web-site-design-logo-app-ui-webinar-video-chat-ect-vector.jpg",
  });
  const [editing, setEditing] = useState({
    name: false,
    email: false,
    role: false,
  });
  const [editableRole, setEditableRole] = useState("");
  const [updatedUser, setUpdatedUser] = useState(null); // Estado para almacenar los cambios antes de guardarlos
  const [selectedImage, setSelectedImage] = useState(null); // Estado para almacenar la imagen seleccionada por el usuario
  const imageInputRef = useRef(null); // Referencia al input de tipo file para seleccionar la imagen
  const roles = ["Mentor", "Mentee"];

  // Función para manejar la edición del usuario
  const handleEdit = (field) => {
    setEditing({ ...editing, [field]: true });
    setUpdatedUser({ ...user }); // Guardar una copia del usuario antes de editar
    if (field === "role") {
      setEditableRole(user.role);
    }
  };

  // Función para manejar el cambio de valor del usuario
  const handleChange = (e, field) => {
    setUpdatedUser({ ...updatedUser, [field]: e.target.value });
  };

  // Función para manejar el guardado del usuario
  const handleSave = (field) => {
    console.log(`Guardando ${field}`);
    // Aquí puedes implementar la lógica para guardar el campo correspondiente
    setUser(updatedUser); // Aplicar los cambios al usuario
    setEditing({ ...editing, [field]: false });
  };

  // Función para manejar el cambio de rol en el dropdown
  const handleRoleChange = (e) => {
    setEditableRole(e.target.value);
    setUpdatedUser({ ...updatedUser, role: e.target.value });
  };

  // Función para manejar la selección de una imagen desde los archivos locales
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Función para abrir el selector de archivos al hacer clic en el ícono de la cámara
  const handleImageClick = () => {
    imageInputRef.current.click();
  };

  return (
    <div className="flex bg-customGreen h-screen">
      {/* Content */}
      <SideBar />
      <div className="bg-customGreen flex-grow relative">
        <div className="bg-white mx-8 my-8 p-8 rounded-3xl shadow-gray-600 shadow-xl  h-[92%] w-944">
          <h1 className="flex items-center justify-center text-5xl absolute top-28 left-[50%] transform -translate-x-1/2 text-gray-800">
            Profile
          </h1>
          <div className="absolute top-64 left-[80%] mt-16 mr-4 h-44 w-44">
            {" "}
            <img
              src="https://s3-alpha-sig.figma.com/img/ab4f/00b4/5a447ab3464c1fb8fe0e6c2ae265c2a7?Expires=1714953600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=EH-5OvOKE6ZJAOXkX9qb0k0xe1L5uNDv3-By54Ra4GCl2SNG6Xzgr3G2LWxw8N--aw2ulISSRpA2~StZ4RyOw3z7jr88Nsk-Vg8eRKq8jpGQi30sw2M0wYN~U886sZOuuHkFYiYwySXKwUtYns4l4sdcTptpmr9UvxDcWpUt6smxnmof7LerH49iPCizYUHG6h5ADfRYIF7X0UHU928snz0n-AVkMw78v5~~F682f2z3qjatgL9qFialP6odU89oBc0FwXFqdfiLpJWVGpnkxK9Yq6GmSQb~Q2yuB8GX5oyJUddEXu4vRiOqzi3VmZ7Br8x-oJop0hOsDUGDegBqXg__"
              alt="ruloDiag"
              style={{ filter: "grayscale(100%)" }}
            />
          </div>
          <div className="absolute top-0 right-[30%] mt-16 mr-4 h-64 w-64">
            {" "}
            <img
              src="https://s3-alpha-sig.figma.com/img/7f53/b3c5/7afb6e81e8e2f3fb0adce00afb7428a2?Expires=1714953600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=HnR4LAYRiNZP2aGNY4B84JEtrL4IYGqqTGcGn-gkmFlNJaMJYPVUxOIpzg8RwnCDtxic-YUSjeVPbb74l4dEsKHaihSAwQes6Rl4vnJY7Xo5z9CUQ5pain6M8gmkbwnPm5Z2X9EXM2axSmJuuGFpj23iDdq33tzAV8opOyjL1eCWP0vKxdYnEDAYj~pMMj6NJeTKWFgCQEpEifyxOIjxVb8IqKaHq-KF2Ny1zEmFazpH8Xs0CDUfwkqxrxOTlpkVz2GIkWTlTm-sKJlCko~S16AsH8cDTElIeV5vT3wbfNq6Jc8ENhUq8fp5XrS0px7P35vq6JYpq2Nu~EASWdYFTQ__"
              alt="ruloVert"
              style={{ filter: "grayscale(100%)" }}
            />
          </div>
          <div className="absolute top-[20%] left-[20%] mt-16 mr-4 h-32 w-32 transform ">
            {" "}
            <img
              src="https://s3-alpha-sig.figma.com/img/46b4/ec58/f92a969bc1cb48d864d435ebd9d85984?Expires=1714953600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ZnIGhVI-0cmgU1MQWJMdPS5Cgq6Cr5gFsFDdPMwNJzSqRPrYj7o9HFURe8qaWGTanq6UReiJQqBhTo-rIjL6YNcbc0UM3x1Jj4tdKBsPm-cNtIWcVB0uk2nQjYBqfy7njN7MyygPsLvJSNHRH9I0LskLlSDY1UfzN~4~bdzIpcDhMJy-5gqDOvrxcFhSrS5O328NXMqSvD~CfP0I~XQZzSSKiBao77GGK9t7WHWQTfAcjRBnwt4ZfYbydlIL1C9RxCwCYZJdFs2fRFi9-b09MpGaXWZ4FD3V5Wkq4V5CYToZhsWzTKCQXRlwylsc~VzuzpTOYNMcAKQPIOP2sowKRg__"
              alt="doodle"
              style={{ filter: "grayscale(100%)" }}
            />
          </div>
          <div className="absolute top-[60%] right-[50%] mt-16 mr-4 h-60 w-60 transform scale-y-[-1]">
            {" "}
            <img
              src="https://s3-alpha-sig.figma.com/img/7f53/b3c5/7afb6e81e8e2f3fb0adce00afb7428a2?Expires=1714953600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=HnR4LAYRiNZP2aGNY4B84JEtrL4IYGqqTGcGn-gkmFlNJaMJYPVUxOIpzg8RwnCDtxic-YUSjeVPbb74l4dEsKHaihSAwQes6Rl4vnJY7Xo5z9CUQ5pain6M8gmkbwnPm5Z2X9EXM2axSmJuuGFpj23iDdq33tzAV8opOyjL1eCWP0vKxdYnEDAYj~pMMj6NJeTKWFgCQEpEifyxOIjxVb8IqKaHq-KF2Ny1zEmFazpH8Xs0CDUfwkqxrxOTlpkVz2GIkWTlTm-sKJlCko~S16AsH8cDTElIeV5vT3wbfNq6Jc8ENhUq8fp5XrS0px7P35vq6JYpq2Nu~EASWdYFTQ__"
              alt="ruloVert"
              style={{ filter: "grayscale(100%)" }}
            />
          </div>

          <div className="bg-white mx-auto mt-24 p-8 rounded-3xl h-[85%] shadow-2xl overflow-auto w-1/2 pt-[15%]">
            {/* Imagen de usuario */}
            <div className="flex justify-center items-start mb-8 relative">
              <img
                src={selectedImage || user.image}
                alt="User profile"
                className="w-40 h-40 absolute bottom-[60%] object-cover rounded-full cursor-pointer hover:opacity-80 hover:"
                onClick={handleImageClick}
              />
              <input
                type="file"
                accept="image/*"
                ref={imageInputRef}
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
            </div>

            {/* Títulos y contenido del perfil */}
            <div>
              <div className="flex justify-between">
                <div>
                  <p className="text-lg mb-2 pl-4 text-gray-400">Your name</p>
                  {editing.name ? (
                    <>
                      <input
                        type="text"
                        value={updatedUser.name}
                        onChange={(e) => handleChange(e, "name")}
                        className="border-b border-gray-400 focus:outline-none focus:border-gray-500"
                      />
                      <FontAwesomeIcon
                        icon={faCheck}
                        className="text-gray-500 cursor-pointer ml-2"
                        onClick={() => handleSave("name")}
                      />
                    </>
                  ) : (
                    <>
                      <h2>{user.name}</h2>
                      <FontAwesomeIcon
                        icon={faEdit}
                        className="text-gray-500 cursor-pointer ml-2 self-end"
                        onClick={() => handleEdit("name")}
                      />
                    </>
                  )}
                </div>
              </div>
              <hr className="border-gray-400 mb-2" />
              <div className="flex justify-between">
                <div>
                  <p className="text-lg font-semibold mb-2 pl-4 text-gray-400">
                    Your email
                  </p>
                  {editing.email ? (
                    <>
                      <input
                        type="email"
                        value={updatedUser.email}
                        onChange={(e) => handleChange(e, "email")}
                        className="border-b border-gray-400 focus:outline-none focus:border-gray-500"
                      />
                      <FontAwesomeIcon
                        icon={faCheck}
                        className="text-gray-500 cursor-pointer ml-2"
                        onClick={() => handleSave("email")}
                      />
                    </>
                  ) : (
                    <>
                      <h2>{user.email}</h2>
                      <FontAwesomeIcon
                        icon={faEdit}
                        className="text-gray-500 cursor-pointer ml-2 self-end"
                        onClick={() => handleEdit("email")}
                      />
                    </>
                  )}
                </div>
              </div>
              <hr className="border-gray-400 mb-2" />
              <div className="flex justify-between">
                <div>
                  <p className="text-lg font-semibold mb-2 pl-4 text-gray-400">
                    Your role
                  </p>
                  {editing.role ? (
                    <div className="relative">
                      <select
                        value={editableRole}
                        onChange={handleRoleChange}
                        className="border border-gray-400 focus:outline-none focus:border-gray-500 appearance-none"
                      >
                        {roles.map((role, index) => (
                          <option key={index} value={role}>
                            {role}
                          </option>
                        ))}
                      </select>
                      <FontAwesomeIcon
                        icon={faCheck}
                        className="text-gray-500 cursor-pointer absolute top-0 right-0 mt-2 mr-2"
                        onClick={() => handleSave("role")}
                      />
                    </div>
                  ) : (
                    <>
                      <h2>{user.role}</h2>
                      <FontAwesomeIcon
                        icon={faEdit}
                        className="text-gray-500 cursor-pointer ml-2 self-end"
                        onClick={() => handleEdit("role")}
                      />
                    </>
                  )}
                </div>
              </div>
              <hr className="border-gray-400 mb-2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
