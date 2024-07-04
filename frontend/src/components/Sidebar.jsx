import { useEffect, useState } from "react";

import logoimg from "../assets/Logo-img.png";
import archiveimg from "../assets/archive.svg";
import addbtn from "../assets/Add_ring_fill.svg";
import Event from "./Event";
import { useEventLog } from "../hooks/useEventLog";
import moment from "moment";

export default function Sidebar() {
  const [groupedEntries, setGroupedEntries] = useState({
    today: [],
    yesterday: [],
    last7Days: [],
    last30Days: [],
  });
  const [selected, setSelected] = useState(null);
  const { fetchLog } = useEventLog();

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

  return (
    <main className="min-h-screen flex w-full gap-80">
      <div className="bg-[#23202C] w-1/6">
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
                    <div
                      key={entry.created}
                      className="font-medium font-Inter w-full rounded-xl p-2 flex gap-4 items-center justify-between cursor-pointer truncate hover:bg-[#2E2E45] hover:text-[#f2e9e4] transition duration-200 ease-in-out"
                    >
                      {entry.title}
                    </div>
                  ))}

                  <h2>Yesterday</h2>
                  {groupedEntries.yesterday.map((entry) => (
                    <div
                      key={entry.created}
                      className="font-medium font-Inter w-full rounded-xl p-2 flex gap-4 items-center justify-between cursor-pointer truncate hover:bg-[#2E2E45] hover:text-[#f2e9e4] transition duration-200 ease-in-out"
                    >
                      {entry.title}
                    </div>
                  ))}

                  <h2>Last 7 Days</h2>
                  {groupedEntries.last7Days.map((entry) => (
                    <div
                      key={entry.created}
                      className="font-medium font-Inter w-full rounded-xl p-2 flex gap-4 items-center justify-between cursor-pointer truncate hover:bg-[#2E2E45] hover:text-[#f2e9e4] transition duration-200 ease-in-out"
                    >
                      {entry.title}
                    </div>
                  ))}

                  <h2>Last 30 Days</h2>
                  {groupedEntries.last30Days.map((entry) => (
                    <div
                      key={entry.created}
                      className="font-medium font-Inter w-full rounded-xl p-2 flex gap-4 items-center justify-between cursor-pointer truncate hover:bg-[#2E2E45] hover:text-[#f2e9e4] transition duration-200 ease-in-out"
                    >
                      {entry.title}
                    </div>
                  ))}
                </div>
              }
            </div>
          </div>

          <div className="w-5/6 flex flex-col gap-4 mb-4">
            <hr className="w-full" />
            <button className="text-[#22223b] bg-[#f2e9e4] text-lg tracking-tighter font-medium font-Inter w-full hover:bg-[#d6cdc8] hover:text-[#22223B] rounded-full p-2 text-ellipsis truncate transition duration-150 ease-in-out flex items-center justify-center gap-2">
              New Event <img src={addbtn} alt="" />
            </button>
          </div>
        </div>
      </div>
      <div className="w-5/6">
        <Event />
      </div>
    </main>
  );
}
