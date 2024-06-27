import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import {
  CogIcon,
  ArchiveBoxIcon,
  UserCircleIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/20/solid";

import { useLogout } from "../hooks/useLogout";

import profileimg from "../assets/download.jpg";
import logo from "../assets/Logo.svg";
import arrowup from "../assets/arrow.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Event() {
  const { logout } = useLogout();
  const [input, setInput] = useState("");
  const [display, setDisplay] = useState("");
  const [outputEvent, setOutputEvent] = useState("");
  const [outputSum, setOutputSum] = useState(null);
  const navigate = useNavigate();
  const signout = () => {
    const success = logout();
    if (success) {
      navigate("/login");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input) {
      setDisplay(input);
      setOutputEvent("হত্যা");
      setOutputSum(
        "গাজীপুরে ছেলে হত্যার বিচার চাইতে গিয়ে প্রতিপক্ষের মারধরে পোশাকশ্রমিক আসাদুল ইসলাম নিহত হয়েছেন। বুধবার দুপুরে স্থানীয় আলমগীর হোসেনের বাড়ির উঠানে এ ঘটনা ঘটে। পুলিশ ঘটনার তদন্ত করছে এবং আইনি ব্যবস্থা গ্রহণের প্রক্রিয়া চলছে।"
      );
    }
  };

  return (
    <main className="w-full flex">
      <section className="w-4/5 h-screen flex flex-col justify-between gap-20">
        <div className="flex justify-center"></div>
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-4">
            {input != "" && (
              <div className="flex flex-col gap-4">
                <div className="flex gap-4 items-center">
                  <img src={profileimg} className="w-10 h-10 rounded-full" />
                  <h4 className="text-lg text-[#f2e9e4] font-Inter">You</h4>
                </div>
                <div>
                  <p className="font-Inter text-[#f2e9e4] ml-14">{display}</p>
                </div>
              </div>
            )}
            {outputEvent && (
              <div className="flex flex-col gap-4">
                <div className="flex gap-4 items-center">
                  <img src={logo} className="w-10 h-10 rounded-full" />
                  <h4 className="text-lg text-[#f2e9e4] font-Inter">
                    Ghotona Chitro
                  </h4>
                </div>
                <div className="flex flex-col gap-4 ml-14">
                  <p className="font-Inter text-[#f2e9e4]">
                    <span className="font-bold">Event : </span>
                    {outputEvent}
                  </p>
                  <p className="font-Inter text-[#f2e9e4]">
                    <span className="font-bold">Summary : </span>
                    {outputSum}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="w-full mb-6">
            <form className="relative">
              <input
                type="text"
                placeholder="Enter your news here...."
                className="w-full p-6 rounded-full bg-black/0 ring-2 ring-[#f2e9e4] text-[#f2e9e4] font-Inter tracking-tight"
                onChange={(e) => setInput(e.target.value)}
              />
              <button
                className="absolute right-1 bottom-1 bg-[#f2e9e4] hover:bg-[#dad1cd] rounded-full h-16 w-16 flex items-center justify-center"
                onClick={handleSubmit}
              >
                <img src={arrowup} alt="" />
              </button>
            </form>
          </div>
        </div>
      </section>
      <section className="w-1/5 flex flex-col items-start justify-between">
        <div className="ml-14 mr-6 mt-12 z-10">
          <Menu>
            <MenuButton className="inline-flex items-center gap-2 rounded-full text-sm/6 font-semibold text-white shadow-inner  focus:outline-none z-10">
              <div className="flex gap-2 items-center">
                <h1 className="font-Inter tracking-tighter text-lg font-normal text-[#f2e9e4]">
                  {localStorage.getItem("first_name")}{" "}
                  {localStorage.getItem("last_name")}
                </h1>
                <img
                  src={profileimg}
                  alt=""
                  className="w-10 h-10 rounded-full"
                />
              </div>
            </MenuButton>
            <Transition
              enter="transition ease-out duration-75"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <MenuItems
                anchor="bottom end"
                className="font-Inter mt-3 w-52 origin-top-right rounded-xl border border-white/5 bg-white/5 p-1 text-sm/6 text-white [--anchor-gap:var(--spacing-1)] focus:outline-none"
              >
                <MenuItem>
                  <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-gray-500">
                    <UserCircleIcon className="size-5 fill-white/30" />
                    Profile
                    <kbd className="ml-auto hidden font-Inter text-xs text-white/50 group-data-[focus]:inline">
                      P
                    </kbd>
                  </button>
                </MenuItem>
                <MenuItem>
                  <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-gray-500">
                    <ArchiveBoxIcon className="size-5 fill-white/30" />
                    Archive
                    <kbd className="ml-auto hidden font-Inter text-xs text-white/50 group-data-[focus]:inline">
                      A
                    </kbd>
                  </button>
                </MenuItem>
                <MenuItem>
                  <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-gray-500">
                    <CogIcon className="size-5 fill-white/30" />
                    Settings
                    <kbd className="ml-auto hidden font-Inter text-xs text-white/50 group-data-[focus]:inline">
                      S
                    </kbd>
                  </button>
                </MenuItem>
                <div className="my-1 h-px bg-white/5" />
                <MenuItem>
                  <button
                    className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-red-500"
                    onClick={signout}
                  >
                    <ArrowTopRightOnSquareIcon className="size-5 fill-white/30 hover:fill-black" />
                    Log out
                    <kbd className="ml-auto hidden font-Inter text-xs text-white/50 group-data-[focus]:inline">
                      L
                    </kbd>
                  </button>
                </MenuItem>
              </MenuItems>
            </Transition>
          </Menu>
        </div>
        <button className="text-white bg-white ml-3 mb-7 p-3 rounded-full">
          <img src={arrowup} alt="" />
        </button>
      </section>
    </main>
  );
}
