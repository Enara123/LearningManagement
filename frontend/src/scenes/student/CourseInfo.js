import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import Header from "../../components/Header";
import PaperBg from "../../components/PaperBg";
import UpcomingAct from "../../components/UpcomingAct";
import StuAssessField from "../../components/StuAssessField";
import QuizField from "../../components/QuizField";
import { useParams } from "react-router-dom";

const CourseInfo = () => {
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
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="C++ Programming" subtitle="Courses > C++ Programming" />
      </Box>
      <Box display="flex">
        <Box>
          <Box>
            <PaperBg customWidth={1075} customHeight={215} sx={paperBgStyle}>
              <Box sx={{ padding: "30px" }}>
                <Typography variant="h3">Upcoming Activities</Typography>
                <UpcomingAct />
              </Box>
            </PaperBg>
          </Box>
          <Box mt="30px">
            <PaperBg customWidth={1075} customHeight={655} sx={paperBgStyle}>
              <Box sx={{ padding: "30px" }}>
                <Typography variant="h3">Course Content </Typography>
                <StuAssessField
                  title="Quiz Test Your Knowledge"
                  questions={`Number of Questions : ${
                    quizQuestions ? quizQuestions.length : 0
                  }`}
                  duration="Duration : 30 mins"
                />
                {Array.isArray(assessment) &&
                  assessment.map((assessmentItem, index) => (
                    <StuAssessField
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
              </Box>
            </PaperBg>
          </Box>
        </Box>

        <Box>
          <PaperBg customWidth={470} customHeight={900} sx={paperBgStyle}>
            <Box sx={{ padding: "30px" }}>
              <Typography variant="h3">Quiz Attempts</Typography>
              <QuizField />
            </Box>
          </PaperBg>
        </Box>
      </Box>
    </Box>
  );
};

export default CourseInfo;
