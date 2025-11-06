import React, { useState } from "react";
import {
  FaTh,
  FaBars,
  FaUserAlt,
  FaLayerGroup,
  FaCommentAlt,
  FaShoppingBag,
  FaSignOutAlt,
  FaThList,
} from "react-icons/fa";
import chLogo from "../images/ch-logo.png";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "../css/sidebar.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redaux/slices/authSlice";

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/signin");
  };

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
        {isOpen && user && (
          <div className="user-info">
            <p className="user-name">
              {user.name || user.username || user.email}
            </p>
          </div>
        )}
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
        <div className="logout-section">
          <button className="logout-btn" onClick={handleLogout}>
            <FaSignOutAlt />
            {isOpen && <span style={{ marginLeft: "10px" }}>Logout</span>}
          </button>
        </div>
        </div>
      <main>{children}</main>
      <Outlet />
    </div>
  );
};

export default Sidebar;
