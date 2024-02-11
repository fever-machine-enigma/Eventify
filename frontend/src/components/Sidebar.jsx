import { useEffect, useState } from "react";
import { format, isToday, isYesterday, differenceInDays } from "date-fns";

import logoimg from "../assets/Logo-img.png";
import archiveimg from "../assets/archive.svg";
import eventsDB from "../../db/events.json";

export default function Sidebar() {
  const [events, setEvents] = useState([]);
  const [selected, setSelected] = useState(null);
  const [userDesc, setUserDesc] = useState("");
  const [eventType, setEventType] = useState("");

  useEffect(() => {
    setEvents(eventsDB);
  }, []);

  const groupItemsByTime = () => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const lastWeek = new Date(today);
    lastWeek.setDate(today.getDate() - 7);

    const groupedItems = {
      Today: [],
      Yesterday: [],
      "Last Week": [],
    };

    events.forEach((event) => {
      const createdAt = new Date(event.created);
      if (isToday(createdAt)) {
        groupedItems["Today"].push(event);
      } else if (isYesterday(createdAt)) {
        groupedItems["Yesterday"].push(event);
      } else if (differenceInDays(today, createdAt) <= 7) {
        groupedItems["Last Week"].push(event);
      }
    });

    return groupedItems;
  };

  const selectEvent = (event) => {
    setSelected(event);
  };

  const displayEventsByTime = () => {
    const groupedItems = groupItemsByTime();

    return Object.entries(groupedItems).map(([time, events]) => {
      return (
        <div key={time} className="">
          <h3 className="text-[#F2E9E4] text-md font-Inter ml-4 mt-2">
            {time}
          </h3>
          <ul>
            {events.map((event, index) => (
              <li
                key={index}
                className={`event ${
                  selected === event
                    ? "my-2 w-5/6 bg-[#F2E9E4] text-[#22223B]"
                    : "my-2 w-5/6"
                }`}
                onClick={() => selectEvent(event)}
              >
                <div className="text-[#F2E9E4] text-lg font-medium font-Inter ml-6 w-full hover:bg-[#F2E9E4] hover:text-[#22223B] rounded-full px-4 py-2 flex gap-4 items-center justify-between cursor-pointer">
                  {event.evtname}
                  {selected && (
                    <button>
                      <img src={archiveimg} alt="" />
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      );
    });
  };

  return (
    <main className="bg-[#23202C] w-80 min-h-screen">
      <div className="flex flex-col items-center">
        <div className="w-3/4">
          <img src={logoimg} className="" />
        </div>
        <hr />
        <div className="w-full">{displayEventsByTime()}</div>
        <hr />
        <div>
          <button className="text-[#F2E9E4] text-lg font-medium font-Inter w-full hover:bg-[#F2E9E4] hover:text-[#22223B] rounded-full p-2 text-ellipsis truncate">
            New Event
          </button>
        </div>
      </div>
    </main>
  );
}
