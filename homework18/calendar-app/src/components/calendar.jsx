import React, { useState, useEffect } from "react";

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
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  useEffect(() => {
    const date = new Date();
    setMonth(date.getMonth());
  }, []);

  useEffect(() => {
    const firstDay = new Date(year, month, 1).getDay();
    const lastDay = new Date(year, month + 1, 0).getDate();

    const daysInMonth = [];
    for (let i = 0; i < firstDay; i++) {
      daysInMonth.push("");
    }
    for (let i = 1; i <= lastDay; i++) {
      daysInMonth.push(i);
    }

    setMonthDays(daysInMonth);
  }, [year, month]);

  const handlePrevYear = () => setYear(year - 1);
  const handleNextYear = () => setYear(year + 1);
  const handlePrevMonth = () => setMonth(month === 0 ? 11 : month - 1);
  const handleNextMonth = () => setMonth(month === 11 ? 0 : month + 1);
  const checkToday = ((day)=>{
    // console.log("CALLED")
    const today = new Date();
    return day === today.getDate() && month === today.getMonth() && year === today.getFullYear() ;

  })

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 bg-zinc-900 rounded-lg shadow-lg shadow-blue-400 mt-10">
      <div className="flex justify-between items-center bg-gray-700 p-2 mb-4 rounded-md">
        <button
          onClick={handlePrevYear}
          className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm sm:text-base px-3 py-1.5 sm:px-5 sm:py-2.5 text-center dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
        >
          <i className="fa-solid fa-arrow-left"></i>
        </button>
        <span className="text-xl sm:text-3xl font-bold font-serif dark:text-purple-100">
          {year}
        </span>
        <button
          onClick={handleNextYear}
          className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm sm:text-base px-3 py-1.5 sm:px-5 sm:py-2.5 text-center dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
        >
          <i className="fa-solid fa-arrow-right"></i>
        </button>
      </div>

      {/* Month Selection */}
      <div className="flex justify-between items-center bg-slate-500 p-2 mb-4 rounded-md">
        <button
          onClick={handlePrevMonth}
          className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm sm:text-base px-3 py-1.5 sm:px-5 sm:py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
        >
          <i className="fa-solid fa-angles-left"></i>
        </button>
        <span className="text-lg sm:text-2xl font-bold font-serif dark:text-sky-900">
          {months[month]}
        </span>
        <button
          onClick={handleNextMonth}
          className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm sm:text-base px-3 py-1.5 sm:px-5 sm:py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
        >
          <i className="fa-solid fa-angles-right"></i>
        </button>
      </div>

      {/* Calendar Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr>
              {days.map((day, index) => (
                <th
                  key={index}
                  className="p-2 sm:p-4 text-sm sm:text-lg font-serif text-rose-900"
                >
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {monthDays.map((day, index) => {
              if (index % 7 === 0) {
                return (
                  <tr key={index}>
                    {monthDays.slice(index, index + 7).map((day, subIndex) => (
                      <td
                        key={subIndex}
                        className={`p-2 sm:p-4 text-sm sm:text-lg font-serif text-sky-500 text-center ${checkToday(day) ? "bg-yellow-300 text-black font-bold rounded-lg" : "text-sky-500"}`}
                      >
                        {day}
                      </td>
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
  );
}
