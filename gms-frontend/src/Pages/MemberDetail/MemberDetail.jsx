import React, { useState, useEffect } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom";
import { Switch } from "@mui/material";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const MemberDetail = () => {
  const [status, setStatus] = useState("Pending");
  const [renew, setRenew] = useState(false);
  const [membership, setMembership] = useState([]);
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const [planMember, setPlanMember] = useState("");
  const { id } = useParams();

  useEffect(() => {
    fetchData();
    fetchMembership();
  }, []);

  const fetchMembership = async () => {
    axios
      .get("http://localhost:4000/plans/get-membership", {
        withCredentials: true,
      })
      .then((response) => {
        setMembership(response.data.membership);
        setPlanMember(response.data.membership[0]._id);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong");
      });
  };

  const fetchData = async () => {
    await axios
      .get(`http://localhost:4000/members/get-member/${id}`, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
        setData(response.data.member);
        setStatus(response.data.member.status);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong");
      });
  };

  const handleSwitchBtn = async () => {
    let statuss = status === "Active" ? "Pending" : "Active";
    await axios
      .post(
        `http://localhost:4000/members/change-status/${id}`,
        { status: statuss },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        toast.success("Status changed");
      })
      .catch((err) => {
        toast.error("Something went wrong");
        console.log(err);
      });
    setStatus(statuss);
  };

  const isDateInPast = (inputDate) => {
    const today = new Date();
    const givenDate = new Date(inputDate);

    return givenDate < today;
  };

  const handleOnChangeSelect = (event) => {
    let value = event.target.value;
    setPlanMember(value);
  };

  const handleRenewSaveBtn = async () => {
    await axios
      .put(
        `http://localhost:4000/members/update-member-plan/${id}`,
        { membership: planMember },
        { withCredentials: true }
      )
      .then((response) => {
        setData(response.data.member);
      })
      .catch((err) => {
        toast.error("Something went wrong");
        console.log(err);
      });
  };

  const handleDeleteMember = async () => {
    const confirmDelete = window.confirm(
      "Дали сте сигурни дека сакате да го избришете овој член?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:4000/members/delete-member/${id}`, {
        withCredentials: true,
      });
      toast.success("Членот е успешно избришан.");

      setTimeout(() => {
        navigate("/member");
      }, 1500);
    } catch (error) {
      console.log(error);
      toast.error("Настана грешка при бришење на членот.");
    }
  };

  return (
    <div className="w-full md:w-3/4 p-6 text-black">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 px-4 py-2 mb-6 bg-slate-800 text-white rounded hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-700 transition"
      >
        <ArrowBackIcon fontSize="small" />
        Назад
      </button>

      {data && (
        <div className="bg-white rounded-lg shadow-md p-6 grid md:grid-cols-2 gap-8">
          {/* Profile Image */}
          <div className="w-full flex justify-center items-start">
            <img
              src={data.profilePic}
              alt="Профил"
              className="w-64 h-64 rounded-xl object-cover border border-gray-300"
            />
          </div>

          {/* Info */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold mb-4">{data.name}</h2>
            <p className="text-lg">
              <strong>Телефон:</strong> +389 {data.mobileNo}
            </p>
            <p className="text-lg">
              <strong>Адреса:</strong> {data.address}
            </p>
            <p className="text-lg">
              <strong>Зачленување:</strong>{" "}
              {data.createdAt.slice(0, 10).split("-").reverse().join("-")}
            </p>
            <p className="text-lg">
              <strong>Следна уплата:</strong>{" "}
              {data.nextBillDate.slice(0, 10).split("-").reverse().join("-")}
            </p>

            {/* Status Switch */}
            <div className="flex items-center gap-4 mt-4">
              <span className="text-lg font-medium">Статус:</span>
              <Switch
                checked={status === "Active"}
                onChange={handleSwitchBtn}
              />
              <span
                className={`text-sm px-3 py-1 rounded-full ${
                  status === "Active"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {status}
              </span>
            </div>

            {/* Renew Membership */}
            {isDateInPast(data.nextBillDate) && status === "Active" && (
              <>
                <button
                  onClick={() => setRenew(!renew)}
                  className="mt-4 w-full md:w-1/2 bg-gradient-to-r from-blue-600 to-purple-700 text-white py-2 rounded hover:opacity-90 transition"
                >
                  Обнови членарина
                </button>

                {renew && (
                  <div className="mt-4 bg-slate-50 p-4 rounded-lg border">
                    <label className="block mb-2 text-sm font-medium">
                      Избери план
                    </label>
                    <select
                      value={planMember}
                      onChange={(e) => setPlanMember(e.target.value)}
                      className="w-full border-2 rounded p-2 mb-4"
                    >
                      {membership.map((item, idx) => (
                        <option key={idx} value={item._id}>
                          {item.months} месечен план
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={handleRenewSaveBtn}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-700 text-white py-2 rounded hover:opacity-90 transition"
                    >
                      Зачувај
                    </button>
                  </div>
                )}
              </>
            )}
            <button
              onClick={handleDeleteMember}
              className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg transition-all"
            >
              Избриши член
            </button>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default MemberDetail;
