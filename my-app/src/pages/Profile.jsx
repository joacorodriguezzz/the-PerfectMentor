// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import { faEdit, faCheck, faCamera } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import SideBar from "../components/SideBar";
// import axios from "axios";

// export default function Profile() {
//   const [user, setUser] = useState(null);
//   const [editing, setEditing] = useState({
//     name: false,
//     email: false,
//     role: false,
//     age: false,
//     country: false,
//     language: false,
//     profileImg: false,
//   });
//   const [userName, setUserName] = useState("");
//   const [email, setEmail] = useState("");
//   const [editableRole, setEditableRole] = useState("");
//   const [updatedUser, setUpdatedUser] = useState(null);
//   const [selectedImage, setSelectedImage] = useState(
//     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQgrnXQr8_tLaOGSywuwUpFcVEzD1M_jIeDdWc0GukWg&s"
//   );
//   const [age, setAge] = useState("");
//   const [country, setCountry] = useState("");
//   const [language, setLanguage] = useState("");
//   const imageInputRef = useRef(null);
//   const roles = ["Mentor", "Mentee"];
//   const userId = user && user.userId;

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const response = await axios.get("http://localhost:3001/api/profile");
//         setUser(response.data.user);
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//       }
//     };

//     fetchUserData();
//   }, []);

//   const handleEdit = (field) => {
//     setEditing({ ...editing, [field]: true });
//   };

//   const handleChange = (e, field) => {
//     setUpdatedUser({ ...updatedUser, [field]: e.target.value });
//   };

//   const handleSave = async (field) => {
//     try {
//       const response = await axios.put("http://localhost:3001/api/profile", {
//         [field]: updatedUser[field],
//       });
//       setUser(response.data.user);
//       setEditing({ ...editing, [field]: false });
//     } catch (error) {
//       console.error(`Error saving ${field}:`, error);
//     }
//   };

//   const handleNameChange = (e) => {
//     setUserName(e.target.value);
//   };

//   const handleEmailChange = (e) => {
//     setEmail(e.target.value);
//   };

//   const handleRoleChange = (e) => {
//     const roleInput = e.target.value;
//     setUpdatedUser({ ...updatedUser, role: roleInput });
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (event) => {
//         setSelectedImage(event.target.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleImageClick = () => {
//     imageInputRef.current.click();
//   };

//   const handleAgeChange = (event) => {
//     const ageInput = event.target.value;
//     const ageRegex = /^\d*$/;
//     if (ageRegex.test(ageInput)) {
//       setAge(ageInput);
//     }
//   };

//   const handleCountryChange = (event) => {
//     const countryInput = event.target.value;
//     setCountry(countryInput);
//   };

//   const handleLanguageChange = (event) => {
//     const languageInput = event.target.value;
//     setLanguage(languageInput);
//   };

//   return (
//     <div className="flex bg-customGreen h-screen">
//       {/* Content */}
//       <SideBar />
//       <div className="bg-customGreen flex-grow relative">
//         <div className="bg-white mx-8 my-8 p-8 rounded-3xl shadow-gray-600 shadow-xl h-[92%] w-944">
//           <h1 className="flex items-center justify-center text-5xl absolute top-28 left-[50%] transform -translate-x-1/2 text-gray-800">
//             Profile
//           </h1>
//           <div className="absolute top-64 left-[80%] mt-16 mr-4 h-44 w-44">
//             {" "}
//             <img
//               src="https://s3-alpha-sig.figma.com/img/ab4f/00b4/5a447ab3464c1fb8fe0e6c2ae265c2a7?Expires=1714953600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=EH-5OvOKE6ZJAOXkX9qb0k0xe1L5uNDv3-By54Ra4GCl2SNG6Xzgr3G2LWxw8N--aw2ulISSRpA2~StZ4RyOw3z7jr88Nsk-Vg8eRKq8jpGQi30sw2M0wYN~U886sZOuuHkFYiYwySXKwUtYns4l4sdcTptpmr9UvxDcWpUt6smxnmof7LerH49iPCizYUHG6h5ADfRYIF7X0UHU928snz0n-AVkMw78v5~~F682f2z3qjatgL9qFialP6odU89oBc0FwXFqdfiLpJWVGpnkxK9Yq6GmSQb~Q2yuB8GX5oyJUddEXu4vRiOqzi3VmZ7Br8x-oJop0hOsDUGDegBqXg__"
//               alt="ruloDiag"
//               style={{ filter: "grayscale(100%)" }}
//             />
//           </div>
//           <div className="absolute top-0 right-[30%] mt-16 mr-4 h-64 w-64">
//             {" "}
//             <img
//               src="https://s3-alpha-sig.figma.com/img/7f53/b3c5/7afb6e81e8e2f3fb0adce00afb7428a2?Expires=1714953600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=HnR4LAYRiNZP2aGNY4B84JEtrL4IYGqqTGcGn-gkmFlNJaMJYPVUxOIpzg8RwnCDtxic-YUSjeVPbb74l4dEsKHaihSAwQes6Rl4vnJY7Xo5z9CUQ5pain6M8gmkbwnPm5Z2X9EXM2axSmJuuGFpj23iDdq33tzAV8opOyjL1eCWP0vKxdYnEDAYj~pMMj6NJeTKWFgCQEpEifyxOIjxVb8IqKaHq-KF2Ny1zEmFazpH8Xs0CDUfwkqxrxOTlpkVz2GIkWTlTm-sKJlCko~S16AsH8cDTElIeV5vT3wbfNq6Jc8ENhUq8fp5XrS0px7P35vq6JYpq2Nu~EASWdYFTQ__"
//               alt="ruloVert"
//               style={{ filter: "grayscale(100%)" }}
//             />
//           </div>
//           <div className="absolute top-[20%] left-[20%] mt-16 mr-4 h-32 w-32 transform ">
//             {" "}
//             <img
//               src="https://s3-alpha-sig.figma.com/img/46b4/ec58/f92a969bc1cb48d864d435ebd9d85984?Expires=1714953600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ZnIGhVI-0cmgU1MQWJMdPS5Cgq6Cr5gFsFDdPMwNJzSqRPrYj7o9HFURe8qaWGTanq6UReiJQqBhTo-rIjL6YNcbc0UM3x1Jj4tdKBsPm-cNtIWcVB0uk2nQjYBqfy7njN7MyygPsLvJSNHRH9I0LskLlSDY1UfzN~4~bdzIpcDhMJy-5gqDOvrxcFhSrS5O328NXMqSvD~CfP0I~XQZzSSKiBao77GGK9t7WHWQTfAcjRBnwt4ZfYbydlIL1C9RxCwCYZJdFs2fRFi9-b09MpGaXWZ4FD3V5Wkq4V5CYToZhsWzTKCQXRlwylsc~VzuzpTOYNMcAKQPIOP2sowKRg__"
//               alt="doodle"
//               style={{ filter: "grayscale(100%)" }}
//             />
//           </div>
//           <div className="absolute top-[60%] right-[50%] mt-16 mr-4 h-60 w-60 transform scale-y-[-1]">
//             {" "}
//             <img
//               src="https://s3-alpha-sig.figma.com/img/7f53/b3c5/7afb6e81e8e2f3fb0adce00afb7428a2?Expires=1714953600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=HnR4LAYRiNZP2aGNY4B84JEtrL4IYGqqTGcGn-gkmFlNJaMJYPVUxOIpzg8RwnCDtxic-YUSjeVPbb74l4dEsKHaihSAwQes6Rl4vnJY7Xo5z9CUQ5pain6M8gmkbwnPm5Z2X9EXM2axSmJuuGFpj23iDdq33tzAV8opOyjL1eCWP0vKxdYnEDAYj~pMMj6NJeTKWFgCQEpEifyxOIjxVb8IqKaHq-KF2Ny1zEmFazpH8Xs0CDUfwkqxrxOTlpkVz2GIkWTlTm-sKJlCko~S16AsH8cDTElIeV5vT3wbfNq6Jc8ENhUq8fp5XrS0px7P35vq6JYpq2Nu~EASWdYFTQ__"
//               alt="ruloVert"
//               style={{ filter: "grayscale(100%)" }}
//             />
//           </div>

//           <div className="bg-white mx-auto mt-24 p-8 rounded-3xl h-[85%] shadow-2xl overflow-auto w-1/2 pt-[15%]">
//             {/* Imagen de usuario */}
//             <div className="flex justify-center items-start mb-8 relative">
//               <img
//                 src={selectedImage || (user && user.profileImg)}
//                 alt="User profile"
//                 className="w-40 h-40 absolute bottom-[60%] object-cover rounded-full cursor-pointer hover:opacity-80 hover:"
//                 onClick={handleImageClick}
//               />
//               <input
//                 type="file"
//                 accept="image/*"
//                 ref={imageInputRef}
//                 style={{ display: "none" }}
// onChange={handleImageChange}
//               />
//             </div>

//             {/* Títulos y contenido del perfil */}
//             <div>
//               <div className="flex justify-between">
//                 <div>
//                   <p className="text-lg mb-2 pl-4 text-gray-400">Your name</p>
//                   <input
//                     type="text"
//                     className="border-b border-gray-400 focus:outline-none focus:border-gray-500"
//                     onChange={handleNameChange}
//                     value={userName}
//                   />
//                 </div>
//               </div>
//               <hr className="border-gray-400 mb-2" />
//               <div className="flex justify-between">
//                 <div>
//                   <p className="text-lg font-semibold mb-2 pl-4 text-gray-400">
//                     Your email
//                   </p>
//                   <input
//                     type="email"
//                     className="border-b border-gray-400 focus:outline-none focus:border-gray-500"
//                     onChange={handleEmailChange}
//                     value={email}
//                   />
//                 </div>
//               </div>
//               <hr className="border-gray-400 mb-2" />
//               <div className="flex justify-between">
//                 <div>
//                   <p className="text-lg font-semibold mb-2 pl-4 text-gray-400">
//                     Your role
//                   </p>
//                   <select
//                     className="border-b border-gray-400 focus:outline-none focus:border-gray-500"
//                     defaultValue=""
//                     onChange={handleRoleChange}
//                   >
//                     <option value="" disabled hidden>
//                       Select Role
//                     </option>
//                     <option value="mentor">Mentor</option>
//                     <option value="mentee">Mentee</option>
//                   </select>
//                 </div>
//               </div>
//               <hr className="border-gray-400 mb-2" />
//               {/* Age Input */}
//               <div className="flex justify-between">
//                 <div>
//                   <p className="text-lg font-semibold mb-2 pl-4 text-gray-400">
//                     Age
//                   </p>
//                   <input
//                     type="number"
//                     className="border-b border-gray-400 focus:outline-none focus:border-gray-500"
//                     min="0"
//                     max="100"
//                     onChange={handleAgeChange}
//                     value={age}
//                   />
//                 </div>
//               </div>
//               <hr className="border-gray-400 mb-2" />
//               {/* Country Input */}
//               <div className="flex justify-between">
//                 <div>
//                   <p className="text-lg font-semibold mb-2 pl-4 text-gray-400">
//                     Country
//                   </p>
//                   <select
//                     type="text"
//                     className="border-b border-gray-400 focus:outline-none focus:border-gray-500"
//                     onChange={handleCountryChange}
//                     value={country}
//                   >
//                     <option value="" disabled hidden>
//                       Select Country
//                     </option>
//                     <option value="argentina">Argentina</option>
//                     <option value="españa">España</option>
//                     <option value="colombia">Colombia</option>
//                     <option value="mexico">Mexico</option>
//                     <option value="estadosUnidos">Estados Unidos</option>
//                   </select>
//                 </div>
//               </div>
//               <hr className="border-gray-400 mb-2" />
//               {/* Language Input */}
//               <div className="flex justify-between">
//                 <div>
//                   <p className="text-lg font-semibold mb-2 pl-4 text-gray-400">
//                     Language
//                   </p>
//                   <select
//                     type="text"
//                     className="border-b border-gray-400 focus:outline-none focus:border-gray-500"
//                     onChange={handleLanguageChange}
//                     value={language}
//                   >
//                     <option value="" disabled hidden>
//                       Select Language
//                     </option>
//                     <option value="argentina">Español</option>
//                     <option value="españa">Ingles</option>
//                     <option value="colombia">Portugues</option>
//                   </select>
//                 </div>
//               </div>
//               <hr className="border-gray-400 mb-2" />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

//prueba
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../components/SideBar";
import axios from "axios";

export default function Profile() {
  const [user, setUser] = useState({
    userName: "",
    email: "",
    role: "",
    age: "",
    country: "",
    language: "",
    profileImg: "",
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/userData", {
        withCredentials: true,
      })
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        alert("Error al obtener el perfil del usuario");
        navigate("/signIn");
      });
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(URL.createObjectURL(e.target.files[0]));
      setUser((prevState) => ({
        ...prevState,
        profileImg: e.target.files[0],
      }));
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    for (const key in user) {
      formData.append(key, user[key]);
    }

    try {
      const response = await axios.put(
        "http://localhost:3001/api/userData",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const updatedUser = response.data; // Assuming the response contains the updated user data
      setUser(updatedUser); // Update the state with the new user data
      alert("Perfil actualizado con éxito");
    } catch (error) {
      console.error("Error updating user data:", error);
      alert("Error al actualizar el perfil del usuario");
    }
  };

  return (
    <div className="flex bg-customGreen h-screen">
      <SideBar />
      <div className="bg-customGreen flex-grow relative">
        <div className="bg-white mx-8 my-8 p-8 rounded-3xl shadow-gray-600 shadow-xl h-[92%] w-944">
          <h1 className="flex items-center justify-center text-5xl absolute top-28 left-[50%] transform -translate-x-1/2 text-gray-800">
            Profile
          </h1>
          <div className="absolute top-64 left-[80%] mt-16 mr-4 h-44 w-44">
            <img
              src="https://s3-alpha-sig.figma.com/img/ab4f/00b4/5a447ab3464c1fb8fe0e6c2ae265c2a7?Expires=1714953600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=EH-5OvOKE6ZJAOXkX9qb0k0xe1L5uNDv3-By54Ra4GCl2SNG6Xzgr3G2LWxw8N--aw2ulISSRpA2~StZ4RyOw3z7jr88Nsk-Vg8eRKq8jpGQi30sw2M0wYN~U886sZOuuHkFYiYwySXKwUtYns4l4sdcTptpmr9UvxDcWpUt6smxnmof7LerH49iPCizYUHG6h5ADfRYIF7X0UHU928snz0n-AVkMw78v5~~F682f2z3qjatgL9qFialP6odU89oBc0FwXFqdfiLpJWVGpnkxK9Yq6GmSQb~Q2yuB8GX5oyJUddEXu4vRiOqzi3VmZ7Br8x-oJop0hOsDUGDegBqXg__"
              alt="ruloDiag"
              style={{ filter: "grayscale(100%)" }}
            />
          </div>
          <div className="absolute top-0 right-[30%] mt-16 mr-4 h-64 w-64">
            <img
              src="https://s3-alpha-sig.figma.com/img/7f53/b3c5/7afb6e81e8e2f3fb0adce00afb7428a2?Expires=1714953600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=HnR4LAYRiNZP2aGNY4B84JEtrL4IYGqqTGcGn-gkmFlNJaMJYPVUxOIpzg8RwnCDtxic-YUSjeVPbb74l4dEsKHaihSAwQes6Rl4vnJY7Xo5z9CUQ5pain6M8gmkbwnPm5Z2X9EXM2axSmJuuGFpj23iDdq33tzAV8opOyjL1eCWP0vKxdYnEDAYj~pMMj6NJeTKWFgCQEpEifyxOIjxVb8IqKaHq-KF2Ny1zEmFazpH8Xs0CDUfwkqxrxOTlpkVz2GIkWTlTm-sKJlCko~S16AsH8cDTElIeV5vT3wbfNq6Jc8ENhUq8fp5XrS0px7P35vq6JYpq2Nu~EASWdYFTQ__"
              alt="ruloVert"
              style={{ filter: "grayscale(100%)" }}
            />
          </div>
          <div className="absolute top-[20%] left-[20%] mt-16 mr-4 h-32 w-32 transform ">
            <img
              src="https://s3-alpha-sig.figma.com/img/46b4/ec58/f92a969bc1cb48d864d435ebd9d85984?Expires=1714953600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ZnIGhVI-0cmgU1MQWJMdPS5Cgq6Cr5gFsFDdPMwNJzSqRPrYj7o9HFURe8qaWGTanq6UReiJQqBhTo-rIjL6YNcbc0UM3x1Jj4tdKBsPm-cNtIWcVB0uk2nQjYBqfy7njN7MyygPsLvJSNHRH9I0LskLlSDY1UfzN~4~bdzIpcDhMJy-5gqDOvrxcFhSrS5O328NXMqSvD~CfP0I~XQZzSSKiBao77GGK9t7WHWQTfAcjRBnwt4ZfYbydlIL1C9RxCwCYZJdFs2fRFi9-b09MpGaXWZ4FD3V5Wkq4V5CYToZhsWzTKCQXRlwylsc~VzuzpTOYNMcAKQPIOP2sowKRg__"
              alt="doodle"
              style={{ filter: "grayscale(100%)" }}
            />
          </div>
          <div className="absolute top-[60%] right-[50%] mt-16 mr-4 h-60 w-60 transform scale-y-[-1]">
            <img
              src="https://s3-alpha-sig.figma.com/img/7f53/b3c5/7afb6e81e8e2f3fb0adce00afb7428a2?Expires=1714953600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=HnR4LAYRiNZP2aGNY4B84JEtrL4IYGqqTGcGn-gkmFlNJaMJYPVUxOIpzg8RwnCDtxic-YUSjeVPbb74l4dEsKHaihSAwQes6Rl4vnJY7Xo5z9CUQ5pain6M8gmkbwnPm5Z2X9EXM2axSmJuuGFpj23iDdq33tzAV8opOyjL1eCWP0vKxdYnEDAYj~pMMj6NJeTKWFgCQEpEifyxOIjxVb8IqKaHq-KF2Ny1zEmFazpH8Xs0CDUfwkqxrxOTlpkVz2GIkWTlTm-sKJlCko~S16AsH8cDTElIeV5vT3wbfNq6Jc8ENhUq8fp5XrS0px7P35vq6JYpq2Nu~EASWdYFTQ__"
              alt="ruloVert"
              style={{ filter: "grayscale(100%)" }}
            />
          </div>

          <div className="bg-white mx-auto mt-24 p-8 rounded-3xl h-[85%] shadow-2xl overflow-auto w-1/2 pt-[15%]">
            <div className="flex justify-center items-start mb-8 relative">
              <img
                src={selectedImage || user.profileImg}
                alt="User profile"
                className="w-40 h-40 absolute bottom-[60%] object-cover rounded-full cursor-pointer hover:opacity-80 hover:"
                onClick={() => document.getElementById("imageInput").click()}
              />
              <input
                id="imageInput"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
            </div>

            <div>
              <div className="flex justify-between">
                <div>
                  <p className="text-lg mb-2 pl-4 text-gray-400">Your name</p>
                  <input
                    type="text"
                    name="userName"
                    className="border-b border-gray-400 focus:outline-none focus:border-gray-500"
                    onChange={handleInputChange}
                    value={user.userName}
                  />
                </div>
              </div>
              <hr className="border-gray-400 mb-2" />
              <div className="flex justify-between">
                <div>
                  <p className="text-lg font-semibold mb-2 pl-4 text-gray-400">
                    Your email
                  </p>
                  <input
                    type="email"
                    name="email"
                    className="border-b border-gray-400 focus:outline-none focus:border-gray-500"
                    onChange={handleInputChange}
                    value={user.email}
                  />
                </div>
              </div>
              <hr className="border-gray-400 mb-2" />
              <div className="flex justify-between">
                <div>
                  <p className="text-lg font-semibold mb-2 pl-4 text-gray-400">
                    Your role
                  </p>
                  <select
                    name="role"
                    className="border-b border-gray-400 focus:outline-none focus:border-gray-500"
                    onChange={handleInputChange}
                    value={user.role}
                  >
                    <option value="" disabled hidden>
                      Select Role
                    </option>
                    <option value="mentor">Mentor</option>
                    <option value="mentee">Mentee</option>
                  </select>
                </div>
              </div>
              <hr className="border-gray-400 mb-2" />
              <div className="flex justify-between">
                <div>
                  <p className="text-lg font-semibold mb-2 pl-4 text-gray-400">
                    Age
                  </p>
                  <input
                    type="number"
                    name="age"
                    className="border-b border-gray-400 focus:outline-none focus:border-gray-500"
                    min="0"
                    max="100"
                    onChange={handleInputChange}
                    value={user.age}
                  />
                </div>
              </div>
              <hr className="border-gray-400 mb-2" />
              <div className="flex justify-between">
                <div>
                  <p className="text-lg font-semibold mb-2 pl-4 text-gray-400">
                    Country
                  </p>
                  <select
                    name="country"
                    className="border-b border-gray-400 focus:outline-none focus:border-gray-500"
                    onChange={handleInputChange}
                    value={user.country}
                  >
                    <option value="" disabled hidden>
                      Select Country
                    </option>
                    <option value="argentina">Argentina</option>
                    <option value="españa">España</option>
                    <option value="colombia">Colombia</option>
                    <option value="mexico">Mexico</option>
                    <option value="estadosUnidos">Estados Unidos</option>
                  </select>
                </div>
              </div>
              <hr className="border-gray-400 mb-2" />
              <div className="flex justify-between">
                <div>
                  <p className="text-lg font-semibold mb-2 pl-4 text-gray-400">
                    Language
                  </p>
                  <select
                    name="language"
                    className="border-b border-gray-400 focus:outline-none focus:border-gray-500"
                    onChange={handleInputChange}
                    value={user.language}
                  >
                    <option value="" disabled hidden>
                      Select Language
                    </option>
                    <option value="español">Español</option>
                    <option value="ingles">Ingles</option>
                    <option value="portugues">Portugues</option>
                  </select>
                </div>
              </div>
              <hr className="border-gray-400 mb-2" />
              <div className="flex justify-center mt-8">
                <button
                  className="bg-customGreen text-white px-4 py-2 rounded"
                  onClick={handleSubmit}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// // VAN DESPUES DEL H1
// // <div className="absolute top-64 left-[80%] mt-16 mr-4 h-44 w-44">
// //   {" "}
// //   <img
// //     src="https://s3-alpha-sig.figma.com/img/ab4f/00b4/5a447ab3464c1fb8fe0e6c2ae265c2a7?Expires=1714953600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=EH-5OvOKE6ZJAOXkX9qb0k0xe1L5uNDv3-By54Ra4GCl2SNG6Xzgr3G2LWxw8N--aw2ulISSRpA2~StZ4RyOw3z7jr88Nsk-Vg8eRKq8jpGQi30sw2M0wYN~U886sZOuuHkFYiYwySXKwUtYns4l4sdcTptpmr9UvxDcWpUt6smxnmof7LerH49iPCizYUHG6h5ADfRYIF7X0UHU928snz0n-AVkMw78v5~~F682f2z3qjatgL9qFialP6odU89oBc0FwXFqdfiLpJWVGpnkxK9Yq6GmSQb~Q2yuB8GX5oyJUddEXu4vRiOqzi3VmZ7Br8x-oJop0hOsDUGDegBqXg__"
// //     alt="ruloDiag"
// //     style={{ filter: "grayscale(100%)" }}
// //   />
// // </div>
// // <div className="absolute top-0 right-[30%] mt-16 mr-4 h-64 w-64">
// //   {" "}
// //   <img
// //     src="https://s3-alpha-sig.figma.com/img/7f53/b3c5/7afb6e81e8e2f3fb0adce00afb7428a2?Expires=1714953600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=HnR4LAYRiNZP2aGNY4B84JEtrL4IYGqqTGcGn-gkmFlNJaMJYPVUxOIpzg8RwnCDtxic-YUSjeVPbb74l4dEsKHaihSAwQes6Rl4vnJY7Xo5z9CUQ5pain6M8gmkbwnPm5Z2X9EXM2axSmJuuGFpj23iDdq33tzAV8opOyjL1eCWP0vKxdYnEDAYj~pMMj6NJeTKWFgCQEpEifyxOIjxVb8IqKaHq-KF2Ny1zEmFazpH8Xs0CDUfwkqxrxOTlpkVz2GIkWTlTm-sKJlCko~S16AsH8cDTElIeV5vT3wbfNq6Jc8ENhUq8fp5XrS0px7P35vq6JYpq2Nu~EASWdYFTQ__"
// //     alt="ruloVert"
// //     style={{ filter: "grayscale(100%)" }}
// //   />
// // </div>
// // <div className="absolute top-[20%] left-[20%] mt-16 mr-4 h-32 w-32 transform ">
// //   {" "}
// //   <img
// //     src="https://s3-alpha-sig.figma.com/img/46b4/ec58/f92a969bc1cb48d864d435ebd9d85984?Expires=1714953600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ZnIGhVI-0cmgU1MQWJMdPS5Cgq6Cr5gFsFDdPMwNJzSqRPrYj7o9HFURe8qaWGTanq6UReiJQqBhTo-rIjL6YNcbc0UM3x1Jj4tdKBsPm-cNtIWcVB0uk2nQjYBqfy7njN7MyygPsLvJSNHRH9I0LskLlSDY1UfzN~4~bdzIpcDhMJy-5gqDOvrxcFhSrS5O328NXMqSvD~CfP0I~XQZzSSKiBao77GGK9t7WHWQTfAcjRBnwt4ZfYbydlIL1C9RxCwCYZJdFs2fRFi9-b09MpGaXWZ4FD3V5Wkq4V5CYToZhsWzTKCQXRlwylsc~VzuzpTOYNMcAKQPIOP2sowKRg__"
// //     alt="doodle"
// //     style={{ filter: "grayscale(100%)" }}
// //   />
// // </div>
// // <div className="absolute top-[60%] right-[50%] mt-16 mr-4 h-60 w-60 transform scale-y-[-1]">
// //   {" "}
// //   <img
// //     src="https://s3-alpha-sig.figma.com/img/7f53/b3c5/7afb6e81e8e2f3fb0adce00afb7428a2?Expires=1714953600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=HnR4LAYRiNZP2aGNY4B84JEtrL4IYGqqTGcGn-gkmFlNJaMJYPVUxOIpzg8RwnCDtxic-YUSjeVPbb74l4dEsKHaihSAwQes6Rl4vnJY7Xo5z9CUQ5pain6M8gmkbwnPm5Z2X9EXM2axSmJuuGFpj23iDdq33tzAV8opOyjL1eCWP0vKxdYnEDAYj~pMMj6NJeTKWFgCQEpEifyxOIjxVb8IqKaHq-KF2Ny1zEmFazpH8Xs0CDUfwkqxrxOTlpkVz2GIkWTlTm-sKJlCko~S16AsH8cDTElIeV5vT3wbfNq6Jc8ENhUq8fp5XrS0px7P35vq6JYpq2Nu~EASWdYFTQ__"
// //     alt="ruloVert"
// //     style={{ filter: "grayscale(100%)" }}
// //   />
// // </div>
