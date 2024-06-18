import { useState } from "react";

import logoimg from "../assets/Logo-img.png";
import logobg from "../assets/Logo-bg.png";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";

export default function Login() {
  const { login, error, isLoading } = useLogin();
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(email, pwd);
    if (success) {
      navigate("/home");
    }
  };

  return (
    <body className="bg-[#22223B] relative min-h-screen overflow-hidden">
      <img src={logobg} alt="" className="absolute" />
      <main className="pb-4 pt-12 px-60 min-h-screen flex flex-col justify-center">
        <div id="logo" className="">
          <img src={logoimg} alt="logo" className="w-1/6" />
        </div>
        <div
          id="login-container"
          className="flex flex-1 justify-between items-center "
        >
          <div className="flex flex-col gap-1">
            <h1 className="text-5xl font-Inter font-semibold text-[#F2E9E4] tracking-tighter">
              আপনার অ্যাকাউন্টে লগ ইন করুন
            </h1>
            <h2 className="text-4xl font-Inter font-regular text-[#F2E9E4] tracking-tighter">
              Events, simplified at a glance.
            </h2>
          </div>
          <form
            id="login-box "
            className="pt-16 pb-5 px-10 w-1/3 bg-[#D9D9D9] flex flex-col items-center gap-12 rounded-3xl z-10"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col gap-12 w-full">
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                className="bg-[#D9D9D9] border-b-[1.5px] border-[#22223B] font-Inter text-2xl p-1 focus:outline-none tracking-tighter"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                name="pwd"
                placeholder="Password"
                className="bg-[#D9D9D9] border-b-[1.5px] border-[#22223B] font-Inter text-2xl p-1 focus:outline-none active:bg-[#D9D9D9] tracking-tighter"
                onChange={(e) => setPwd(e.target.value)}
              />
              {error && (
                <p className="text-red-600 text-xl font-Inter tracking-tight border-2 border-red-400/30 p-4 bg-red-400/30 ">
                  {error}
                </p>
              )}
            </div>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="styled-checkbox h-5 w-5 rounded-full text-indigo-600"
              />
              <span className="ml-2 text-gray-700 text-lg font-Inter tracking-tighter">
                Remember Me
              </span>
            </label>

            <button
              className="font-Inter bg-[#4A4E69] text-2xl w-1/2 text-[#F2E9E4] text-center p-3 rounded-full cursor-pointer"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "loading..." : "Login"}
            </button>

            <p className="tracking-tight text-lg">
              <span className="font-Inter text-[#22223B]/60">
                Don't have an account?
              </span>{" "}
              <Link to="/register" className="font-bold font-Inter">
                Sign Up
              </Link>
            </p>
          </form>
        </div>
        <footer>
          <p className="font-Inter text-md text-center font-regular text-[#F2E9E4] tracking-tight">
            &copy; 2024 Ghotona Chitro. All Rights Reserved
          </p>
        </footer>
      </main>
    </body>
  );
}
