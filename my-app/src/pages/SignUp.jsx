import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import miImagen from "../components/img/thePerfectMentor.png";
import { useNavigate } from "react-router-dom";
import {
  faUser,
  faEnvelope,
  faLock,
  faUserPen,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SignUp() {
  const [userName, setUserName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRegister = () => {
    axios
      .post("http://localhost:3001/api/user/signUp", {
        userName: userName,
        role: role,
        email: email,
        password: password,
      })
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
          console.log("error");
        } else {
          alert("Usuario registrado correctamente");
          navigate("/signIn");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert(
          "Hubo un error al procesar la solicitud. Por favor, inténtalo de nuevo más tarde."
        );
      });
  };

  const userIcon = <FontAwesomeIcon icon={faUser} />;
  const emailIcon = <FontAwesomeIcon icon={faEnvelope} />;
  const passwordIcon = <FontAwesomeIcon icon={faLock} />;

  return (
    <div className="bg-customGreen h-screen flex justify-center items-center relative">
      <Link to="/">
        <img
          src={miImagen}
          alt="thePerfectMentor"
          className="absolute top-[8%] left-[54%] h-[119px] w-[221px]"
        />
      </Link>
      <div className="border-2 border-black p-3 flex items-center w-[850px] h-[510px] rounded-3xl relative overflow-hidden">
        <div className="absolute top-[50%] left-[77%] transform -translate-x-1/2 -translate-y-1/2 scale-85">
          {/* Título "Sign Up" */}
          <h2 className="text-gray-800 text-5xl mb-6 absolute bottom-[105%] text-bold">
            Sign up
          </h2>
          <hr className="border-dashed border-gray-800 border-1 w-[100%] absolute bottom-[108%] left-[50%] transform -translate-x-1/2 scale-85" />

          {/* Inputs */}
          <div className="relative mb-3">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              {userIcon}
            </div>
            <input
              type="text"
              className="rounded-full bg-customGreen py-1 px-2 pl-9 block w-[306px] h-[59.5px] border border-gray-800 placeholder-gray-800"
              placeholder="Username"
              onChange={handleUserNameChange}
            />
          </div>

          <div className="relative mb-3">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              {emailIcon}
            </div>
            <input
              type="email"
              className="rounded-full bg-customGreen py-1 px-2 pl-9 block w-[306px] h-[59.5px] border border-gray-800 placeholder-gray-800"
              placeholder="Email"
              onChange={handleEmailChange}
            />
          </div>

          <div className="relative mb-3">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              {passwordIcon}
            </div>
            <input
              type="password"
              className="rounded-full bg-customGreen py-1 px-2 pl-9 block w-[306px] h-[59.5px] border border-gray-800 placeholder-gray-800"
              placeholder="Password"
              onChange={handlePasswordChange}
            />
          </div>
          <div className="relative mb-3">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <FontAwesomeIcon icon={faUserPen} />
            </div>
            <select
              className="rounded-full bg-customGreen py-1 px-2 pl-9 block w-[306px] h-[59.5px] border border-gray-800 text-black"
              defaultValue=""
              onChange={handleRoleChange}
            >
              <option value="" disabled hidden>
                Select Role
              </option>
              <option value="mentor">Mentor</option>
              <option value="mentee">Mentee</option>
            </select>
          </div>

          <button
            className="bg-gray-800 text-white py-1 px-2 rounded-full block border border-black w-[306px] h-[59.5px] font-sans absolute top-[113%] hover:bg-gray-600"
            onClick={handleRegister}
          >
            Sign Up
          </button>

          {/* Enlaces adicionales */}
          <div className="flex justify-between  text-sm absolute top-[100%] hover:underline">
            <span>
              <Link to="/signIn" className="text-gray-800 ">
                Already have an account?
              </Link>
            </span>
          </div>
        </div>
      </div>

      <img
        src="https://s3-alpha-sig.figma.com/img/824f/7517/11a7c18d189607d5e25f5250d7724f34?Expires=1714953600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=OSJHVT-ryyuJygt-xrvk-kTSNmvVCzw4kBj5LkwQXlrml7jFUxiDWFZe~zPnOE6PfWtrgKrLFNkqK~FY8G0RzSdIqurL3GxHLR-CAZO0DG~N9XPikcGSzJa~Uc-jyJ-j5zcMHSviQVvW7QmIyQX7-Z30UNLiuUZD84EsV1YlUzDKRgeVl6CDGaHigKOgC92OL7qyrH~m6Ve6uaQ6WmPC4lknPyFSr76BPfPkm2nfpPPCU0HfceHqHv7WDYkE3zADe5XnsI6CAmIeQXUvIHEBJahIKjHW5pz1Vg64NCpEatRvFNCQyuGEjl2JgjJZLda1YI6436FqA6LdRsFnzZOtpQ__"
        alt="logo"
        className="absolute left-[calc(39%-250px)]  w-[572px] h-[573px] object-cover"
        style={{ filter: "grayscale(100%)" }}
      />
      <div className="absolute bottom-[65%] left-[40%] mt-16 mr-4 h-52 w-64 transform ">
        {" "}
        <img
          src="https://s3-alpha-sig.figma.com/img/46b4/ec58/f92a969bc1cb48d864d435ebd9d85984?Expires=1714953600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ZnIGhVI-0cmgU1MQWJMdPS5Cgq6Cr5gFsFDdPMwNJzSqRPrYj7o9HFURe8qaWGTanq6UReiJQqBhTo-rIjL6YNcbc0UM3x1Jj4tdKBsPm-cNtIWcVB0uk2nQjYBqfy7njN7MyygPsLvJSNHRH9I0LskLlSDY1UfzN~4~bdzIpcDhMJy-5gqDOvrxcFhSrS5O328NXMqSvD~CfP0I~XQZzSSKiBao77GGK9t7WHWQTfAcjRBnwt4ZfYbydlIL1C9RxCwCYZJdFs2fRFi9-b09MpGaXWZ4FD3V5Wkq4V5CYToZhsWzTKCQXRlwylsc~VzuzpTOYNMcAKQPIOP2sowKRg__"
          alt="doodle"
          style={{ filter: "grayscale(100%)" }}
        />
      </div>
      <div className="absolute top-[45%] right-[60%] mt-16 mr-4 h-64 w-64">
        {" "}
        <img
          src="https://s3-alpha-sig.figma.com/img/7f53/b3c5/7afb6e81e8e2f3fb0adce00afb7428a2?Expires=1714953600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=HnR4LAYRiNZP2aGNY4B84JEtrL4IYGqqTGcGn-gkmFlNJaMJYPVUxOIpzg8RwnCDtxic-YUSjeVPbb74l4dEsKHaihSAwQes6Rl4vnJY7Xo5z9CUQ5pain6M8gmkbwnPm5Z2X9EXM2axSmJuuGFpj23iDdq33tzAV8opOyjL1eCWP0vKxdYnEDAYj~pMMj6NJeTKWFgCQEpEifyxOIjxVb8IqKaHq-KF2Ny1zEmFazpH8Xs0CDUfwkqxrxOTlpkVz2GIkWTlTm-sKJlCko~S16AsH8cDTElIeV5vT3wbfNq6Jc8ENhUq8fp5XrS0px7P35vq6JYpq2Nu~EASWdYFTQ__"
          alt="ruloVert"
          style={{ filter: "grayscale(100%)" }}
        />
      </div>
      <div className="absolute top-64 left-[42%] mt-16 mr-4 h-60 w-60 transform scale-x-[-1]">
        {" "}
        <img
          src="https://s3-alpha-sig.figma.com/img/ab4f/00b4/5a447ab3464c1fb8fe0e6c2ae265c2a7?Expires=1714953600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=EH-5OvOKE6ZJAOXkX9qb0k0xe1L5uNDv3-By54Ra4GCl2SNG6Xzgr3G2LWxw8N--aw2ulISSRpA2~StZ4RyOw3z7jr88Nsk-Vg8eRKq8jpGQi30sw2M0wYN~U886sZOuuHkFYiYwySXKwUtYns4l4sdcTptpmr9UvxDcWpUt6smxnmof7LerH49iPCizYUHG6h5ADfRYIF7X0UHU928snz0n-AVkMw78v5~~F682f2z3qjatgL9qFialP6odU89oBc0FwXFqdfiLpJWVGpnkxK9Yq6GmSQb~Q2yuB8GX5oyJUddEXu4vRiOqzi3VmZ7Br8x-oJop0hOsDUGDegBqXg__"
          alt="ruloDiag"
          style={{ filter: "grayscale(100%)" }}
        />
      </div>
    </div>
  );
}
