import logobg from "../assets/Logo-bg-right.png";
import Sidebar from "../components/Sidebar";
import { useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

export default function Home() {
  return (
    <body className="bg-[#22223B] relative overflow-hidden">
      <img src={logobg} className="absolute h-auto left-52 -top-60" />
      <main className="">
        <Sidebar />
      </main>
    </body>
  );
}
