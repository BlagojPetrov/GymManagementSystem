import React, { useState, useEffect } from "react";
import HomeIcon from "@mui/icons-material/Home";
import GroupIcon from "@mui/icons-material/Group";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="w-1/4 min-h-screen bg-black text-white px-6 py-8 font-light">
      {/* Logo / Title */}
      <div className="text-center text-3xl font-bold tracking-wide mb-8">
        {localStorage.getItem("gymName")}
      </div>

      {/* User Info */}
      <div className="flex items-center gap-4 mb-10">
        <div className="w-[80px] h-[80px] rounded-full overflow-hidden border-2 border-gray-600">
          <img
            className="w-full h-full object-cover"
            src={localStorage.getItem("gymPic")}
            alt="gym pic"
          />
        </div>
        <div>
          <div className="text-lg text-gray-300">Welcome back!</div>
          <div className="text-xl font-semibold">Admin</div>
        </div>
      </div>

      {/* Navigation */}
      <div className="border-t border-gray-700 pt-8">
        <Link
          to="/dashboard"
          className={`flex items-center gap-3 text-lg font-medium bg-slate-800 px-4 py-3 rounded-lg cursor-pointer transition hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 ${
            location.pathname === "/dashboard"
              ? "border-2 bg-gradient-to-r from-blue-500 to-purple-600"
              : null
          }`}
        >
          <HomeIcon className="text-white" />
          <div>Dashboard</div>
        </Link>

        <Link
          to="/member"
          className={`flex items-center gap-3 mt-5 text-lg font-medium bg-slate-800 px-4 py-3 rounded-lg cursor-pointer transition hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 ${
            location.pathname === "/member"
              ? "border-2 bg-gradient-to-r from-blue-500 to-purple-600"
              : null
          }`}
        >
          <GroupIcon className="text-white" />
          <div>Members</div>
        </Link>

        <div
          onClick={() => {
            handleLogout();
          }}
          className="flex items-center gap-3 mt-5 text-lg font-medium bg-slate-800 px-4 py-3 rounded-lg cursor-pointer transition hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600"
        >
          <LogoutIcon className="text-white" />
          <div>Logout</div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
