import React, { useState } from "react";
import {
  FaUser,
  FaPhone,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaClock,
  FaImage,
} from "react-icons/fa";

const AddMember = () => {
  const [inputField, setInputField] = useState({
    name: "",
    phoneNo: "",
    address: "",
    membership: "",
    profilePic: "",
    joiningDate: "",
  });

  const handleOnChange = (event, name) => {
    setInputField({ ...inputField, [name]: event.target.value });
  };
  console.log(inputField);
  return (
    <div className="max-w-md w-full mx-auto bg-white shadow-xl rounded-xl p-6 text-black">
      <form className="flex flex-col gap-4">
        {/* Name */}
        <div className="relative">
          <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={inputField.name}
            onChange={(event) => handleOnChange(event, "name")}
            type="text"
            placeholder="Name of the member"
            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Phone */}
        <div className="relative">
          <FaPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={inputField.phoneNo}
            onChange={(event) => handleOnChange(event, "phoneNo")}
            type="tel"
            placeholder="Phone number"
            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Address */}
        <div className="relative">
          <FaMapMarkerAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={inputField.address}
            onChange={(event) => handleOnChange(event, "address")}
            type="text"
            placeholder="Address"
            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Start Date */}
        <div className="relative">
          <FaCalendarAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={inputField.joiningDate}
            onChange={(event) => handleOnChange(event, "joiningDate")}
            type="date"
            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-600"
          />
        </div>

        {/* Membership Duration */}
        <div className="relative">
          <FaClock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={inputField.membership}
            onChange={(event) => {
              handleOnChange(event, "membership");
            }}
            type="number"
            min="1"
            placeholder="Membership duration (months)"
            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Upload Image */}
        <div className="relative">
          <label className="flex items-center gap-2 text-slate-700 font-medium mb-1">
            <FaImage />
            Upload Photo
          </label>
          <input
            type="file"
            accept="image/*"
            className="block w-full border border-slate-300 rounded-lg px-3 py-2 file:mr-4 file:py-1 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-all"
          />
        </div>

        {/* Register Button */}
        <button
          type="submit"
          className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition-colors"
        >
          Register Member
        </button>
      </form>
    </div>
  );
};

export default AddMember;
