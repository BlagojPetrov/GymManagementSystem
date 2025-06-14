import React, { useState } from "react";
import { FaRegCalendarAlt, FaEuroSign, FaPlus } from "react-icons/fa";

const memberships = [
  { duration: "1 Month", price: "20€" },
  { duration: "2 Months", price: "35€" },
  { duration: "3 Months", price: "45€" },
  { duration: "4 Months", price: "50€" },
];

const AddMembership = () => {
  const [inputField, setInputField] = useState({ months: "", price: "" });

  const handleOnChange = (event, name) => {
    setInputField({ ...inputField, [name]: event.target.value });
  };

  const handleAddPlan = () => {
    if (!inputField.months || !inputField.price) {
      alert("Please fill in both fields.");
      return;
    }

    if (parseInt(inputField.months) <= 0 || parseFloat(inputField.price) <= 0) {
      alert("Values must be greater than 0");
      return;
    }

    console.log("Custom plan added:", inputField);
    setInputField({ months: "", price: "" });
  };

  return (
    <div className="text-black p-6 w-full max-w-md mx-auto bg-white rounded-xl shadow-lg">
      {/* Membership Cards */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {memberships.map((membership, index) => (
          <div
            key={index}
            className="bg-white border border-gray-300 px-4 py-4 rounded-lg shadow-sm text-center flex flex-col items-center justify-center transition hover:border-blue-500 hover:shadow-lg hover:scale-[1.03] cursor-pointer"
          >
            <FaRegCalendarAlt className="text-blue-500 text-2xl mb-1" />
            <span className="text-sm font-medium text-gray-700">
              {membership.duration}
            </span>
            <span className="text-green-600 font-bold mt-1 text-base">
              {membership.price}
            </span>
          </div>
        ))}
      </div>

      <hr className="my-4 border-slate-300" />

      {/* Custom Plan */}
      <h3 className="text-lg font-semibold mb-4 text-center text-slate-800">
        Add Custom Plan
      </h3>

      <div className="space-y-3">
        <div className="relative">
          <FaRegCalendarAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={inputField.months}
            onChange={(event) => handleOnChange(event, "months")}
            type="number"
            placeholder="Enter duration (e.g. 6 Months)"
            className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>

        <div className="relative">
          <FaEuroSign className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={inputField.price}
            onChange={(event) => handleOnChange(event, "price")}
            type="number"
            placeholder="Enter price (e.g. 60€)"
            className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>

        <button
          onClick={handleAddPlan}
          className="w-full mt-3 bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
        >
          <FaPlus />
          Add Plan
        </button>
      </div>
    </div>
  );
};

export default AddMembership;
