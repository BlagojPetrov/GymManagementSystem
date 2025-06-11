import React, { useEffect, useState } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import MemberCard from "../../Components/MemberCard/MemberCard";

const GeneralUser = () => {
  const [header, setHeader] = useState("");

  useEffect(() => {
    const func = sessionStorage.getItem("func");
    functionCall(func);
  }, []);

  const functionCall = async (func) => {
    switch (func) {
        case "monthly":
            setHeader("Monthly Joined Members")
            break;
        case "expiring3days":
            setHeader("Expiring In 3 Days Members")
            break;
        case "expiring4to7days":
            setHeader("Expiring In 4-7 Days Members")
            break;
        case "expired":
            setHeader("Expired Members")
            break;
        case "inactive":
            setHeader("Inactive Members")
            break;
    }
  };
  return (
    <div className="text-black p-5 w-3/4 flex-col">
      <div className="border-2 bg-slate-900 flex justify-between w-full text-white rounded-lg p-3">
        <Link
          to={"/dashboard"}
          className="border-2 pl-3 pr-3 pt-1 rounded-2xl cursor-pointer hover:bg-gradient-to-r  hover:from-blue-500 hover:to-purple-600"
        >
          <ArrowBackIcon /> Back to Dashboard
        </Link>
      </div>

      <div className="mt-5 text-xl text-slate-900">
        {header}
      </div>

      <div className="bg-slate-100 pt-5 mt-5 rounded-lg grid grid-cols-1 gap-2 md:grid-cols-3 overflow-x-auto h-[80%]">
        <MemberCard />
        <MemberCard />
      </div>
    </div>
  );
};

export default GeneralUser;
