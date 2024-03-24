import classNames from "classnames";
import Link from "next/link";
import React, { useState, useRef } from "react";
import { RxPerson, RxDashboard } from "react-icons/rx";
import { FaPlus } from "react-icons/fa";
import { FaHouseChimney } from "react-icons/fa6";
import { TbLogout } from "react-icons/tb";
import {
  MdOutlineSupportAgent,
  MdCarRental,
  MdOutlineRealEstateAgent,
  MdOutlineFeedback,
} from "react-icons/md";
import { FaListOl, FaUser } from "react-icons/fa";
import { FcApproval } from "react-icons/fc";
import { CollapsIcon } from "../icons";
import { CiChat2 } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { BiListPlus, BiUserPlus } from "react-icons/bi";

const Sidebar = () => {
  const [toggleCollapse, setToggleCollapse] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const menuRef = useRef(null);

  const menuItems = [
    {
      id: 1,
      label: "Dashboard",
      icon: <RxDashboard size={25} />,
      link: "/",
    },
    {
      id: 2,
      label: "My Properties",
      icon: <FaHouseChimney size={25} />,
      link: "/",
    },
    {
      id: 3,
      label: "Post Properties",
      icon: <FaPlus size={25} />,
      link: "/",
    },
    {
      id: 4,
      label: "Conversation",
      icon: <CiChat2 size={25} />,
      link: "/",
    },
    {
      id: 5,
      label: "Profile",
      icon: <CgProfile size={25} />,
      link: "/",
    },
    {
      id: 6,
      label: "Logout",
      icon: <TbLogout size={25} />,
      link: "/",
    },
  ];

  //Brokers
  const menuItems_b = [
    {
      id: 1,
      label: "Dashboard",
      icon: <RxDashboard size={25} />,
      link: "/",
    },
    {
      id: 2,
      label: "Employees",
      icon: <BiUserPlus size={25} />,
      link: "",
    },
    {
      id: 3,
      label: "Properties",
      icon: <BiListPlus size={25} />,
      link: "/",
    },

    {
      id: 4,
      label: "Conversation",
      icon: <CiChat2 size={25} />,
      link: "/",
    },
    {
      id: 5,
      label: "Profile",
      icon: <CgProfile size={25} />,
      link: "/",
    },
    {
      id: 6,
      label: "Logout",
      icon: <TbLogout size={25} />,
      link: "/",
    },
  ];

  const handleItemClick = (item) => {
    setActiveItem(item.id);
  };

  const wrapperClasses = classNames(
    "bg-gray-100 h-screen px-3 pt-10 pb-4 bg-light flex justify-between flex-col border border-gray-300",
    {
      "w-70": !toggleCollapse,
      "w-30": toggleCollapse,
      "overflow-y-auto": true,
    }
  );

  const collapseIconClasses = classNames(
    "p-4 rounded bg-light-lighter absolute right-0",
    {
      "rotate-180": toggleCollapse,
    }
  );

  const handleSidebarToggle = () => {
    setToggleCollapse(!toggleCollapse);
  };

  return (
    <div className={wrapperClasses} ref={menuRef}>
      <div className="flex flex-col">
        <div className="flex items-center justify-between relative px-3">
          <div className="flex items-center pl-2 gap-4 mb-2">
            <span className=" text-lg font-medium text-text">
              <Link href="/">
                <div className=" p-2 rounded-lg inline-block">
                  <span className="text-1xl text-green font-bold">BSMS</span>
                </div>
              </Link>
            </span>
          </div>
          <button
            className={collapseIconClasses}
            onClick={handleSidebarToggle}
            style={{ marginBottom: "70px" }}
          >
            <CollapsIcon />
          </button>
        </div>
        <div className="flex flex-col items-start mt-5 gap-3">
          {menuItems_b.map(({ id, title, icon, children, label }) => (
            <div key={id} className="relative">
              {!toggleCollapse && title && (
                <div style={{ marginTop: "40px", marginLeft: "10px" }}>
                  <span
                    className={classNames("text-ml text-gray-800")}
                    style={{ fontWeight: "bold" }}
                  >
                    {title}
                  </span>
                </div>
              )}
              {children ? (
                <div className="flex flex-col">
                  {children.map(({ id, title, icon, link, label }) => (
                    <div
                      key={id}
                      className="bg-gray-100 hover:bg-gray-200  hover:ml-2 cursor-pointer my-2 p-3 rounded-lg inline-block flex items-center"
                    >
                      {icon}
                      {!toggleCollapse && <span className="ml-2">{title}</span>}
                    </div>
                  ))}
                </div>
              ) : (
                <div
                  className={classNames({
                    "flex px-1 items-center cursor-pointer hover:bg-gray-200 hover:rounded-lg":
                      activeItem !== id,
                    "flex px-1 items-center cursor-pointer hover:bg-gray-200 hover:rounded-lg  text-green bg-LGreen":
                      activeItem == id,
                  })}
                  onClick={() => handleItemClick({ id })}
                >
                  {icon}
                  {!toggleCollapse && !title && (
                    <div
                      className=" cursor-pointer p-4 rounded-lg flex items-center "
                      style={{ width: "12rem" }}
                    >
                      <span
                        className={classNames({
                          "text-sm text-gray-800 ": activeItem !== id,
                          "text-sm text-green ": activeItem == id,
                        })}
                        onClick={() => handleItemClick({ id })}
                      >
                        {label}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
