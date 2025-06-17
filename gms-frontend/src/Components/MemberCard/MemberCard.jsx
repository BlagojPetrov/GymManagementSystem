import React from "react";
import { Link } from "react-router-dom";

const MemberCard = ({ item }) => {
  return (
    <Link
      to={`/member/${item?._id}`}
      className="bg-white rounded-lg p-3 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 hover:text-white cursor-pointer"
    >
      <div className="w-25 h-25 flex justify-center relative items-center border-2 p-1 mx-auto rounded-full overflow-hidden">
        <img
          src={item?.profilePic}
          alt="Profile Pic"
          className="w-full h-full object-cover rounded-full"
        />
      </div>
      <div className="mx-auto mt-5 text-center text-xl">{item?.name}</div>
      <div className="mx-auto text-center">{"+389 " + item?.mobileNo}</div>
      <div className="mx-auto text-center">
        Next bill date: {item?.nextBillDate.slice(0, 10).split("-").reverse().join("-")}
      </div>
    </Link>
  );
};

export default MemberCard;
