import React, { useEffect, useState } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import MemberCard from "../../Components/MemberCard/MemberCard";
import {
  getMonthlyJoined,
  threeDayExpire,
  fourToSevenDaysExpire,
  expired,
  inactiveMembers,
} from "./Data";

const GeneralUser = () => {
  const [header, setHeader] = useState("");
  const [data, setData] = useState([]);
  useEffect(() => {
    const func = sessionStorage.getItem("func");
    functionCall(func);
  }, []);

  const functionCall = async (func) => {
    switch (func) {
      case "monthly":
        setHeader("Monthly Joined Members");
        var datas = await getMonthlyJoined();
        setData(datas.members);
        console.log("Received data:", datas);
        break;

      case "expiring3days":
        setHeader("Expiring In 3 Days Members");
        var datas = await threeDayExpire();
        setData(datas.members);
        break;

      case "expiring4to7days":
        setHeader("Expiring In 4-7 Days Members");
        var datas = await fourToSevenDaysExpire();
        setData(datas.members);
        break;

      case "expired":
        setHeader("Expired Members");
        var datas = await expired();
        setData(datas.members);
        break;

      case "inactive":
        setHeader("Inactive Members");
        var datas = await inactiveMembers();
        setData(datas.member);
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

      <div className="mt-5 text-xl text-slate-900">{header}</div>

      <div className="bg-slate-100 pt-5 mt-5 rounded-lg grid grid-cols-1 gap-2 md:grid-cols-3 overflow-x-auto h-[80%]">
        {data.map((item, index) => {
          return <MemberCard key={index} item={item} />;
        })}
      </div>
    </div>
  );
};

export default GeneralUser;
