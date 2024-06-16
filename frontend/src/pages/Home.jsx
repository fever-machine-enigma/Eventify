import logobg from "../assets/Logo-bg-right.png";
import Sidebar from "../components/Sidebar";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
export default function Home() {
  const { firstName, lastName } = useContext(AuthContext);
  return (
    <body className="bg-[#22223B] relative min-h-screen overflow-hidden">
      <img src={logobg} className="absolute right-0" />
      <main className="">
        <Sidebar firstName={firstName} lastName={lastName} />
      </main>
    </body>
  );
}
