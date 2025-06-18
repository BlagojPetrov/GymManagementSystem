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
        toast.success(response.data.message);
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
        toast.success(response.data.message);
      })
      .catch((err) => {
        toast.error("Something went wrong");
        console.log(err);
      });
  };

  return (
    <div className="w-3/4 text-black p-5">
      <div
        className="border-2 w-fit text-base font-sans text-white p-1.5 rounded-lg bg-slate-900 cursor-pointer
             transition-colors duration-300 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-700 flex items-center"
        onClick={() => {
          navigate(-1);
        }}
      >
        <ArrowBackIcon className="mr-1" fontSize="small" />
        Back
      </div>
      <div className="mt-10 p-2">
        <div className="w=[100%] h-fit flex">
          <div className="w-1/3 mx-auto">
            <img
              src={data?.profilePic}
              alt="profile"
              className="w-full mx-auto"
            />
          </div>
          <div className="w-2/3 mt-5 text-xl p-5">
            <div className="mt-1 mb-2 text-2xl">Name: {data?.name}</div>
            <div className="mt-1 mb-2 text-2xl">
              Mobile: +389 {data?.mobileNo}
            </div>
            <div className="mt-1 mb-2 text-2xl">Adress: {data?.address}</div>
            <div className="mt-1 mb-2 text-2xl">
              Joined Date:{" "}
              {data?.createdAt.slice(0, 10).split("-").reverse().join("-")}
            </div>
            <div className="mt-1 mb-2 text-2xl">
              Next Bill Date:{" "}
              {data?.nextBillDate.slice(0, 10).split("-").reverse().join("-")}
            </div>
            <div className="mt-1 mb-2 flex gap-4 text-2xl">
              Status{" "}
              <Switch
                onColor="#6366F1"
                checked={status === "Active"}
                onChange={handleSwitchBtn}
              />
            </div>
            {isDateInPast(data?.nextBillDate) && (
              <div
                className={`mt-1 rounded-lg p-3 border-2 border-slate-900 text-center ${
                  renew && status === "Active"
                    ? "bg-gradient-to-r from-blue-600 to-purple-700 text-white"
                    : ""
                } w-full md:w-1/2 cursor-pointer hover:text-white hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-700 flex items-center justify-center transition-colors duration-300`}
                onClick={() => {
                  setRenew((prev) => !prev);
                }}
              >
                Renew
              </div>
            )}
            {renew && status === "Active" ? (
              <div className="rounded-lg p-3 mt-5 mb-5 h-fit bg-slate-50 md:w-[100%]">
                <div className="w-full">
                  <div className="my-5">
                    <div>Membership</div>
                    <select
                      value={planMember}
                      onChange={handleOnChangeSelect}
                      className="w-full border-2 p-2 rounded-lg"
                    >
                      {membership.map((item, index) => {
                        return (
                          <option key={index} value={item._id}>
                            {item.months} Month Plan
                          </option>
                        );
                      })}
                    </select>
                    <div
                      onClick={handleRenewSaveBtn}
                      className={`mt-3 rounded-lg p-3 border-2 border-slate-900 text-center w-1/2 mx-auto cursor-pointer hover:text-white hover:bg-gradient-to-r  hover:from-blue-600 hover:to-purple-700 flex items-center justify-center transition-colors duration-300`}
                    >
                      Save
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default MemberDetail;
