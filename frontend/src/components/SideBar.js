import React from "react";
import "../App.css";
import { SideBarData } from "./SideBarData";
import hatImage from "../icons/Hat.png";
import avatarImage from "../icons/avatar.png";
import logoutImage from "../icons/logout.png";

function SideBar() {
  const onLogout = () => {
    window.location.pathname = "/";
  };

  return (
    <div className="SideBar">
      <img
        src={hatImage}
        alt="Hat"
        style={{
          marginTop: "10px",
          width: "42px",
        }}
      />
      <img
        src={avatarImage}
        alt="Avatar"
        style={{ marginTop: "50px", width: "100px" }}
      />
      <p
        style={{
          color: "white",
          marginTop: "20px",
          fontFamily: "montserrat",
          fontSize: "20px",
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        Mary Johnson
      </p>
      <ul className="SideBarList">
        {SideBarData.map((val, key) => {
          return (
            <li
              key={key}
              id={window.location.pathname === val.link ? "active" : ""}
              className="row"
              onClick={() => {
                window.location.pathname = val.link;
              }}
            >
              {" "}
              <div id="icon">{val.icon}</div>
              <div id="title">{val.title}</div>
            </li>
          );
        })}
      </ul>
      <button className="LogoutButton" onClick={onLogout}>
        <img src={logoutImage} alt="LogOut" className="LogoutImage" />
        Log Out
      </button>
    </div>
  );
}

export default SideBar;
