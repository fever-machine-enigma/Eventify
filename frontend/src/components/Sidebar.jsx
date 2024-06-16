import { useEffect, useState } from "react";
import { format, isToday, isYesterday, differenceInDays } from "date-fns";
import { AuthContext } from "../context/AuthContext";

import logoimg from "../assets/Logo-img.png";
import archiveimg from "../assets/archive.svg";
import addbtn from "../assets/Add_ring_fill.svg";
import eventsDB from "../../db/events.json";
import Event from "./Event";

export default function Sidebar({ firstName, lastName }) {
  const [events, setEvents] = useState([]);
  const [selected, setSelected] = useState(null);
  const [userDesc, setUserDesc] = useState([]);
  const [eventType, setEventType] = useState([]);

  useEffect(() => {
    setEvents(eventsDB);
  }, []);

  const selectDesc = (event) => {
    setUserDesc(event);
  };
  const selectType = (event) => {
    setEventType(event);
  };

  const groupItemsByTime = () => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const lastWeek = new Date(today);
    lastWeek.setDate(today.getDate() - 7);
    const lastMonth = new Date(today);
    lastMonth.setDate(today.getDate() - 31);

    const groupedItems = {
      Today: [],
      Yesterday: [],
      "Last Week": [],
      "Last Month": [],
    };

    events.forEach((event) => {
      const createdAt = new Date(event.created);
      if (isToday(createdAt)) {
        groupedItems["Today"].push(event);
      } else if (isYesterday(createdAt)) {
        groupedItems["Yesterday"].push(event);
      } else if (differenceInDays(today, createdAt) <= 7) {
        groupedItems["Last Week"].push(event);
      } else if (differenceInDays(today, createdAt) <= 31) {
        groupedItems["Last Month"].push(event);
      }
    });

    return groupedItems;
  };

  const selectEvent = (event) => {
    setSelected(event);
  };

  const truncatedTab = ({ text, maxLength }) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    } else {
      return text;
    }
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
                    ? "my-2 ml-2 w-85% bg-[#2E2E45] text-[#f2e9e4] text-lg rounded-full flex"
                    : "my-2 ml-2 w-85% text-[#F2E9E4]"
                }`}
                onClick={() => {
                  selectEvent(event);
                  selectDesc(event);
                  selectType(event);
                }}
              >
                <div className="text-lg font-medium font-Inter w-full rounded-full px-4 py-2 flex gap-4 items-center justify-between cursor-pointer truncate hover:bg-[#2E2E45] hover:text-[#f2e9e4] transition duration-200 ease-in-out truncate">
                  {event.evtname}
                  <button
                    className={`${selected === event ? "block" : "hidden"}`}
                  >
                    <img
                      src={archiveimg}
                      className="rounded-full w-6 h-6 text-white"
                    />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      );
    });
  };

  return (
    <main className="min-h-screen flex">
      <div className="bg-[#23202C] w-1/6">
        <div className="flex flex-col justify-end overflow-hidden items-center">
          <div className="flex flex-col items-center gap-2">
            <div className="w-3/4">
              <img src={logoimg} className="" />
            </div>
            <hr className="w-5/6" />
            <div className="w-full">{displayEventsByTime()}</div>
          </div>

          <div className="w-5/6 flex flex-col gap-4">
            <hr className="w-full" />
            <button className="text-[#22223b] bg-[#f2e9e4] text-lg font-medium font-Inter w-full hover:bg-[#d6cdc8] hover:text-[#22223B] rounded-full p-2 text-ellipsis truncate transition duration-150 ease-in-out flex items-center justify-center gap-2">
              New Event <img src={addbtn} alt="" />
            </button>
          </div>
        </div>
      </div>
      <div className="w-5/6">
        <Event
          userDesc={userDesc}
          eventType={eventType}
          firstName={firstName}
          lastName={lastName}
        />
      </div>
    </main>
  );
}
