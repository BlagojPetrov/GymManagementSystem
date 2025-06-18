import React, { useState } from "react";
import Modal from "../Modal/Modal";
import ForgotPassword from "../ForgotPassword/ForgotPassword";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const Login = () => {
  const [loginField, setLoginField] = useState({ userName: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = async () => {
    await axios
      .post("http://localhost:4000/auth/login", loginField, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data);
        localStorage.setItem("gymName", response.data.gym.gymName);
        localStorage.setItem("gymPic", response.data.gym.profilePic);
        localStorage.setItem("isLogin", "true");
        localStorage.setItem("token", response.data.token);
        navigate("/dashboard");
      })
      .catch((err) => {
        const errorMessage = err.response.data.error;
        toast.error(errorMessage);
      });
  };

  const [forgotPassword, setForgotPassword] = useState(false);

  const handleClose = () => {
    setForgotPassword((prev) => !prev);
  };

  const handleOnChange = (event, name) => {
    setLoginField({ ...loginField, [name]: event.target.value });
  };

  return (
    <div className="w-1/3 p-10 mt-20 ml-20 bg-white/70 rounded-lg shadow-lg h-fit">
      <div className="font-sans text-slate-800 text-center text-3xl mb-6">
        Најава
      </div>
      <input
        value={loginField.userName}
        onChange={(event) => {
          handleOnChange(event, "userName");
        }}
        type="text"
        placeholder="Корисничко име"
        className="w-full mb-4 p-2 border border-gray-400 rounded"
      />
      <input
        value={loginField.password}
        onChange={(event) => {
          handleOnChange(event, "password");
        }}
        type="password"
        placeholder="Лозинка"
        className="w-full mb-4 p-2 border border-gray-400 rounded"
      />

      {/* Forgot password */}
      <div
        className="text-right text-sm text-blue-600 hover:underline cursor-pointer mb-4"
        onClick={() => handleClose()}
      >
        Заборавена лозинка?
      </div>
      {forgotPassword && (
        <Modal
          header="Заборавена лозинка"
          handleClose={handleClose}
          content={<ForgotPassword />}
        />
      )}
      {/* Submit button */}
      <div
        className="w-full font-sans text-white text-lg text-center bg-slate-800 py-2 rounded cursor-pointer hover:bg-slate-700 transition"
        onClick={() => {
          handleLogin();
        }}
      >
        Потврди
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
