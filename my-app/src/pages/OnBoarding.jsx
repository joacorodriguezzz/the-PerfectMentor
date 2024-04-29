import React from "react";
import miImagen from "../components/img/thePerfectMentor.png";
import { Link } from "react-router-dom";

function OnBoarding() {
  return (
    <div className="bg-customGreen min-h-screen flex justify-center items-center relative font-sans">
      {/* Div con bordes negros en el centro */}
      <div className="border-2 border-black p-4 flex items-center md:w-[1000px] h-[600px] rounded-3xl relative overflow-hidden">
        {/* Imagen dentro del div */}
        <img
          src={miImagen}
          alt="thePerfectMentor"
          className="absolute top-[20%] left-[55%] h-[160px] w-[300px]"
        />

        {/* Botones debajo de la imagen */}
        <div className="absolute top-[55%] left-[55%]">
          {/* Botón Sign Up */}
          <Link to="/signUp">
            <button className="bg-gray-800 text-white py-2 px-4 rounded-full mb-4 block w-[360px] h-[50px] font-sans">
              Sign Up
            </button>
          </Link>

          {/* Botón Log In */}
          <Link to="/logIn">
            <button className="bg-customGreen text-white py-2 px-4 rounded-full block border border-black w-[360px] h-[50px] font-sans">
              Log In
            </button>
          </Link>
        </div>
      </div>

      {/* Imagen superpuesta */}
      <img
        src="https://tempus.media/images/contact.png"
        alt="Mentor"
        className="absolute left-[calc(36%-300px)]  w-[600px] h-[600px] object-cover hidden md:block"
        style={{ filter: "grayscale(100%)" }}
      />
      <div className="absolute bottom-[55%] left-[70%] mt-16 mr-4 h-52 w-64 transform hidden md:block">
        {" "}
        <img
          src="https://s3-alpha-sig.figma.com/img/46b4/ec58/f92a969bc1cb48d864d435ebd9d85984?Expires=1714953600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ZnIGhVI-0cmgU1MQWJMdPS5Cgq6Cr5gFsFDdPMwNJzSqRPrYj7o9HFURe8qaWGTanq6UReiJQqBhTo-rIjL6YNcbc0UM3x1Jj4tdKBsPm-cNtIWcVB0uk2nQjYBqfy7njN7MyygPsLvJSNHRH9I0LskLlSDY1UfzN~4~bdzIpcDhMJy-5gqDOvrxcFhSrS5O328NXMqSvD~CfP0I~XQZzSSKiBao77GGK9t7WHWQTfAcjRBnwt4ZfYbydlIL1C9RxCwCYZJdFs2fRFi9-b09MpGaXWZ4FD3V5Wkq4V5CYToZhsWzTKCQXRlwylsc~VzuzpTOYNMcAKQPIOP2sowKRg__"
          alt="doodle"
          style={{ filter: "grayscale(100%)" }}
        />
      </div>
      <div className="absolute top-[20%] right-[69%] mt-16 mr-4 h-64 w-64 hidden md:block">
        {" "}
        <img
          src="https://s3-alpha-sig.figma.com/img/7f53/b3c5/7afb6e81e8e2f3fb0adce00afb7428a2?Expires=1714953600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=HnR4LAYRiNZP2aGNY4B84JEtrL4IYGqqTGcGn-gkmFlNJaMJYPVUxOIpzg8RwnCDtxic-YUSjeVPbb74l4dEsKHaihSAwQes6Rl4vnJY7Xo5z9CUQ5pain6M8gmkbwnPm5Z2X9EXM2axSmJuuGFpj23iDdq33tzAV8opOyjL1eCWP0vKxdYnEDAYj~pMMj6NJeTKWFgCQEpEifyxOIjxVb8IqKaHq-KF2Ny1zEmFazpH8Xs0CDUfwkqxrxOTlpkVz2GIkWTlTm-sKJlCko~S16AsH8cDTElIeV5vT3wbfNq6Jc8ENhUq8fp5XrS0px7P35vq6JYpq2Nu~EASWdYFTQ__"
          alt="ruloVert"
          style={{ filter: "grayscale(100%)" }}
        />
      </div>
      <div className="absolute top-4 left-[50%] mt-16 mr-4 h-44 w-44 hidden md:block">
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

export default OnBoarding;
