import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import PaperBg from "../../components/PaperBg";
import LMSButton from "../../components/LMSButton";
import AssessmentField from "../../components/AssessmentField";
import AssessmentSchedule from "../../components/AssessmentSchedule";

const ModuleInfo = () => {
  const [moduleDetails, setModuleDetails] = useState(null);
  const { moduleId } = useParams();

  useEffect(() => {
    const fetchModuleDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/getmodule/${moduleId}`
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch module details: ${response.status}`);
        }

        const responseData = await response.json();
        setModuleDetails(responseData);
      } catch (error) {
        console.error("Error fetching module details: ", error);
      }
    };

    fetchModuleDetails();
  }, [moduleId]);

  // If moduleDetails is still null, display a loading message
  if (!moduleDetails) {
    return <p>Loading...</p>;
  }

  const {
    moduleDescription,
    noOfAssessments,
    expectedStudyHours,
    quizQuestions,
    assessment,
  } = moduleDetails;

  const paperBgStyle = { padding: "30px" };

  return (
    <Box mt="20px">
      {/* Header Section */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Modules" />
      </Box>

      {/* Module Description Section */}
      <Box>
        <PaperBg customWidth={1582} customHeight={180} sx={paperBgStyle}>
          <Typography variant="h3">Module Description</Typography>
          <Typography variant="body1" sx={{ mt: "10px" }}>
            {moduleDescription}
          </Typography>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box display="flex" justifyContent="space-between">
              <Typography sx={{ mr: "20px" }}>
                {`No of Assessments: ${noOfAssessments}`}
              </Typography>
              <Typography sx={{ mr: "20px" }}>
                {`Study time: ${expectedStudyHours}`}
              </Typography>
            </Box>
            <LMSButton
              customWidth="130px"
              customHeight="40px"
              customFontSize="14px"
            >
              Edit
            </LMSButton>
          </Box>
        </PaperBg>
      </Box>

      {/* Module Content Section */}
      <Box display="flex" sx={{ mt: "30px" }}>
        <PaperBg customWidth={1080} customHeight={700} sx={paperBgStyle}>
          <Typography variant="h3">Module Content</Typography>
          <AssessmentField
            title="Quiz Test Your Knowledge"
            questions={`Number of Questions : ${
              quizQuestions ? quizQuestions.length : 0
            }`}
            duration="Duration : 30 mins"
          />
          {assessment.map((assessmentItem, index) => (
            <AssessmentField
              key={index}
              title={assessmentItem.assessmentName}
              questions={`Number of Questions : ${
                assessmentItem.assessmentQuestions
                  ? assessmentItem.assessmentQuestions.length
                  : 0
              }`}
              duration="Duration : 30 mins"
            />
          ))}
        </PaperBg>

        {/* Assessment Schedule Section */}
        <PaperBg customWidth={476} customHeight={694} sx={paperBgStyle}>
          <Box sx={{ padding: "30px" }}>
            <Typography variant="h3">Assessment Schedule</Typography>
            <AssessmentSchedule />
          </Box>
        </PaperBg>
      </Box>
    </Box>
  );
};

export default ModuleInfo;
