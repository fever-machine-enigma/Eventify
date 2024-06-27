import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 3000); // Redirect after 3 seconds

    return () => clearTimeout(timer); // Clean up the timer on component unmount
  }, [navigate]);

  return (
    <div className="bg-[#22223b] flex flex-col min-h-screen justify-center items-center gap-4">
      <h1 className="font-Inter tracking-tighter text-3xl text-white">
        404 - Page Not Found
      </h1>
      <hr className="w-1/3" />
      <p className="font-Inter tracking-tighter text-xl text-white">
        You will be redirected to the home page in 3 seconds...
      </p>
    </div>
  );
};

export default NotFound;
