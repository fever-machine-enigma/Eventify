import eventsDB from "../../db/events.json";
import Home from "../pages/Home";

import profileimg from "../assets/download.jpg";
import arrowup from "../assets/arrow.svg";

export default function Event({ userDesc, eventType }) {
  return (
    <main className="w-3/4 h-screen flex flex-col items-stretch justify-center gap-10">
      <div className="flex flex-col items-center justify-center text-align">
        <h1 className="text-7xl font-extrabold tracking-tighter font-Inter text-[#f2e9e4]">
          {eventType.evttype}
        </h1>
        <h4 className="text-3xl font-extrabold tracking-tighter font-Inter text-[#f2e9e4]">
          Event
        </h4>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4 items-center">
          <img src={profileimg} className="w-10 h-10 rounded-full" />
          <h4 className="text-lg text-[#f2e9e4] font-Inter">You</h4>
        </div>
        <div>
          <p className="font-Inter text-[#f2e9e4]">{userDesc.evtdesc}</p>
        </div>
      </div>
      <div className="w-full">
        <div className="relative">
          <input
            type="text"
            className="w-full p-6 rounded-full bg-black/0 ring-2 ring-[#f2e9e4] text-[#f2e9e4]"
          />
          <button className="absolute right-1 bottom-1 bg-[#f2e9e4] hover:bg-[#dad1cd] rounded-full h-16 w-16 flex items-center justify-center">
            <img src={arrowup} alt="" />
          </button>
        </div>
      </div>
    </main>
  );
}
