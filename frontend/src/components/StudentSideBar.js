import React from "react";
import "../App.css";
import hatImage from "../icons/Hat.png";
import avatarImage from "../icons/avatar2.png";
import logoutImage from "../icons/logout.png";
import StudentSideBarData from "../../src/components/StudentSideBarData";

function StudentSideBar({ userType }) {
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
        John Doe
      </p>
      <StudentSideBarData />
      <button className="LogoutButton" onClick={onLogout}>
        <img src={logoutImage} alt="LogOut" className="LogoutImage" />
        Log Out
      </button>
    </div>
  );
}

export default StudentSideBar;
