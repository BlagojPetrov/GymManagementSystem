import React from "react";
import { Link } from "react-router-dom";

const MemberCard = () => {
  return (
    <Link to={'/member/123'} className="bg-white rounded-lg p-3 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 hover:text-white cursor-pointer">
      <div className="w-25 h-25 flex justify-center relative items-center border-2 p-1 mx-auto rounded-full overflow-hidden">
        <img
          src="https://img.freepik.com/premium-photo/sport-muscular-fitness-man-working-out-gym_174475-121.jpg?semt=ais_hybrid&w=740"
          alt="Profile Pic"
          className="w-full h-full object-cover rounded-full"
        />
      </div>
      <div className="mx-auto mt-5 text-center text-xl">{"Blagoj Petrov"}</div>
      <div className="mx-auto text-center">{"+389 " + "78362198"}</div>
      <div className="mx-auto text-center">Next bill date: {"31-06-2025"}</div>
    </Link>
  );
};

export default MemberCard;
