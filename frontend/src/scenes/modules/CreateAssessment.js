import { Box, Typography, useTheme, Button } from "@mui/material";
import React, { useState } from "react";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import PaperBg from "../../components/PaperBg";
import LMSButton from "../../components/LMSButton";
import QuestionBox from "../../components/QuestionBox";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import DTPicker from "../../components/DateTimePicker";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import StyledTextField from "../../components/StyledTextField";

const CreateAssessment = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette);
  const [numberOfAnswers, setNumberOfAnswers] = useState(4);
  const [assessmentData, setAssessmentData] = useState([]);
  const [assessmentName, setAssessmentName] = useState("");
  const [questionText, setQuestionText] = useState("");
  const [selectPreviewQuestion, setSelectPreviewQuestion] = useState(null);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(null);
  const [questionData, setQuestionData] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [selectedAnswers, setSelectedAnswers] = useState({});

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

  const handleRadioChange = (event) => {
    setSelectedAnswer(event.target.value);
  };

  const handleAnswerChange = (questionIndex, answer) => {
    setSelectedAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionIndex]: answer,
    }));
  };

  const handlePreviewSelectedQuestion = (index) => {
    setSelectPreviewQuestion(index);
  };

  const handlePreviewRadioChange = (event) => {
    const index = parseInt(event.target.value);
    setSelectedQuestionIndex(index);
    setQuestionText(questionData[index]?.question || "");
    setSelectedAnswers(questionData[index]?.answers || {});

    const correctAnswerIndex = Object.values(
      questionData[index]?.answers || {}
    ).findIndex((answer) => answer === questionData[index]?.correctAnswer);

    setSelectedAnswer(
      correctAnswerIndex !== -1 ? String(correctAnswerIndex) : ""
    );
  };

  const handleAddAssessment = () => {
    const newAssessment = {
      assessmnetNumber: assessmentData.length + 1,
      assessmentName: assessmentName,
      assessmentStatus: "Open",
      unlockTime: "2021-10-10 10:00:00",
      dueTime: "2021-10-10 10:00:00",
    };
    setAssessmentData([...assessmentData, newAssessment]);
  };

  const handleAddQuestion = () => {
    const newQuestion = {
      questionNumber: questionData.length + 1,
      question: questionText || "New Question",
      answers: selectedAnswers,
      correctAnswer:
        selectedAnswer !== ""
          ? selectedAnswers[selectedAnswer]
          : selectedAnswers[0],
      status: "active",
    };
    console.log(newQuestion);
    setQuestionData([...questionData, newQuestion]);

    // Reset input fields after adding a question
    setQuestionText("");
    setSelectedAnswer("");
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
                  setQuestionText(e.target.value);
                }}
              />
              <>
                <Box flexDirection="row">
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    value={selectedAnswer}
                    name="radio-buttons-group"
                    onChange={(e) => {
                      handleRadioChange(e);
                    }}
                  >
                    {[...Array(numberOfAnswers)].map((_, index) => (
                      <Box
                        key={index}
                        display="flex"
                        alignItems="center"
                        sx={{ padding: "30px", paddingLeft: "100px" }}
                      >
                        <FormControlLabel
                          value={String(index)}
                          control={<Radio />}
                        />
                        <Typography variant="h4" sx={{ flex: "0 0 210px" }}>
                          {`Answer ${index + 1}`}
                        </Typography>
                        <StyledTextField
                          variant="outlined"
                          checked={selectedAnswer === String(index)}
                          value={selectedAnswers[index] || ""}
                          onChange={(e) => {
                            handleAnswerChange(index, e.target.value);
                          }}
                          fullWidth
                        />
                      </Box>
                    ))}
                  </RadioGroup>
                </Box>
                <Box
                  display="flex"
                  alignItems="center"
                  sx={{ paddingLeft: "640px" }}
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
                  onClick={handleAddQuestion}
                >
                  Submit
                </LMSButton>
              </Box>
            </Box>
            <Box width="40%">
              <Typography
                variant="h4"
                color={colors.primary[800]}
                sx={{ paddingTop: "50px", paddingLeft: "50px" }}
              >
                Preview
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "left",
                  paddingLeft: "100px",
                  marginRight: "45px",
                  marginTop: "45px",
                  border: "1px solid #1c1c1c",
                  borderRadius: "20px",
                  height: "700px",
                  flexDirection: "column",
                  padding: "30px",
                  overflowY: "auto",
                }}
              >
                {questionData.map((question, index) => (
                  <div key={index} style={{ marginBottom: "20px" }}>
                    <Box display="flex" flexDirection="row" alignItems="center">
                      <Radio
                        checked={selectedQuestionIndex === index}
                        onChange={() => {
                          handlePreviewSelectedQuestion(index);
                          handlePreviewRadioChange({
                            target: { value: index },
                          });
                        }}
                        value={index.toString()}
                      />
                      <Typography
                        variant="h4"
                        sx={{
                          flex: "0 0 480px",
                          color:
                            question.status === "Hidden"
                              ? "#c8c8c8"
                              : "inherit",
                          textDecoration:
                            question.status === "Hidden"
                              ? "line-through"
                              : "none",
                        }}
                      >
                        {`${index + 1}. ${question.question} ?`}
                      </Typography>
                    </Box>
                    <Box paddingLeft="20px" paddingTop="10px">
                      {Object.entries(question.answers).map(
                        ([ansIndex, answer]) => (
                          <Typography
                            key={ansIndex}
                            variant="h4"
                            sx={{
                              flex: "0 0 30px",
                              color:
                                answer === question.correctAnswer
                                  ? "#0BE2E2"
                                  : "black",
                              fontWeight:
                                answer === question.correctAnswer
                                  ? "bold"
                                  : "normal",
                            }}
                          >
                            {`${String.fromCharCode(
                              65 + parseInt(ansIndex)
                            )}. ${answer}`}
                          </Typography>
                        )
                      )}
                    </Box>
                  </div>
                ))}
              </Box>
            </Box>
          </Box>
        </PaperBg>
      </Box>
    </Box>
  );
};

export default CreateAssessment;
