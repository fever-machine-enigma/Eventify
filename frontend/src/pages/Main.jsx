import { Link } from "react-router-dom";

import logoimg from "../assets/Logo-img.png";

export default function Main() {
  return (
    <body className="flex flex-col h-screen">
      <section className="h-4/5 w-full overflow-hidden">
        <img src="../../main-splash.png" alt="" className="" />
      </section>
      <section className="h-1/5 w-full bg-[#22223B] flex justify-between items-center px-20  overflow-hidden">
        <section className="w-1/2">
          <img src={logoimg} alt="" className="w-1/2" />
        </section>
        <section className="flex gap-10">
          <Link
            className="font-Inter text-[rgb(242,233,228)] bg-[rgb(97,97,150)] px-10 py-3 rounded-full hover:-translate-y-2 hover:drop-shadow-[0_5px_5px_rgba(242,233,228,1)] duration-100"
            to={`login`}
          >
            Log in
          </Link>
          <Link
            className="font-Inter text-[#F2E9E4] bg-[#338364] px-10 py-3 rounded-full hover:-translate-y-2 hover:drop-shadow-[0_5px_5px_rgba(242,233,228,1)] duration-100"
            to={`register`}
          >
            Sign Up
          </Link>
        </section>
      </section>
    </body>
  );
}
