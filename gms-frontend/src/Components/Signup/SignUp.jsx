import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const SignUp = () => {
  const [inputField, setInputField] = useState({
    gymName: "",
    email: "",
    userName: "",
    password: "",
    profilePic: "https://cdn-icons-png.flaticon.com/512/2921/2921222.png",
  });

  const handleOnChange = (event, field) => {
    setInputField((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("Image Uploading");
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "gym-management");

      try {
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/djww3vhc9/image/upload",
          data
        );
        console.log(response);
        setInputField((prev) => ({
          ...prev,
          profilePic: response.data.secure_url,
        }));
      } catch (err) {
        console.log("Image upload failed:", err);
      }
    }
  };

  const handleRegister = async () => {
    await axios
      .post("http://localhost:4000/auth/register", inputField)
      .then((resp) => {
        const successMsg = "Успешна регистрација!";
        toast.success(successMsg);
      })
      .catch((err) => {
        const errorMessage = err.response.data.error;
        toast.error(errorMessage);
      });
  };

  return (
    <div className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 p-10 mt-20 mx-auto bg-white/70 rounded-lg shadow-lg h-fit">
      <div className="font-sans text-slate-800 text-center text-3xl mb-6">
        Регистрирај го твојот фитнес центар
      </div>
      <input
        value={inputField.email}
        onChange={(e) => handleOnChange(e, "email")}
        type="text"
        placeholder="Е-пошта"
        className="w-full mb-4 p-2 border border-gray-400 rounded"
      />
      <input
        value={inputField.gymName}
        onChange={(e) => handleOnChange(e, "gymName")}
        type="text"
        placeholder="Име на фитнес центар"
        className="w-full mb-4 p-2 border border-gray-400 rounded"
      />
      <input
        value={inputField.userName}
        onChange={(e) => handleOnChange(e, "userName")}
        type="text"
        placeholder="Корисничко име"
        className="w-full mb-4 p-2 border border-gray-400 rounded"
      />
      <input
        value={inputField.password}
        onChange={(e) => handleOnChange(e, "password")}
        type="password"
        placeholder="Лозинка"
        className="w-full mb-4 p-2 border border-gray-400 rounded"
      />
      <input
        type="file"
        onChange={handleFileChange}
        className="w-full mb-4 p-2 border border-gray-400 rounded cursor-pointer bg-white text-slate-800 hover:bg-gray-100 transition"
      />
      <img
        src={inputField.profilePic}
        alt="Превиев на слика"
        className="w-10 h-10 opacity-50 mx-auto mb-4"
      />
      <div
        className="w-full font-sans text-white text-lg text-center bg-slate-800 py-2 rounded cursor-pointer hover:bg-slate-700 transition"
        onClick={() => handleRegister()}
      >
        Регистрирај се
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
