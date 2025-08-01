import React from "react";
import { useAppContext } from "../../context/AppContext";
import axios from "axios";
import toast from "react-hot-toast";
import Sidebar from "../../components/user/Sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const { navigate, setToken } = useAppContext();
  const logOut = () => {
    localStorage.removeItem("token");
    axios.defaults.headers.common["Authorization"] = null;
    setToken(null);
    navigate("/");
    toast.success("Successfully Logged Out!");
  };
  return (
    <>
      <div className="flex justify-between items-center px-2 sm:px2 sm:px-10 py-4 h-[70px] border-b border-gray-300">
        <h1
          onClick={() => navigate("/")}
          className="text-3xl cursor-pointer font-semibold text-[#92857d]"
        >
          Wellness Sessions
        </h1>
        <button
          onClick={logOut}
          className="text-sm bg-[#D9885B] text-white px-8 py-2 rounded-full cursor-pointer"
        >
          Log Out
        </button>
      </div>
      <div className="h-[calc(100vh-70px)] flex">
        <div>
          <Sidebar />
        </div>
        <div className="flex-1 p-4">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layout;
