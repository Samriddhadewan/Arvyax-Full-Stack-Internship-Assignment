import React from "react";
import Navbar from "../Navbar";
import { NavLink } from "react-router-dom";
import { MdSpaceDashboard } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";
import { RiDraftLine } from "react-icons/ri";

const Sidebar = () => {
  return (
    <div className="flex flex-col border-r  border-gray-300 min-h-full pt-6">
      <NavLink
        end={true}
        to="/user"
        className={({ isActive }) =>
          `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${
            isActive && "bg-[#D9885B] border-r-2 text-white border-[#b64a0f]"
          }`
        }
      >
        <MdSpaceDashboard className="min-w-4 w-5" />

        <p className="hidden md:inline-block">Dashboard</p>
      </NavLink>
      <NavLink
        to="/user/addSession"
        className={({ isActive }) =>
          `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${
            isActive && "bg-[#D9885B] border-r-2 text-white border-[#b64a0f]"
          }`
        }
      >
        <IoIosAddCircle />

        <p className="hidden md:inline-block">Add Session</p>
      </NavLink>
      <NavLink
        to="/user/mySessions"
        className={({ isActive }) =>
          `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${
            isActive && "bg-[#D9885B] border-r-2 text-white border-[#b64a0f]"
          }`
        }
      >
        <RiDraftLine />

        <p className="hidden md:inline-block">Drafts</p>
      </NavLink>
    </div>
  );
};

export default Sidebar;
