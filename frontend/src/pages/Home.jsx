import logobg from "../assets/Logo-bg-right.png";

export default function Home() {
  return (
    <body className="bg-[#22223B] relative min-h-screen overflow-hidden">
      <img src={logobg} className="absolute right-0" />
    </body>
  );
}
