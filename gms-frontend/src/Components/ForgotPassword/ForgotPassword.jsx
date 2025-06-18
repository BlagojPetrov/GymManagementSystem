import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const ForgotPassword = () => {
  const [emailSubmit, setEmailSubmit] = useState(false);
  const [otpValidate, setOtpValidate] = useState(false);
  const [contentVal, setContentValue] = useState("Потврди");
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
    .then(() => {
      toast.success("Успешно ја променивте лозинката.");
    })
    .catch((err) => {
      toast.error("Техничка грешка при менување на лозинката.");
      console.log(err);
    });
};

const verifyOTP = async () => {
  await axios
    .post("http://localhost:4000/auth/reset-password/checkOtp", {
      email: inputField.email,
      otp: inputField.otp,
    })
    .then(() => {
      setOtpValidate(true);
      setContentValue("Потврди нова лозинка");
      toast.success("OTP кодот е успешно потврден.");
    })
    .catch((err) => {
      toast.error("Погрешен OTP код или техничка грешка.");
      console.log(err);
    });
};

const sendOtp = async () => {
  await axios
    .post("http://localhost:4000/auth/reset-password/sendOtp", {
      email: inputField.email,
    })
    .then(() => {
      setEmailSubmit(true);
      setContentValue("Потврди OTP");
      toast.success("Испратен е OTP код на вашата е-пошта.");
    })
    .catch((err) => {
      toast.error("Не успеавме да испратиме OTP код.");
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
        <div>Внесете ја вашата е-пошта</div>
        <input
          value={inputField.email}
          onChange={(event) => {
            handleOnChange(event, "email");
          }}
          type="email"
          placeholder="Е-пошта"
          autoComplete="email"
          className="w-full mb-4 p-2 border border-gray-400 rounded"
        />
      </div>

      {emailSubmit && (
        <div className="w-full">
          <div>Внесете го OTP кодот</div>
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
          <div>Внесете ја новата лозинка</div>
          <input
            value={inputField.newPassword}
            onChange={(event) => {
              handleOnChange(event, "newPassword");
            }}
            type="password"
            placeholder="Нова лозинка"
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
