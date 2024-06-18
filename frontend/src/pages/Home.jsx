import logobg from "../assets/Logo-bg-right.png";
import Sidebar from "../components/Sidebar";
export default function Home() {
  return (
    <body className="bg-[#22223B] relative min-h-screen overflow-hidden">
      <img src={logobg} className="absolute right-0" />
      <main className="">
        <Sidebar />
      </main>
    </body>
  );
}
