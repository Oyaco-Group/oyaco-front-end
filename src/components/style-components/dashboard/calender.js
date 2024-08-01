import React, { useState, useEffect } from "react";

const CalendarComponent = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [displayMonth, setDisplayMonth] = useState(
    today.toLocaleString("default", { month: "long" })
  );

  useEffect(() => {
    const newDate = new Date(currentYear, currentMonth);
    setDisplayMonth(newDate.toLocaleString("default", { month: "long" }));
  }, [currentMonth, currentYear]);

  const daysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysInCurrentMonth = daysInMonth(currentMonth, currentYear);

  const handlePrevMonth = () => {
    setCurrentMonth((prevMonth) => {
      const newMonth = prevMonth === 0 ? 11 : prevMonth - 1;
      setCurrentYear((prevYear) => (prevMonth === 0 ? prevYear - 1 : prevYear));
      return newMonth;
    });
  };

  const handleNextMonth = () => {
    setCurrentMonth((prevMonth) => {
      const newMonth = prevMonth === 11 ? 0 : prevMonth + 1;
      setCurrentYear((prevYear) =>
        prevMonth === 11 ? prevYear + 1 : prevYear
      );
      return newMonth;
    });
  };

  const renderCalendarDays = () => {
    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<td key={`empty-${i}`} className="pt-1"></td>);
    }

    for (let day = 1; day <= daysInCurrentMonth; day++) {
      const isToday =
        day === today.getDate() &&
        currentMonth === today.getMonth() &&
        currentYear === today.getFullYear();
      days.push(
        <td key={day} className="pt-1">
          <div className="px-1 py-1 cursor-pointer flex w-full justify-center">
            <p
              className={`text-xs ${
                isToday
                  ? "bg-blue-400 text-white rounded-full px-2 py-1.5"
                  : "text-gray-500 dark:text-gray-100"
              } font-medium`}
            >
              {day}
            </p>
          </div>
        </td>
      );
    }

    return days;
  };

  const renderCalendarRows = () => {
    const days = renderCalendarDays();
    const rows = [];
    let cells = [];

    days.forEach((day, i) => {
      if (i % 7 !== 0 || i === 0) {
        cells.push(day);
      } else {
        rows.push(<tr key={i}>{cells}</tr>);
        cells = [day];
      }
      if (i === days.length - 1) {
        rows.push(<tr key={`last-${i}`}>{cells}</tr>);
      }
    });

    return rows;
  };

  return (
    <div className="flex items-center justify-center py-2 px-2">
      <div className="w-1/2 h-72 py-4 px-4 shadow-lg rounded-3xl border">
        <div className="p-2 dark:bg-gray-800 bg-white rounded-t">
          <div className="flex items-center justify-between">
            <span
              tabIndex="0"
              className="focus:outline-none text-md font-semibold dark:text-gray-100 text-blue-400 mb-4"
            >
              {`${displayMonth} ${currentYear}`}
            </span>
            <div className="flex items-center">
              <button
                aria-label="calendar backward"
                onClick={handlePrevMonth}
                className="mb-4 focus:text-gray-400 hover:text-gray-400 text-gray-800 dark:text-gray-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-chevron-left"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <polyline points="15 6 9 12 15 18" />
                </svg>
              </button>
              <button
                aria-label="calendar forward"
                onClick={handleNextMonth}
                className="mb-4 focus:text-gray-400 hover:text-gray-400 ml-1 text-gray-800 dark:text-gray-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler  icon-tabler-chevron-right"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <polyline points="9 6 15 12 9 18" />
                </svg>
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between pt-2 overflow-x-auto">
            <table className="w-full h-full">
              <thead>
                <tr>
                  <th className="w-6">
                    <div className="flex justify-center">
                      <p className="text-xs font-medium text-center text-gray-800 dark:text-gray-100">
                        Mo
                      </p>
                    </div>
                  </th>
                  <th className="w-6">
                    <div className="flex justify-center">
                      <p className="text-xs font-medium text-center text-gray-800 dark:text-gray-100">
                        Tu
                      </p>
                    </div>
                  </th>
                  <th className="w-6">
                    <div className="flex justify-center">
                      <p className="text-xs font-medium text-center text-gray-800 dark:text-gray-100">
                        We
                      </p>
                    </div>
                  </th>
                  <th className="w-6">
                    <div className="flex justify-center">
                      <p className="text-xs font-medium text-center text-gray-800 dark:text-gray-100">
                        Th
                      </p>
                    </div>
                  </th>
                  <th className="w-6">
                    <div className="flex justify-center">
                      <p className="text-xs font-medium text-center text-gray-800 dark:text-gray-100">
                        Fr
                      </p>
                    </div>
                  </th>
                  <th className="w-6">
                    <div className="flex justify-center">
                      <p className="text-xs font-medium text-center text-gray-800 dark:text-gray-100">
                        Sa
                      </p>
                    </div>
                  </th>
                  <th className="w-6">
                    <div className="flex justify-center">
                      <p className="text-xs font-medium text-center text-gray-800 dark:text-gray-100">
                        Su
                      </p>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>{renderCalendarRows()}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarComponent;
