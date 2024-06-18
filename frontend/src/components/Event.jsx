import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import {
  ArchiveBoxXMarkIcon,
  ChevronDownIcon,
  PencilIcon,
  Square2StackIcon,
  TrashIcon,
} from "@heroicons/react/16/solid";

import { useLogout } from "../hooks/useLogout";

import profileimg from "../assets/download.jpg";
import arrowup from "../assets/arrow.svg";

export default function Event({ userDesc, eventType }) {
  const { logout } = useLogout();

  const signout = () => {
    const success = logout();
    console.log(success);
    if (success) {
      navigate("login");
    }
  };

  return (
    <main className="w-full flex">
      <section className="w-4/5 h-screen flex flex-col justify-between gap-20">
        <div className="flex justify-center">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-7xl font-extrabold tracking-tighter font-Inter text-[#f2e9e4] mt-20">
              {eventType.evttype}
            </h1>
            <h4 className="text-3xl font-extrabold tracking-tighter font-Inter text-[#f2e9e4]">
              Event
            </h4>
          </div>
        </div>
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-4">
            <div className="flex gap-4 items-center">
              <img src={profileimg} className="w-10 h-10 rounded-full" />
              <h4 className="text-lg text-[#f2e9e4] font-Inter">You</h4>
            </div>
            <div>
              <p className="font-Inter text-[#f2e9e4]">{userDesc.evtdesc}</p>
            </div>
          </div>
          <div className="w-full mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Your news corpus"
                className="w-full p-6 rounded-full bg-black/0 ring-2 ring-[#f2e9e4] text-[#f2e9e4] font-Inter tracking-tight"
              />
              <button className="absolute right-1 bottom-1 bg-[#f2e9e4] hover:bg-[#dad1cd] rounded-full h-16 w-16 flex items-center justify-center">
                <img src={arrowup} alt="" />
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="w-1/5 flex flex-col items-start justify-between">
        <div className="ml-14 mr-6 mt-12 z-10">
          <Menu>
            <MenuButton className="inline-flex items-center gap-2 rounded-full text-sm/6 font-semibold text-white shadow-inner  focus:outline-none z-10">
              <div className="flex gap-2 items-center">
                <h1 className="font-Inter tracking-tighter text-lg font-normal text-[#f2e9e4]">
                  Shafin Rahman
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
                    <PencilIcon className="size-4 fill-white/30" />
                    Archive
                    <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-[focus]:inline">
                      ⌘E
                    </kbd>
                  </button>
                </MenuItem>
                <MenuItem>
                  <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-gray-500">
                    <Square2StackIcon className="size-4 fill-white/30" />
                    Settings
                    <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-[focus]:inline">
                      ⌘D
                    </kbd>
                  </button>
                </MenuItem>
                <div className="my-1 h-px bg-white/5" />
                <MenuItem>
                  <button
                    className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-red-500"
                    onClick={signout}
                  >
                    <ArchiveBoxXMarkIcon className="size-4 fill-white/30" />
                    Log out
                    <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-[focus]:inline">
                      ⌘A
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
