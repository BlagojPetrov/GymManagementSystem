import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const ForgotPassword = () => {
  const [emailSubmit, setEmailSubmit] = useState(false);
  const [otpValidate, setOtpValidate] = useState(false);
  const [contentVal, setContentValue] = useState("Submit");
  const [inputField, setInputField] = useState({
    email: "",
    otp: "",
    newPassword: "",
  });

  const handleSubmit = () => {
    if (!emailSubmit) {
      sendOtp();
    } else if (emailSubmit && !otpValidate) {
      verifyOTP();
    } else {
      changePassword();
    }
  };

  const changePassword = async () => {
    await axios
      .post("http://localhost:4000/auth/reset-password", {
        email: inputField.email,
        newPassword: inputField.newPassword,
      })
      .then((response) => {
        toast.success(response.data.message);
      })
      .catch((err) => {
        toast.error("Some technical issue while sending email");
        console.log(err);
      });
  };

  const verifyOTP = async () => {
    await axios
      .post("http://localhost:4000/auth/reset-password/checkOtp", {
        email: inputField.email,
        otp: inputField.otp,
      })
      .then((response) => {
        setOtpValidate(true);
        setContentValue("Submit new password");
        toast.success(response.data.message);
      })
      .catch((err) => {
        toast.error("Some technical issue while sending email");
        console.log(err);
      });
  };

  const sendOtp = async () => {
    await axios
      .post("http://localhost:4000/auth/reset-password/sendOtp", {
        email: inputField.email,
      })
      .then((response) => {
        setEmailSubmit(true);
        setContentValue("Submit OTP");
        toast.success(response.data.message);
      })
      .catch((err) => {
        toast.error("Some technical issue while sending email");
        console.log(err);
      });
  };

  const handleOnChange = (event, name) => {
    setInputField((prev) => ({
      ...prev,
      [name]: event.target.value,
    }));
  };

  console.log(inputField);

  return (
    <div className="w-full">
      <div className="w-full">
        <div>Please enter your email</div>
        <input
          value={inputField.email}
          onChange={(event) => {
            handleOnChange(event, "email");
          }}
          type="email"
          placeholder="Email"
          autoComplete="email"
          className="w-full mb-4 p-2 border border-gray-400 rounded"
        />
      </div>

      {emailSubmit && (
        <div className="w-full">
          <div>Enter your OTP</div>
          <input
            value={inputField.otp}
            onChange={(event) => {
              handleOnChange(event, "otp");
            }}
            type="text"
            placeholder="OTP"
            className="w-full mb-4 p-2 border border-gray-400 rounded"
          />
        </div>
      )}

      {otpValidate && (
        <div className="w-full">
          <div>Enter your new password</div>
          <input
            value={inputField.newPassword}
            onChange={(event) => {
              handleOnChange(event, "newPassword");
            }}
            type="password"
            placeholder="New password"
            className="w-full mb-4 p-2 border border-gray-400 rounded"
          />
        </div>
      )}

      <div
        className="bg-slate-800 text-white px-4 py-2 rounded hover:bg-slate-700 text-center cursor-pointer"
        onClick={() => handleSubmit()}
      >
        {contentVal}
      </div>
      <ToastContainer />
    </div>
  );
};

export default ForgotPassword;
