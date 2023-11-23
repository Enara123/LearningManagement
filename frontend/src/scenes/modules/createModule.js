import { Box, Link, Typography, useTheme } from "@mui/material";
import React, { useState } from "react";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import PaperBg from "../../components/PaperBg";
import LMSButton from "../../components/LMSButton";
import QuestionBox from "../../components/QuestionBox";
import { Link as RouterLink } from "react-router-dom";

const CreateModule = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette);

  return (
    <Box mt="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Create Module" subtitle="Modules > Create Module" />
      </Box>
      <Box>
        <PaperBg customWidth={1500} customHeight={800}>
          <Box
            display="flex"
            gap="30px"
            alignItems="center"
            sx={{ padding: "30px", paddingLeft: "50px" }}
          >
            <Typography
              variant="h3"
              color={colors.blueAccent[500]}
              onClick={() => {
                alert("Hello");
              }}
              sx={{ cursor: "pointer" }}
            >
              {" "}
              {">"} &nbsp;&nbsp;Enter Module Details
            </Typography>
            <Typography variant="h3" color={colors.primary[700]}>
              {">"} &nbsp;&nbsp;Create Quiz
            </Typography>
          </Box>
          <QuestionBox
            question="Module Name"
            onChange={(e) => {
              console.log(e.target.value);
            }}
          />
          <QuestionBox
            question="Module Description"
            onChange={(e) => {
              console.log(e.target.value);
            }}
          />
          <QuestionBox
            question="No of Assessments"
            onChange={(e) => {
              console.log(e.target.value);
            }}
          />
          <QuestionBox
            question="Expected Study Hours"
            onChange={(e) => {
              console.log(e.target.value);
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
            <Link
              component={RouterLink}
              to="/create-quiz"
              underline="none"
              color="inherit"
            >
              <LMSButton
                variant="contained"
                customFontSize="14px"
                customHeight="40px"
                customWidth="188px"
              >
                Submit
              </LMSButton>
            </Link>
          </Box>
        </PaperBg>
      </Box>
    </Box>
  );
};

export default CreateModule;
