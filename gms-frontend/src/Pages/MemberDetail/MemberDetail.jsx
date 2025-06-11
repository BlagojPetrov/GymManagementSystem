import React, { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { Switch } from "@mui/material";

const MemberDetail = () => {
  const [status, setStatus] = useState("Pending");
  const [renew, setRenew] = useState(false);
  const navigate = useNavigate();
  const handleSwitchBtn = () => {
    let statuss = status === "Active" ? "Pending" : "Active";
    setStatus(statuss);
  };
  return (
    <div className="w-3/4 text-black p-5">
      <div
        className="border-2 w-fit text-base font-sans text-white p-1.5 rounded-lg bg-slate-900 cursor-pointer
             transition-colors duration-300 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-700 flex items-center"
        onClick={() => {
          navigate(-1);
        }}
      >
        <ArrowBackIcon className="mr-1" fontSize="small" />
        Back
      </div>
      <div className="mt-10 p-2">
        <div className="w=[100%] h-fit flex">
          <div className="w-1/3 mx-auto">
            <img
              src="https://img.freepik.com/free-photo/young-fitness-man-studio_7502-5004.jpg?ga=GA1.1.487485685.1748712579&semt=ais_items_boosted&w=740"
              alt="profile"
              className="w-full mx-auto"
            />
          </div>
          <div className="w-2/3 mt-5 text-xl p-5">
            <div className="mt-1 mb-2 text-2xl">Name: Blagoj</div>
            <div className="mt-1 mb-2 text-2xl">Mobile: +389 78362198</div>
            <div className="mt-1 mb-2 text-2xl">
              Adress: Kavadarci, Macedonia
            </div>
            <div className="mt-1 mb-2 text-2xl">Joined Date: 01-06-2025</div>
            <div className="mt-1 mb-2 text-2xl">Next Bill Date: 01-07-2025</div>
            <div className="mt-1 mb-2 flex gap-4 text-2xl">
              Status{" "}
              <Switch
                onColor="#6366F1"
                checked={status === "Active"}
                onChange={handleSwitchBtn}
              />
            </div>
            <div
              className={`mt-1 rounded-lg p-3 border-2 border-slate-900 text-center ${
                renew && status === "Active"
                  ? "bg-gradient-to-r from-blue-600 to-purple-700 text-white"
                  : ""
              } w-full md:w-1/2 cursor-pointer hover:text-white hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-700 flex items-center justify-center transition-colors duration-300`}
              onClick={() => {
                setRenew((prev) => !prev);
              }}
            >
              Renew
            </div>
            {renew && status === "Active" ? (
              <div className="rounded-lg p-3 mt-5 mb-5 h-fit bg-slate-50 md:w-[100%]">
                <div className="w-full">
                  <div className="my-5">
                    <div>Membership</div>
                    <select className="w-full border-2 p-2 rounded-lg">
                      <option value="">1 Month Plan</option>
                      <option value="">2 Month Plan</option>
                      <option value="">3 Month Plan</option>
                      <option value="">4 Month Plan</option>
                    </select>
                    <div
                      className={`mt-3 rounded-lg p-3 border-2 border-slate-900 text-center w-1/2 mx-auto cursor-pointer hover:text-white hover:bg-gradient-to-r  hover:from-blue-600 hover:to-purple-700 flex items-center justify-center transition-colors duration-300`}
                    >
                      Save
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberDetail;
