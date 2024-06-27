import logobg from "../assets/Logo-bg-right.png";
import Sidebar from "../components/Sidebar";
import { useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  return (
    <body className="bg-[#22223B] relative min-h-screen overflow-hidden">
      <img src={logobg} className="absolute right-0" />
      <main className="">
        <Sidebar />
      </main>
    </body>
  );
}
