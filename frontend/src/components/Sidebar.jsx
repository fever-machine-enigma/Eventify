import { useEffect, useState } from "react";

import logoimg from "../assets/Logo-img.png";
import archiveimg from "../assets/archive.svg";
import addbtn from "../assets/Add_ring_fill.svg";
import { useEventLog } from "../hooks/useEventLog";
import moment from "moment";

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
import check from "../assets/Check_fill.svg";
import search from "../assets/File_dock_search_fill.svg";
import copy from "../assets/Copy.svg";
import question from "../assets/Question.svg";
import arrowup from "../assets/arrow.svg";
import { useNavigate } from "react-router-dom";
import { usePredict } from "../hooks/usePredict";

export default function Sidebar() {
  // Sidebar
  const [groupedEntries, setGroupedEntries] = useState({
    today: [],
    yesterday: [],
    last7Days: [],
    last30Days: [],
  });
  const [selected, setSelected] = useState(null);
  const { fetchLog } = useEventLog();
  const [clear, setClear] = useState();

  // Event Window
  const { logout } = useLogout();
  const { predict, error } = usePredict();
  const navigate = useNavigate();

  const [inputText, setInputText] = useState(null);
  const [inputDisplay, setInputDisplay] = useState(null);
  const [outputDisplay, setOutputDisplay] = useState(null);
  const [summary, setSummary] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [intro, setIntro] = useState(true);

  const signout = () => {
    const success = logout();
    if (success) {
      navigate("/login");
    }
  };

  useEffect(() => {
    const response = fetchLog();
    response.then((data) => {
      if (Array.isArray(data)) {
        const grouped = groupEntriesByDate(data);
        setGroupedEntries(grouped);
      } else {
        console.error("Fetched data is not an array", data);
      }
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user_id = localStorage.getItem("user_id");
    const token = localStorage.getItem("token");
    setIntro(false);
    setInputDisplay(inputText);
    setOutputDisplay(null);
    setSummary(null);
    setIsLoading(true);

    const input = inputText;
    try {
      const response = await predict(input, user_id, token);

      setOutputDisplay(response.result);
      setSummary(response.summary);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  const groupEntriesByDate = (entries) => {
    const today = moment().startOf("day");
    const yesterday = moment().subtract(1, "days").startOf("day");
    const last7Days = moment().subtract(7, "days").startOf("day");
    const last30Days = moment().subtract(30, "days").startOf("day");

    const groupedEntries = {
      today: [],
      yesterday: [],
      last7Days: [],
      last30Days: [],
    };

    entries.forEach((entry) => {
      const createdDate = moment(entry.created);

      if (createdDate.isSame(today, "d")) {
        groupedEntries.today.push(entry);
      } else if (createdDate.isSame(yesterday, "d")) {
        groupedEntries.yesterday.push(entry);
      } else if (createdDate.isAfter(last7Days)) {
        groupedEntries.last7Days.push(entry);
      } else if (createdDate.isAfter(last30Days)) {
        groupedEntries.last30Days.push(entry);
      }
    });

    return groupedEntries;
  };
  const selectEvent = (event) => {
    setSelected(event);
  };
  const handleNewEvent = () => {
    setIntro(true);
    setInputDisplay(null);
    setOutputDisplay(null);
    setSummary(null);
  };

  return (
    <main className="min-h-screen flex w-full gap-80">
      <div className="bg-[#23202C] w-1/5">
        <div className="flex flex-col h-screen justify-between items-center">
          <div className="flex flex-col items-center gap-2">
            <div className="w-3/4">
              <img src={logoimg} className="" />
            </div>
            <hr className="w-5/6" />
            <div className="w-full text-white font-Inter tracking-tighter ml-10">
              {
                <div className="w-5/6 flex flex-col gap-2">
                  <h2>Today</h2>
                  {groupedEntries.today.map((entry) => (
                    <li
                      key={entry.created}
                      className={`entry ${
                        selected === entry
                          ? "w-85% bg-[#303064] text-[#f2e9e4] rounded-full flex list-none"
                          : "w-85% text-[#F2E9E4] list-none"
                      }`}
                      onClick={() => selectEvent(entry)}
                    >
                      <div className="font-medium font-Inter w-full rounded-full p-2 flex gap-4 items-center justify-between cursor-pointer truncate hover:bg-[#303064] hover:text-[#f2e9e4] transition duration-200 ease-in-out ">
                        {entry.title}
                      </div>
                    </li>
                  ))}

                  <h2>Yesterday</h2>
                  {groupedEntries.yesterday.map((entry) => (
                    <li
                      key={entry.created}
                      className={`entry ${
                        selected === entry
                          ? "w-85% bg-[#303064] text-[#f2e9e4] rounded-full flex list-none"
                          : "w-85% text-[#F2E9E4] list-none"
                      }`}
                      onClick={() => selectEvent(entry)}
                    >
                      <div className="font-medium font-Inter w-full rounded-full px-2 py-4 flex gap-4 items-center justify-between cursor-pointer truncate hover:bg-[#303064] hover:text-[#f2e9e4] transition duration-200 ease-in-out ">
                        {entry.title}
                      </div>
                    </li>
                  ))}

                  <h2>Last 7 Days</h2>
                  {groupedEntries.last7Days.map((entry) => (
                    <li
                      key={entry.created}
                      className={`entry ${
                        selected === entry
                          ? "w-85% bg-[#303064] text-[#f2e9e4] rounded-full flex list-none"
                          : "w-85% text-[#F2E9E4] list-none"
                      }`}
                      onClick={() => selectEvent(entry)}
                    >
                      <div className="font-medium font-Inter w-full rounded-full p-2 flex gap-4 items-center justify-between cursor-pointer truncate hover:bg-[#303064] hover:text-[#f2e9e4] transition duration-200 ease-in-out ">
                        {entry.title}
                      </div>
                    </li>
                  ))}

                  <h2>Last 30 Days</h2>
                  {groupedEntries.last30Days.map((entry) => (
                    <li
                      key={entry.created}
                      className={`entry ${
                        selected === entry
                          ? "w-85% bg-[#303064] text-[#f2e9e4] rounded-full flex list-none"
                          : "w-85% text-[#F2E9E4] list-none"
                      }`}
                      onClick={() => selectEvent(entry)}
                    >
                      <div className="font-medium font-Inter w-full rounded-full p-2 flex gap-4 items-center justify-between cursor-pointer truncate hover:bg-[#303064] hover:text-[#f2e9e4] transition duration-200 ease-in-out ">
                        {entry.title}
                      </div>
                    </li>
                  ))}
                </div>
              }
            </div>
          </div>

          <div className="w-5/6 flex flex-col gap-4 mb-4">
            <hr className="w-full" />
            <button
              className="text-[#22223b] bg-[#f2e9e4] text-lg tracking-tighter font-medium font-Inter w-full hover:bg-[#d6cdc8] hover:text-[#22223B] rounded-full p-2 text-ellipsis truncate transition duration-150 ease-in-out flex items-center justify-center gap-2"
              onClick={handleNewEvent}
            >
              New Event <img src={addbtn} alt="" onClick={handleNewEvent} />
            </button>
          </div>
        </div>
      </div>
      <div className="w-5/6">
        <main className="w-full flex">
          <section className="w-4/5 h-screen flex flex-col justify-between gap-20">
            <div className=""></div>
            {intro && (
              <div className="flex flex-col gap-10 items-center text-white">
                <img src={logo} alt="" className="h-40 w-40" />
                <div className="flex gap-10">
                  <div className="border-2 border-[#f2e9e4]/40 h-32 w-60 flex flex-col rounded-3xl p-4 gap-1">
                    <img src={search} alt="" className="h-10 w-10" />
                    <p className="font-Inter tracking-tighter text-[#f2e9e4]/80">
                      Find the news you want to see the event of!
                    </p>
                  </div>
                  <div className="border-2 border-[#f2e9e4]/40 h-32 w-60 flex flex-col rounded-3xl p-4 gap-1">
                    <img src={copy} alt="" className="h-10 w-10" />
                    <p className="font-Inter tracking-tighter text-[#f2e9e4]/80">
                      Copy it to your clipboard and paste it below!
                    </p>
                  </div>
                  <div className="border-2 border-[#f2e9e4]/40 h-32 w-60 flex flex-col rounded-3xl p-4 gap-1">
                    <img src={check} alt="" className="h-10 w-10" />
                    <p className="font-Inter tracking-tighter text-[#f2e9e4]/80">
                      Hit enter and wait for the prediction to complete!
                    </p>
                  </div>
                </div>
              </div>
            )}
            <div className="flex flex-col gap-10">
              <div className="flex flex-col gap-4">
                {inputDisplay && (
                  <div className="flex flex-col gap-4">
                    <div className="flex gap-4 items-center">
                      <img
                        src={profileimg}
                        className="w-10 h-10 rounded-full"
                      />
                      <h4 className="text-lg text-[#f2e9e4] font-Inter">You</h4>
                    </div>
                    <div>
                      <p className="font-Inter text-[#f2e9e4] ml-14">
                        {inputDisplay}
                      </p>
                    </div>
                  </div>
                )}
                {outputDisplay ? (
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
                        {outputDisplay}
                      </p>
                      <p className="font-Inter text-[#f2e9e4] flex gap-2">
                        <span className="font-bold">Summary : </span>
                        {summary}
                      </p>
                    </div>
                  </div>
                ) : (
                  isLoading && (
                    <div className="flex flex-col gap-4">
                      <div className="flex gap-4 items-center">
                        <img src={logo} className="w-10 h-10 rounded-full" />
                        <h4 className="text-lg text-[#f2e9e4] font-Inter">
                          Ghotona Chitro
                        </h4>
                      </div>
                      <div className="ml-10">
                        <div class="flex space-x-2 justify-center items-center w-20 h-20dark:invert">
                          <span class="sr-only">Loading...</span>
                          <div class="h-2 w-2 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                          <div class="h-2 w-2 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                          <div class="h-2 w-2 bg-white rounded-full animate-bounce"></div>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>

              <div className="w-full mb-6">
                <form className="relative">
                  <input
                    type="text"
                    placeholder="Enter your news here...."
                    className="w-full p-6 rounded-full bg-black/0 ring-2 ring-[#f2e9e4] text-[#f2e9e4] font-Inter tracking-tight"
                    onChange={(e) => setInputText(e.target.value)}
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
          <section className="w-1/5 flex flex-col justify-around gap-[320px]">
            <div className="z-10 flex justify-center">
              <Menu>
                <MenuButton className="inline-flex items-center gap-2 rounded-full text-sm/6 font-semibold text-white shadow-inner focus:outline-none z-10">
                  <div className="hover:bg-[#9b92b6] px-4 py-2 rounded-full">
                    <h1 className="font-Inter tracking-tighter text-lg font-normal text-[#f2e9e4] text-nowrap">
                      {localStorage.getItem("first_name")}{" "}
                      {localStorage.getItem("last_name")}
                    </h1>
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
            <div></div>
            <div className="">
              <button className="bg-[#f2e9e4] p-3 ml-2 rounded-full">
                <img src={question} alt="" className="h-10 w-10" />
              </button>
            </div>
          </section>
        </main>
      </div>
    </main>
  );
}
