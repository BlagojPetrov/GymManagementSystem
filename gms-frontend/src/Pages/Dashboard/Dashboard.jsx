import React, { useState, useEffect, useRef } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import ErrorIcon from "@mui/icons-material/Error";
import ReportIcon from "@mui/icons-material/Report";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [accordianDashboard, setAccordianDashboard] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const ref = useRef();

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (
        accordianDashboard &&
        ref.current &&
        !ref.current.contains(e.target)
      ) {
        setAccordianDashboard(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [accordianDashboard]);

  useEffect(() => {
    setShowPopup(true);
    const timer = setTimeout(() => {
      setShowPopup(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleOnClickMenu = (value) => {
    sessionStorage.setItem("func", value);
  };

  const cardData = [
    {
      icon: <GroupIcon sx={{ color: "green", fontSize: "50px" }} />,
      label: "Приклучени Членови",
      path: "/member",
      storageValue: "joinedMembers",
    },
    {
      icon: <SignalCellularAltIcon sx={{ color: "blue", fontSize: "50px" }} />,
      label: "Месечно Приклучени",
      path: "/specific/monthly",
      storageValue: "monthly",
    },
    {
      icon: <AccessAlarmIcon sx={{ color: "red", fontSize: "50px" }} />,
      label: "Истекуваат за 3 дена",
      path: "/specific/expiring-3days",
      storageValue: "expiring3days",
    },
    {
      icon: <AccessAlarmIcon sx={{ color: "orange", fontSize: "50px" }} />,
      label: "Истекуваат за 4-7 дена",
      path: "/specific/expiring-4-7days",
      storageValue: "expiring4to7days",
    },
    {
      icon: <ErrorIcon sx={{ color: "red", fontSize: "50px" }} />,
      label: "Истечени",
      path: "/specific/expired",
      storageValue: "expired",
    },
    {
      icon: <ReportIcon sx={{ color: "brown", fontSize: "50px" }} />,
      label: "Неактивни членови",
      path: "/specific/inactive",
      storageValue: "inactive",
    },
  ];

  return (
    <div className="w-3/4 text-black p-5 relative">
      {/* Header */}
      <div className="w-full bg-slate-900 text-white rounded-lg flex p-3 justify-between items-center shadow-lg">
        <MenuIcon
          sx={{ cursor: "pointer" }}
          onClick={() => setAccordianDashboard((prev) => !prev)}
        />
        <PersonIcon />
      </div>

      {/* Dropdown Info */}
      {accordianDashboard && (
        <div
          ref={ref}
          className="absolute p-4 bg-slate-900 text-white rounded-xl text-base font-light mt-2 z-40 shadow-md"
        >
          <div className="mb-1 font-semibold">
            Добредојдовте во системот за управување со фитнес центар!
          </div>
          <p className="text-sm">
            Слободно прашајте било какви прашања или разгледајте го панелот.
          </p>
        </div>
      )}

      {/* Dashboard Cards */}
      <div className="mt-6 pt-4 bg-slate-100 bg-opacity-60 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full pb-6 px-2 h-[80%] overflow-y-auto rounded-lg">
        {cardData.map((card, idx) => (
          <Link
            to={card.path}
            key={idx}
            className="w-full h-fit border-gray-300 bg-white rounded-xl shadow-md cursor-pointer hover:shadow-lg transition duration-300"
            onClick={() => handleOnClickMenu(card.storageValue)}
          >
            <div className="h-2 rounded-t-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
            <div className="py-7 px-5 flex-col justify-center items-center w-full text-center rounded-b-lg hover:bg-slate-900 hover:text-white">
              {card.icon}
              <p className="my-3 font-medium text-lg">{card.label}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Footer Help Message */}
      <div
        className={`md:bottom-4 p-3 w-max max-w-full mb-4 md:mb-0 absolute bg-black bg-opacity-90 text-white mt-20 rounded-lg shadow-md text-center text-sm md:text-base whitespace-nowrap left-1/2 transform -translate-x-1/2
          transition-opacity duration-700 ease-in-out
          ${
            showPopup
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-5 pointer-events-none"
          }
        `}
        style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)" }}
      >
        За технички проблеми контактирајте developer на{" "}
        <a
          href="tel:+070123456"
          className="hover:text-gray-400 underline transition-colors duration-200"
        >
          +070123456
        </a>
      </div>
    </div>
  );
};

export default Dashboard;
