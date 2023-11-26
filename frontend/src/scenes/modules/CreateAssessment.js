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
import ModuleNav from "../../components/ModuleNav";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
const CreateAssessment = () => {
  var { moduleId } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette);
  const [assessmentId, setAssessmentId] = useState();
  const [numberOfAnswers, setNumberOfAnswers] = useState(4);
  const [assessmentData, setAssessmentData] = useState();
  const [assessmentName, setAssessmentName] = useState("");
  const [questionText, setQuestionText] = useState("");
  const [selectPreviewQuestion, setSelectPreviewQuestion] = useState(null);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(null);
  const [questionData, setQuestionData] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [openTime, setOpenTime] = useState(new Date());
  const [closeTime, setCloseTime] = useState(new Date());

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
  const handleOpenTimeChange = (newOpenTime) => {
    setOpenTime(newOpenTime);
  };

  const handleCloseTimeChange = (newCloseTime) => {
    setCloseTime(newCloseTime);
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

  const handleAddAssessment = async () => {
    const newAssessment = JSON.stringify({
      assessmentNumber: 1,
      assessmentName: assessmentName,
      assessmentStatus: "Open",
      unlockTime: openTime,
      dueTime: closeTime,
    });

    try {
      const response = await fetch(
        `http://localhost:5000/api/module/${moduleId}/addassessment`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: newAssessment,
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData.assessment._id);
        return responseData.assessment[0]._id;
        setAssessmentId(responseData._id);
      } else {
        console.log("Error " + response.status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddQuestion = async () => {
    if (!assessmentId) {
      const id = await handleAddAssessment();
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
      console.log(id);
      const requestBody = JSON.stringify({
        questionNumber: questionData.length + 1,
        question: questionText || "New Question",
        answer: Array.isArray(selectedAnswers)
          ? selectedAnswers.filter((answer) => answer !== undefined)
          : [],
        correctAnswer:
          selectedAnswers !== ""
            ? selectedAnswer[selectedAnswer]
            : selectedAnswers[0],
        status: "active",
      });
      const response = await fetch(
        `http://localhost:5000/api/module/${moduleId}/addassessmentquestion/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: requestBody,
        }
      );
      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
      } else {
        console.error("Failed to save Question" + response.status);
      }

      // Reset input fields after adding a question
      setQuestionText("");
      setSelectedAnswer("");
      setQuestionText("");
      setSelectedAnswer("");
      setSelectedAnswers({});
    } else {
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

      const requestBody = JSON.stringify({
        questionNumber: questionData.length + 1,
        question: questionText || "New Question",
        answer: Array.isArray(selectedAnswers)
          ? selectedAnswers.filter((answer) => answer !== undefined)
          : [],
        correctAnswer:
          selectedAnswers !== ""
            ? selectedAnswer[selectedAnswer]
            : selectedAnswers[0],
        status: "active",
      });
      const response = await fetch(
        ` http://localhost:5000/api/assessment/${assessmentId}/addquestion`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: requestBody,
        }
      );
      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
      } else {
        console.error("Failed to save Question" + response.status);
      }

      // Reset input fields after adding a question
      setQuestionText("");
      setSelectedAnswer("");
      setQuestionText("");
      setSelectedAnswer("");
      setSelectedAnswers({});
    }
  };

  const dynamicHeight = 780 + numberOfAnswers * 55;

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
          <ModuleNav />

          <Box display="flex">
            <Box width="60%">
              <QuestionBox
                question="Assessment Name"
                onChange={(e) => {
                  setAssessmentName(e.target.value);
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
                <DTPicker
                  title="Open Time"
                  selectedDateTime={openTime}
                  onDateTimeChange={handleOpenTimeChange}
                />
                <DTPicker
                  title="Close Time"
                  selectedDateTime={closeTime}
                  onDateTimeChange={handleCloseTimeChange}
                />
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
              <LMSButton
                variant="contained"
                customHeight="40px"
                customWidth="250px"
                onClick={() => {
                  navigate("/lecturer/moduleMenu");
                }}
              >
                Create Assessment
              </LMSButton>
            </Box>
          </Box>
        </PaperBg>
      </Box>
    </Box>
  );
};

export default CreateAssessment;
