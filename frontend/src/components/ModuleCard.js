import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import removeIcon from "../icons/remove.png";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import LMSButton from "./LMSButton";

const ModuleCard = ({ moduleId }) => {
  const [moduleName, setModuleName] = useState("");
  const [description, setDescription] = useState("");
  const [bgImages, setBgImages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/api/getmodule/${moduleId}`)
      .then((response) => response.json())
      .then((data) => {
        setModuleName(data.moduleName);
        setDescription(data.moduleDescription);
      })
      .catch((error) => {
        console.error("Error fetching module data:", error);
      });

    const bgImage1 = require("../icons/bg1.png");
    const bgImage2 = require("../icons/bg2.png");
    const bgImage3 = require("../icons/bg3.png");

    const shuffledBgImages = shuffle([bgImage1, bgImage2, bgImage3]);
    setBgImages(shuffledBgImages);
  }, [moduleId]);

  const shuffle = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    for (let i = 0; i < shuffledArray.length - 1; i++) {
      if (shuffledArray[i] === shuffledArray[i + 1]) {
        const temp = shuffledArray[i];
        shuffledArray[i] = shuffledArray[i + 1];
        shuffledArray[i + 1] = temp;
      }
    }
    return shuffledArray;
  };

  const handleDelete = () => {
    confirmAlert({
      title: "Confirm To Delete",
      message: "This will permanently delete the module. Are you sure?",
      buttons: [
        {
          label: "Yes",
          onClick: () => alert("Click Yes"),
        },
        {
          label: "No",
          onClick: () => alert("Click No"),
        },
      ],
    });
  };

  const handleView = () => {
    // Navigate to ModuleInfo page with moduleId
    navigate(`/moduleInfo/${moduleId}`);
  };

  const moduleCardStyle = {
    backgroundImage: `url(${bgImages[0]})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "390px",
    height: "439px",
    borderRadius: "20px",
    position: "relative",
    flexShrink: "0",
    boxShadow: "0px 0px 0px 0px rgba(0, 0, 0, 1)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const deleteButtonStyle = {
    background: "transparent",
    border: "none",
    marginTop: "31px",
    marginLeft: "290px",
    flexShrink: "0",
    position: "absolute",
    cursor: "pointer",
  };

  const moduleNameStyle = {
    fontFamily: "Cascadia Code",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "24px",
    lineHeight: "normal",
    color: "white",
    textAlign: "center",
    marginTop: "131px",
  };

  const moduleDescriptionStyle = {
    fontFamily: "Cascadia Code",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "20px",
    lineHeight: "normal",
    color: "white",
    textAlign: "center",
    marginTop: "31px",
    marginBottom: "30px",
  };

  return (
    <div className="module-card" style={moduleCardStyle}>
      <button
        className="delete-button"
        onClick={handleDelete}
        style={deleteButtonStyle}
      >
        <img src={removeIcon} alt="Remove Button" />
      </button>
      <h3 className="module-name" style={moduleNameStyle}>
        {moduleName}
      </h3>
      <p className="module-description" style={moduleDescriptionStyle}>
        {description}
      </p>
      <LMSButton
        variant="contained"
        customHeight="50px"
        customWidth="190px"
        customFontSize="16px"
        onClick={handleView}
      >
        View
      </LMSButton>
    </div>
  );
};

export default ModuleCard;
