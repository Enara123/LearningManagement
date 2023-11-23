import { Box, Link, Typography, useTheme, Button } from "@mui/material";
import React, { useState } from "react";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import PaperBg from "../../components/PaperBg";
import LMSButton from "../../components/LMSButton";
import QuestionBox from "../../components/QuestionBox";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import StyledTextField from "../../components/StyledTextField";
import DTPicker from "../../components/DateTimePicker";

const CreateModule = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette);

  const [numberOfAnswers, setNumberOfAnswers] = useState(4);

  const handleIncrease = () => {
    if (numberOfAnswers < 5) {
      setNumberOfAnswers(numberOfAnswers + 1);
    }
  };

  const handleDecrease = () => {
    if (numberOfAnswers > 3) {
      setNumberOfAnswers(numberOfAnswers - 1);
    }
  };

  const dynamicHeight = 780 + numberOfAnswers * 55;

  const submit = () => {
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure to do this.",
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

  return (
    <Box mt="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="Create Assessment"
          subtitle="Modules > Create Assessment"
        />
      </Box>
      <Box>
        <PaperBg customWidth={1500} customHeight={dynamicHeight}>
          <Box
            display="flex"
            gap="30px"
            alignItems="center"
            sx={{ padding: "30px", paddingLeft: "50px" }}
          >
            <Typography variant="h3" color={colors.primary[700]}>
              {" "}
              {">"} &nbsp;&nbsp;Enter Module Details
            </Typography>
            <Typography variant="h3" color={colors.primary[700]}>
              {" "}
              {">"} &nbsp;&nbsp;Create Quiz
            </Typography>
            <Typography
              variant="h3"
              color={colors.blueAccent[500]}
              onClick={() => {
                alert("Hello");
              }}
              sx={{ cursor: "pointer" }}
            >
              {">"} &nbsp;&nbsp;Create Assessment
            </Typography>
          </Box>

          <Box display="flex">
            <Box width="60%">
              <QuestionBox
                question="Assessment Name"
                onChange={(e) => {
                  console.log(e.target.value);
                }}
              />
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                marginLeft="95px"
              >
                <Typography variant="h4" sx={{ flex: "0 0 250px" }}>
                  Date & Time Duration
                </Typography>
                <DTPicker title="Open Time" />
                <DTPicker title="Close Time" />
              </Box>

              <QuestionBox
                question="Question"
                onChange={(e) => {
                  console.log(e.target.value);
                }}
              />
              <>
                {[...Array(numberOfAnswers)].map((_, index) => (
                  <QuestionBox
                    key={index}
                    question={`Answer ${index + 1}`}
                    onChange={() => {}}
                  />
                ))}
                <Box
                  display="flex"
                  justifyContent="flex-end"
                  sx={{ paddingRight: "20px" }}
                >
                  <Button onClick={handleIncrease}>+Add Answer</Button>
                  <Button onClick={handleDecrease}>-Remove Answer</Button>
                </Box>
              </>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: "100px",
                  gap: "70px",
                }}
              >
                <LMSButton
                  variant="contained"
                  customFontSize="14px"
                  customHeight="40px"
                  customWidth="188px"
                >
                  Submit
                </LMSButton>
              </Box>
            </Box>
            <Box width="40%">
              <Typography variant="h3" textAlign="center">
                Preview
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "left",
                  paddingLeft: "100px",
                  marginRight: "45px",
                  marginTop: "20px",
                  border: "1px solid #1c1c1c",
                  borderRadius: "20px",
                  height: "90%",
                  flexDirection: "column",
                  padding: "30px",
                }}
              >
                <Typography variant="h4" sx={{ flex: "0 0 30px" }}>
                  Question
                </Typography>
                <Typography variant="h4" sx={{ flex: "0 0 30px" }}>
                  Question
                </Typography>
                <Typography variant="h4" sx={{ flex: "0 0 30px" }}>
                  Question
                </Typography>
                <Typography variant="h4" sx={{ flex: "0 0 30px" }}>
                  Question
                </Typography>
              </Box>
              <Box display="flex" justifyContent="center">
                <LMSButton
                  variant="contained"
                  customFontSize="14px"
                  customHeight="40px"
                  customWidth="250px"
                  onClick={submit}
                >
                  Create Assessment
                </LMSButton>
              </Box>
            </Box>
          </Box>
        </PaperBg>
      </Box>
    </Box>
  );
};

export default CreateModule;
