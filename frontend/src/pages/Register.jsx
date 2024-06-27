import logobg from "../assets/Logo-bg-right.png";
import logoimg from "../assets/Logo-img.png";
import { useState } from "react";
import { useRegister } from "../hooks/useRegister";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { register, error, isLoading } = useRegister();
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirm_password] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = await register(
      first_name,
      last_name,
      email,
      password,
      confirm_password
    );
    if (success) {
      navigate("/home");
    }
  };

  return (
    <body className="bg-[#22223B] relative min-h-screen overflow-hidden">
      <section className="flex justify-end">
        <img src={logobg} alt="" className="absolute" />
      </section>
      <div
        id="register-container"
        className="flex h-screen justify-center items-center gap-10 "
      >
        <form
          id="register-box"
          className="pt-16 pb-5 px-10 w-1/3 bg-[#D9D9D9] flex flex-col items-center gap-12 rounded-3xl z-10"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-10 w-full">
            <input
              type="text"
              name="first_name"
              placeholder="First Name"
              className="bg-[#D9D9D9] border-b-[1.5px] border-[#22223B] font-Inter text-2xl p-1 focus:outline-none hover:drop-shadow-[0_4px_5px_rgba(86, 141, 209, 0.8)]  tracking-tighter"
              required
              onChange={(e) => {
                setFirst_name(e.target.value);
              }}
            />
            <input
              type="text"
              name="last_name"
              placeholder="Last Name"
              className="bg-[#D9D9D9] border-b-[1.5px] border-[#22223B] font-Inter text-2xl p-1 focus:outline-none tracking-tighter"
              required
              onChange={(e) => {
                setLast_name(e.target.value);
              }}
            />
            <div className="">
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                className="bg-[#D9D9D9] border-b-[1.5px] border-[#22223b] font-Inter text-2xl p-1 focus:outline-none tracking-tighter invalid:border-[rgba(255,27,27,0.8)] invalid:border-b-[3px] w-full"
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>

            <input
              type="password"
              name="password"
              placeholder="Password"
              className="bg-[#D9D9D9] border-b-[1.5px] border-[#22223B] font-Inter text-2xl p-1 focus:outline-none active:bg-[#D9D9D9]  tracking-tighter"
              required
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <input
              type="password"
              name="confirm_password"
              placeholder="Confirm Password"
              className="bg-[#D9D9D9] border-b-[1.5px] border-[#22223B] font-Inter text-2xl p-1 focus:outline-none active:bg-[#D9D9D9]  tracking-tighter"
              onChange={(e) => {
                setConfirm_password(e.target.value);
              }}
            />
            {error && (
              <p className="text-red-600 text-xl font-Inter tracking-tight border-2 border-red-400/30 p-4 bg-red-400/30 ">
                {error}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-4">
            <label className="inline-flex">
              <input type="checkbox" className="h-4 w-4 text-indigo-600" />
              <span className="ml-2 text-gray-700 text-md font-Inter tracking-tighter">
                I agree to all of the terms of conditions and privacy policies
                of Ghotona Chitro.
              </span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 rounded-full text-indigo-600"
              />
              <span className="ml-2 text-gray-700 textmd font-Inter tracking-tighter">
                I want to receive newsletters from Ghotona Chitro.
              </span>
            </label>
          </div>
          <button
            className="font-Inter bg-[#338364]  text-2xl w-1/2 text-[#F2E9E4] text-center p-3 rounded-full cursor-pointer z-5 disabled:bg-gray-700"
            type="submit"
            disabled={isLoading}
          >
            Register
          </button>
        </form>
        <div className="flex flex-col justify-evenly h-full w-1/3">
          <div className="">
            <img src={logoimg} className="" />
          </div>
          <div className="">
            <h1 className="font-Inter font-bold tracking-tighter text-4xl text-[#F2E9E4] text-wrap">
              Create an account to use Ghotona Chitro to its utmost ability!
            </h1>
          </div>
          <div className="bg-[#D9D9D9] rounded-3xl px-6 py-4 ">
            <h1 className="font-Inter text-2xl tracking-tighter">
              Your password should have
            </h1>
            <ul className="font-Inter tracking-tight list-disc p-2">
              <li>At least one lowercase alphabet i.e [a-z]</li>
              <li>At least one uppercase alphabet i.e. [A-Z]</li>
              <li>At least one numeric digit i.e. [0-9]</li>
              <li>
                At least one special character i.e. [‘@’, ‘$’, ‘.’, ‘#’, ‘!’,
                ‘%’, ‘*’, ‘?’, ‘&’, ‘^’]
              </li>
              <li>Total characters should be (8-12)</li>
            </ul>
          </div>
        </div>
      </div>
    </body>
  );
};

export default Register;
