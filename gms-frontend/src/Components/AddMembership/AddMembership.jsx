import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaRegCalendarAlt, FaEuroSign, FaPlus } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";

const AddMembership = ({ handleClose }) => {
  const [inputField, setInputField] = useState({ months: "", price: "" });
  const [membership, setMembership] = useState([]);

  const handleOnChange = (event, name) => {
    setInputField({ ...inputField, [name]: event.target.value });
  };

  const fetchMembership = async () => {
    await axios
      .get("http://localhost:4000/plans/get-membership", {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        setMembership(res.data.membership);
        toast.success(res.data.membership.length + " членства преземени");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Настана грешка");
      });
  };

  useEffect(() => {
    fetchMembership();
  }, []);

  const handleAddPlan = async () => {
    await axios
      .post("http://localhost:4000/plans/add-membership", inputField, {
        withCredentials: true,
      })
      .then((response) => {
        toast.success(response.data.message);
        handleClose();
      })
      .catch((err) => {
        console.log(err);
        toast.error("Настана грешка");
      });
  };

  return (
    <div className="text-black p-6 w-full max-w-md mx-auto bg-white rounded-xl shadow-lg">
      {/* Membership Cards */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {membership.map((item, index) => (
          <div
            key={index}
            className="bg-white border border-gray-300 px-4 py-4 rounded-lg shadow-sm text-center flex flex-col items-center justify-center transition hover:border-blue-500 hover:shadow-lg hover:scale-[1.03] cursor-pointer"
          >
            <FaRegCalendarAlt className="text-blue-500 text-2xl mb-1" />
            <span className="text-sm font-medium text-gray-700">
              {item.months} месец{item.months > 1 ? "и" : ""}
            </span>
            <span className="text-green-600 font-bold mt-1 text-base">
              {item.price} денари
            </span>
          </div>
        ))}
      </div>

      <hr className="my-4 border-slate-300" />

      {/* Custom Plan */}
      <h3 className="text-lg font-semibold mb-4 text-center text-slate-800">
        Додади нов план
      </h3>

      <div className="space-y-3">
        <div className="relative">
          <FaRegCalendarAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={inputField.months}
            onChange={(event) => handleOnChange(event, "months")}
            type="number"
            placeholder="Внеси траење (на пример 6 месеци)"
            className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>

        <div className="relative">
          <FaEuroSign className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={inputField.price}
            onChange={(event) => handleOnChange(event, "price")}
            type="number"
            placeholder="Внеси цена"
            className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>

        <div
          onClick={handleAddPlan}
          className="w-full mt-3 bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2 cursor-pointer"
        >
          <FaPlus />
          Додади план
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddMembership;
