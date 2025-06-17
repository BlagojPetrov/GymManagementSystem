import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
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
    mobileNo: "",
    address: "",
    membership: "",
    profilePic: "https://th.bing.com/th/id/OIP.gj6t3grz5no6UZ03uIluiwHaHa?rs=1&pid=ImgDetMain",
    joiningDate: "",
  });

  const [membershipList, setMembershipList] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");

  const handleOnChange = (event, name) => {
    setInputField({ ...inputField, [name]: event.target.value });
  };
  console.log(inputField);

  const uploadImage = async (event) => {
    const files = event.target.files;
    const data = new FormData();
    data.append("file", files[0]);

    data.append("upload_preset", "gym-management");

    try {
      const response = await axios.post("https://api.cloudinary.com/v1_1/djww3vhc9/image/upload", data);
      console.log(response);
      const imageUrl = response.data.url;
      setInputField({ ...inputField, ['profilePic']: imageUrl})
    } catch (err) {
      console.log(err);
    }
  };

  const fetchMembership = async () => {
    await axios
      .get("http://localhost:4000/plans/get-membership", {
        withCredentials: true,
      })
      .then((response) => {
        setMembershipList(response.data.membership);
        if (response.data.membership.length === 0) {
          return toast.error("No any membership added yet", {
            className: "text-lg",
          });
        } else {
          let a = response.data.membership[0]._id;
          setSelectedOption(a);
          setInputField({ ...inputField, membership: a });
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something wrong happend");
      });
  };

  useEffect(() => {
    console.log(inputField);
    fetchMembership();
  }, []);

  const handleOnChangeSelect = (event) => {
    let value = event.target.value;
    setSelectedOption(value);
    setInputField({ ...inputField, membership: value });
  };

  const handleRegisterButton = async () => {
    await axios
      .post("http://localhost:4000/members/register-member", inputField, {
        withCredentials: true,
      })
      .then((response) => {
        toast.success("Added successfully");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something wrong happend");
      });
  };

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
            value={inputField.mobileNo}
            onChange={(event) => handleOnChange(event, "mobileNo")}
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
          <select
            value={selectedOption}
            onChange={handleOnChangeSelect}
            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="" disabled>
              Избери план
            </option>
            {membershipList.map((item, index) => (
              <option key={index} value={item._id}>
                {item.months} месеци - {item.price} ден
              </option>
            ))}
          </select>
        </div>

        {/* Upload Image */}
        <div className="relative">
          <label className="flex items-center gap-2 text-slate-700 font-medium mb-1">
            <FaImage />
            Upload Photo
          </label>
          <input
            type="file"
            onChange={(e) => uploadImage(e)}
            className="block w-full border border-slate-300 rounded-lg px-3 py-2 file:mr-4 file:py-1 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-all"
          />
        </div>

        {/* Register Button */}
        <div
          onClick={() => handleRegisterButton()}
          type="submit"
          className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition-colors"
        >
          Register Member
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddMember;
