import { Box, Typography, useTheme, Link } from "@mui/material";
import React, { useState } from "react";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import PaperBg from "../../components/PaperBg";
import LMSButton from "../../components/LMSButton";
import QuestionBox from "../../components/QuestionBox";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import ModuleNav from "../../components/ModuleNav";

const CreateModule = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette);
  const [moduleName, setModuleName] = useState("");
  const [moduleDescription, setModuleDescription] = useState("");
  const [noOfAssessments, setNoOfAssessments] = useState("");
  const [expectedStudyHours, setExpectedStudyHours] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const notify = (text) =>
    toast.error(text, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: "light",
    });

  const handleSubmit = async () => {
    if (moduleName === "") {
      notify("Please enter module name");
      return;
    } else if (moduleDescription === "") {
      notify("Please enter module description");
      return;
    } else if (noOfAssessments === "") {
      notify("Please enter no of assessments");
      return;
    } else if (isNaN(noOfAssessments)) {
      notify("Please enter a valid number for no of assessments");
      return;
    } else if (expectedStudyHours === "") {
      notify("Please enter expected study hours");
      return;
    } else if (isNaN(expectedStudyHours)) {
      notify("Please enter a valid number for expected study hours");
      return;
    } else {
      try {
        setIsSubmitting(true);

        // Prepare the request body
        const requestBody = JSON.stringify({
          moduleName,
          moduleDescription,
          noOfAssessments,
          expectedStudyHours,
          moduleStatus: "Active",
        });

        // Send the POST request
        const response = await fetch("http://localhost:5000/api/savemodule", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: requestBody,
        });

        // Check if the request was successful
        if (response.ok) {
          const responseData = await response.json();
          const moduleId = responseData._id;

          // Navigate to the next page with moduleId
          window.location.href = `/create-quiz/:moduleId=${moduleId}`;
        } else {
          console.error("Failed to save module");
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <Box mt="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Create Module" subtitle="Modules > Create Module" />
      </Box>

      <Box>
        <PaperBg customWidth={1500} customHeight={800}>
          <ModuleNav />
          <QuestionBox
            question="Module Name"
            value={moduleName}
            onChange={(e) => {
              setModuleName(e.target.value);
            }}
          />
          <QuestionBox
            question="Module Description"
            value={moduleDescription}
            onChange={(e) => {
              setModuleDescription(e.target.value);
            }}
          />
          <QuestionBox
            question="No of Assessments"
            value={noOfAssessments}
            onChange={(e) => {
              setNoOfAssessments(e.target.value);
            }}
          />
          <QuestionBox
            question="Expected Study Hours"
            value={expectedStudyHours}
            onChange={(e) => {
              setExpectedStudyHours(e.target.value);
            }}
          />

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              paddingLeft: "100px",
              gap: "70px",
            }}
          >
            {" "}
            <LMSButton
              variant="contained"
              customFontSize="14px"
              customHeight="40px"
              customWidth="188px"
              onClick={() => {
                handleSubmit();
              }}
            >
              Submit
            </LMSButton>
          </Box>
        </PaperBg>
      </Box>
      <ToastContainer />
    </Box>
  );
};

export default CreateModule;
