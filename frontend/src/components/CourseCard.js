import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import removeIcon from "../icons/remove.png";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import LMSButton from "./LMSButton";

const CourseCard = ({ moduleId }) => {
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

  const handleView = () => {
    // Navigate to CourseInfo page with moduleId
    navigate(`/student/course-info/${moduleId}`);
  };

  const courseCardStyle = {
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

  const courseNameStyle = {
    fontFamily: "Cascadia Code",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "24px",
    lineHeight: "normal",
    color: "white",
    textAlign: "center",
    marginTop: "131px",
  };

  const courseDescriptionStyle = {
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
    <div className="course-card" style={courseCardStyle}>
      <h3 className="course-name" style={courseNameStyle}>
        {moduleName}
      </h3>
      <p className="course-description" style={courseDescriptionStyle}>
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

export default CourseCard;
