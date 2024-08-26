import React from "react";
import { useState, useEffect } from "react";

export default function Calendar() {
  const [year, setYear] = useState(2024);
  const [month, setMonth] = useState(0);
  const [monthDays, setMonthDays] = useState([]);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  useEffect(() => {
    const date = new Date();
    setMonth(date.getMonth());
  }, []);

  useEffect(() => {
    const firstDay = new Date(year, month, 1).getDay();
    const lastDay = new Date(year, month + 1, 0).getDate();
    console.log("LAST", lastDay);
    const daysInMonth = [];
    for (let i = 0; i < firstDay; i++) {
      daysInMonth.push("");
    }
    for (let i = 1; i <= lastDay; i++) {
      daysInMonth.push(i);
    }
    console.log(daysInMonth);
    setMonthDays(daysInMonth);
  }, [year, month]);

  const handlePrevYear = () => {
    setYear(year - 1);
  };
  const handleNextYear = () => {
    setYear(year + 1);
  };
  const handlePrevMonth = () => {
    if (month == 0) {
      setMonth(11);
    } else {
      setMonth(month - 1);
    }
  };
  const handleNextMonth = () => {
    if (month == 11) {
      setMonth(0);
    } else {
      setMonth(month + 1);
    }
  };

  return (
    <div className="text-center m-20 border-2 border-rose-200/100 shadow-lg shadow-blue-500 p-2 pb-20 bg-zinc-900">
      <div>
        <div className="flex justify-center bg-gray-700 p-2 mb-2">
          <button onClick={handlePrevYear} className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-0 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"><i class="fa-solid fa-arrow-left"></i></button>
          <span className="text-4xl font-bold font-serif dark:text-purple-100 px-20">{year}</span>
          <button onClick={handleNextYear} className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-0 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"><i class="fa-solid fa-arrow-right"></i></button>
        </div>
        <div className="flex justify-center bg-slate-500 p-2">
          <button onClick={handlePrevMonth} className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-0 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"><i class="fa-solid fa-angles-left"></i></button>
          <span className="text-2xl font-bold font-serif dark:text-sky-900 px-20">{months[month]}</span>
          <button onClick={handleNextMonth} className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-0 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"><i class="fa-solid fa-angles-right"></i></button>
        </div>
        <div className="flex justify-center p-2">
          <table>
            <thead>
              <tr>
                {days.map((day, index) => {
                  return <th key={index} className="p-5 text-xl font-serif text-rose-900">{day}</th>;
                })}
              </tr>
            </thead>
            <tbody>
              {monthDays.map((day, index) => {
                if (index % 7 === 0) {
                  return (
                    <tr key={index}>
                      {monthDays
                        .slice(index, index + 7)
                        .map((day, subIndex) => (
                          <td key={subIndex} className="p-2 text-lg font-serif text-sky-500">{day}</td>
                        ))}
                    </tr>
                  );
                }
                return null;
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
