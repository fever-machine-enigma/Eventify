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
  MenuSeparator,
  Transition,
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogBackdrop,
  Switch,
} from "@headlessui/react";
import {
  CogIcon,
  ArchiveBoxIcon,
  UserCircleIcon,
  UserIcon,
  FireIcon,
  BeakerIcon,
  CubeTransparentIcon,
  CpuChipIcon,
  SparklesIcon,
  ChevronDownIcon,
  ArrowTopRightOnSquareIcon,
  PlusCircleIcon,
  PencilSquareIcon,
} from "@heroicons/react/20/solid";

import { useLogout } from "../hooks/useLogout";
import profileimg from "../assets/download.jpg";
import logo from "../assets/Logo.svg";
import check from "../assets/Check_fill.svg";
import search from "../assets/File_dock_search_fill.svg";
import copy from "../assets/Copy.svg";
import question from "../assets/Question.svg";
import arrowup from "../assets/arrow.svg";
import { Navigate, useNavigate } from "react-router-dom";
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
  const [enabled, setEnabled] = useState(false);

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
  let [isOpen, setIsOpen] = useState(false);

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  const signout = () => {
    const success = logout();
    if (success) {
      navigate("/");
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
  const selectEvent = (entry) => {
    setIntro(false);
    setInputDisplay(entry.corpus);
    setOutputDisplay(entry.event);
    setSummary(entry.summary);
  };
  const handleNewEvent = () => {
    setIntro(true);
    setInputDisplay(null);
    setOutputDisplay(null);
    setSummary(null);
  };

  return (
    <main className="flex">
      <div className="bg-[#23202C] w-1/6 fixed">
        <div className="flex flex-col h-screen justify-between items-center">
          <div className="flex flex-col items-center gap-2 overflow-auto">
            <div className="w-3/4">
              <img src={logoimg} className="" />
            </div>
            <hr className="w-5/6" />
            <div className="w-5/6 text-white font-Inter tracking-tighter overflow-auto scrollbar-custom">
              {
                <div className="w-6/7 flex flex-col gap-2 ">
                  <h2>Today</h2>
                  {groupedEntries.today.map((entry) => (
                    <li
                      key={entry.created}
                      className={`entry ${
                        selected === entry
                          ? "w-full bg-[#303064] text-[#f2e9e4] rounded-full flex list-none"
                          : "w-full text-[#F2E9E4] list-none"
                      }`}
                      onClick={() => {
                        selectEvent(entry);
                        selectEvent(entry);
                      }}
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
      <div className="w-1/6"></div>
      <div className="w-5/6 h-screen flex flex-col justify-between items-center">
        <div className="h-14  flex justify-between mr-10 items-center w-[1550px] mt-4">
          <div className="ml-4 z-10">
            <Menu>
              <MenuButton className="flex items-center gap-1 rounded-md text-[#f2e9e4] text-xl p-2 font-Inter tracking-tighter font-semibold shadow-inner hover:bg-[#35355c]">
                ঘটনাচিত্র
                <ChevronDownIcon className="size-4 fill-white/60" />
              </MenuButton>
              <MenuItems
                transition
                anchor="bottom start"
                className="font-Inter mt-2 w-80 origin-center rounded-xl border border-white/5 bg-[#2c2c47] p-1 text-sm/6 text-white [--anchor-gap:var(--spacing-1)] focus:outline-none z-10"
              >
                <MenuItem>
                  <button className="group flex w-full items-center gap-4 rounded-lg p-4 data-[focus]:bg-white/10">
                    <FireIcon className="size-8 fill-white/30" />
                    <div className="flex flex-col items-start text-nowrap">
                      <p className="font-bold">
                        Transformer (Work In Progress)
                      </p>
                      <p className="">Our smartest model yet!</p>
                    </div>
                  </button>
                </MenuItem>
                <MenuItem>
                  <button className="group flex w-full items-center gap-4 rounded-lg p-4 data-[focus]:bg-white/10">
                    <SparklesIcon className="size-8 fill-white/30" />
                    <div className="flex flex-col items-start text-nowrap">
                      <p className="font-bold">CNN (Recommended)</p>
                      <p className="">Great for everyday uses.</p>
                    </div>
                  </button>
                </MenuItem>
                <MenuItem>
                  <button className="group flex w-full items-center gap-4 rounded-lg p-4 data-[focus]:bg-white/10">
                    <CubeTransparentIcon className="size-8 fill-white/30" />
                    <div className="flex flex-col items-start text-nowrap">
                      <p className="font-bold">Bi-directional LSTM</p>
                      <p className="">Works just as well.</p>
                    </div>
                  </button>
                </MenuItem>
                <MenuItem>
                  <button className="group flex w-full items-center gap-4 rounded-lg p-4 data-[focus]:bg-white/10">
                    <CpuChipIcon className="size-8 fill-white/30" />
                    <div className="flex flex-col items-start text-nowrap">
                      <p className="font-bold">LSTM</p>
                      <p className="">First model we ever worked on.</p>
                    </div>
                  </button>
                </MenuItem>
                <MenuSeparator className="my-1 h-px bg-[#6c6c99]" />
                <MenuItem>
                  <div className="group flex w-full items-center gap-4 rounded-lg p-4 data-[focus]:bg-white/10">
                    <UserIcon className="size-8 fill-white/30" />
                    <div className="flex  items-start text-nowrap gap-14">
                      <p className="font-bold">Turn on Incognito</p>
                      <Switch
                        checked={enabled}
                        onChange={setEnabled}
                        className="group relative flex h-7 w-14 cursor-pointer rounded-full bg-white/10 p-1 transition-colors duration-200 ease-in-out focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[checked]:bg-white/10"
                      >
                        <span
                          aria-hidden="true"
                          className="pointer-events-none inline-block size-5 translate-x-0 rounded-full bg-white ring-0 shadow-lg transition duration-200 ease-in-out group-data-[checked]:translate-x-7"
                        />
                      </Switch>
                    </div>
                  </div>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
          <div className="z-10 flex justify-center">
            <Menu>
              <MenuButton className="inline-flex items-center gap-2 rounded-full text-sm/6 font-semibold text-white shadow-inner focus:outline-none z-10">
                <div className="hover:bg-[#35355c] px-4 py-2 rounded-full">
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
                  className="font-Inter mt-3 w-52 origin-top-right rounded-xl border border-white/5 bg-white/5 p-1 text-sm/6 text-white [--anchor-gap:var(--spacing-1)] focus:outline-none z-10"
                >
                  <MenuItem>
                    <button
                      className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-gray-500"
                      onClick={open}
                    >
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
            <Dialog
              open={isOpen}
              as="div"
              className="relative z-10 focus:outline-none"
              onClose={close}
            >
              <DialogBackdrop className="fixed inset-0 bg-black/30" />
              <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4">
                  <DialogPanel
                    transition
                    className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                  >
                    <DialogTitle
                      as="h3"
                      className="text-2xl font-medium font-Inter tracking-tighter text-white mb-6"
                    >
                      Manage your profile
                    </DialogTitle>
                    <div className="flex flex-col gap-4 items-center">
                      <div className=" relative">
                        <img
                          src={profileimg}
                          alt=""
                          className="h-32 w-32 rounded-full"
                        />
                        <PlusCircleIcon className="h-8 w-8 text-[#f2e9e4] rounded-full absolute bottom-1 right-1" />
                      </div>
                      <div className="flex gap-4 w-full">
                        <p className="mt-2 text-sm/6 text-white/50 font-Inter tracking-tighter">
                          First Name:
                        </p>
                        <input type="text" className="rounded-full " />
                        <button className="cursor-pointer z-20">
                          <PencilSquareIcon className="h-6 w-6 text-white" />
                        </button>
                      </div>
                      <div className="flex gap-4 w-full">
                        <p className="mt-2 text-sm/6 text-white/50 font-Inter tracking-tighter">
                          Last Name:
                        </p>
                        <input type="text" className="rounded-full" />
                        <button className="">
                          <PencilSquareIcon className="h-6 w-6 text-white" />
                        </button>
                      </div>
                    </div>
                    <div className="mt-4">
                      <Button
                        className="inline-flex items-center gap-2 rounded-full bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700 font-Inter tracking-tighter"
                        onClick={close}
                      >
                        Save
                      </Button>
                    </div>
                  </DialogPanel>
                </div>
              </div>
            </Dialog>
          </div>
        </div>
        <div className="h-auto flex z-10 overflow-auto">
          <div className="mx-40">
            <div className="flex">
              <div className="flex w-full">
                <section className="flex flex-col justify-between gap-20 w-full">
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
                  <div className="flex flex-col gap-10 overflow-hidden">
                    <div className="flex flex-col gap-4 ">
                      {inputDisplay && (
                        <div className="flex flex-col gap-4">
                          <div className="flex gap-4 items-center">
                            <img
                              src={profileimg}
                              className="w-10 h-10 rounded-full"
                            />
                            <h4 className="text-lg text-[#f2e9e4] font-Inter">
                              You
                            </h4>
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
                          <div className="flex items-center">
                            <img src={logo} className="w-14 h-14" />
                            <h4 className="text-lg text-[#f2e9e4] font-Inter mt-2">
                              Ghotona Chitro
                            </h4>
                          </div>
                          <div className="flex flex-col gap-4 ml-14">
                            <p className="font-Inter text-[#f2e9e4]">
                              <span className="font-bold">Event: </span>
                              {outputDisplay}
                            </p>
                            <p className="font-Inter text-[#f2e9e4] flex gap-2">
                              <span className="font-bold">Summary: </span>
                              {summary}
                            </p>
                          </div>
                        </div>
                      ) : (
                        isLoading && (
                          <div className="flex flex-col gap-4">
                            <div className="flex gap-4 items-center">
                              <img
                                src={logo}
                                className="w-10 h-10 rounded-full"
                              />
                              <h4 className="text-lg text-[#f2e9e4] font-Inter">
                                Ghotona Chitro
                              </h4>
                            </div>
                            <div
                              className="ml-10 mt-4 animate-bounce flex flex-col gap-4"
                              role="status"
                            >
                              <div class="h-2.5 bg-gray-200 rounded-full dark:bg-[#61619b] w-1/2 ml-4 animate-pulse"></div>
                              <div class="h-2.5  bg-gray-200 rounded-full dark:bg-[#61619b] w-full ml-4 animate-pulse"></div>
                              <div class="h-2.5  bg-gray-200 rounded-full dark:bg-[#61619b] w-3/4 ml-4 animate-pulse"></div>
                              <div class="h-2.5  bg-gray-200 rounded-full dark:bg-[#61619b] w-1/3 ml-4 animate-pulse"></div>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-36 flex justify-center">
          <div className="h-auto w-2/4 fixed bottom-4">
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
      </div>
    </main>
  );
}
