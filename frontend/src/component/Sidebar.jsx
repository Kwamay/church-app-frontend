import React, { useState } from "react";
import {
  FaTh,
  FaBars,
  FaUserAlt,
  FaLayerGroup,
  FaCommentAlt,
  FaShoppingBag,
  FaThList,
} from "react-icons/fa";
import chLogo from "../images/ch-logo.png";
import { NavLink, Outlet } from "react-router-dom";
import "../css/sidebar.css";

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const menuItem = [
    {
      path: "/dashboard",
      name: "Dashboard",
      icon: <FaTh />,
    },
    {
      path: "/members",
      name: "Members",
      icon: <FaUserAlt />,
    },
    {
      path: "/groups",
      name: "Groups",
      icon: <FaLayerGroup />,
    },
    {
      path: "/comment",
      name: "Comment",
      icon: <FaCommentAlt />,
    },
    {
      path: "/product",
      name: "Product",
      icon: <FaShoppingBag />,
    },
    {
      path: "/productList",
      name: "Product List",
      icon: <FaThList />,
    },
  ];
  return (
    <div className=" sidebar-container">
      <div style={{ width: isOpen ? "200px" : "50px" }} className="sidebar">
        <div className="top_section">
          <img
            src={chLogo}
            alt="Logo"
            style={{ display: isOpen ? "block" : "none" }}
            className="logo"
          />
          <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="bars">
            <FaBars onClick={toggle} />
          </div>
        </div>
        {menuItem.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className="link"
            activeclassName="active"
          >
            <div className="icon">{item.icon}</div>
            <div
              style={{ display: isOpen ? "block" : "none" }}
              className="link_text"
            >
              {item.name}
            </div>
          </NavLink>
        ))}
      </div>
      <main>{children}</main>
      <Outlet />
    </div>
  );
};

export default Sidebar;
