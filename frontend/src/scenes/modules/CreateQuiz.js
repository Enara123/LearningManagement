import { Box, Link, Typography } from "@mui/material";
import Header from "../../components/Header";
import PaperBg from "../../components/PaperBg";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import QuestionBox from "../../components/QuestionBox";
import Slider from "@mui/material/Slider";
import styled from "@emotion/styled";
import { useState } from "react";
import Button from "@mui/material/Button";
import LMSButton from "../../components/LMSButton";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import StyledTextField from "../../components/StyledTextField";
import { Link as RouterLink, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ModuleNav from "../../components/ModuleNav";
import { useNavigate } from "react-router-dom";

const CreateQuiz = () => {
  var { moduleId } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.colors);
  const [numberOfAnswers, setNumberOfAnswers] = useState(4);
  const [questionsData, setQuestionsData] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [sliderValue, setSliderValue] = useState(1);
  const [questionText, setQuestionText] = useState("");
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(null);
  const [selectPreviewQuestion, setSelectPreviewQuestion] = useState(null);
  const handleIncrease = () => {
    if (numberOfAnswers < 5) {
      setNumberOfAnswers(numberOfAnswers + 1);
    }
  };

  const handlePreviewSelectedQuestion = (index) => {
    setSelectPreviewQuestion(index);
  };

  const handleDecrease = () => {
    if (numberOfAnswers > 3) {
      setNumberOfAnswers(numberOfAnswers - 1);
    }
  };
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

  const handleAddQuestion = async () => {
    if (questionText === "") {
      notify("Please enter a question");
      return;
    } else {
      moduleId = moduleId.split("=")[1];
      console.log(moduleId);
      const newQuestion = {
        questionNumber: questionsData.length + 1,
        question: questionText || "New Question",
        complexity: sliderValue,
        answers: selectedAnswers.filter((answer) => answer !== undefined),
        correctAnswer:
          selectedAnswer !== ""
            ? selectedAnswers[selectedAnswer]
            : selectedAnswers[0],
        status: "active",
      };
      setQuestionsData([...questionsData, newQuestion]);

      const requestBody = JSON.stringify({
        questionNumber: questionsData.length + 1,
        question: questionText || "New Question",
        complexity: sliderValue,
        answer: selectedAnswers.filter((answer) => answer !== undefined),
        correctAnswer:
          selectedAnswer !== ""
            ? selectedAnswers[selectedAnswer]
            : selectedAnswers[0],
        status: "active",
      });
      const response = await fetch(
        `http://localhost:5000/api/module/${moduleId}/addquestion`,
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
        const moduleId = responseData._id;
        console.log(moduleId);
        // Navigate to the next page with moduleId
      } else {
        console.error("Failed to save module" + response.status);
      }

      // Reset input fields after adding a question
      setQuestionText("");
      setSliderValue(1);
      setSelectedAnswer("");
    }
  };

  const handleSliderChange = (event, newValue) => {
    setSliderValue(newValue);
  };

  const handleRadioChange = (event) => {
    setSelectedAnswer(event.target.value);
  };

  const handlePreviewRadioChange = (event) => {
    const index = parseInt(event.target.value);
    setSelectedQuestionIndex(index);
    setQuestionText(questionsData[index]?.question || "");
    setSliderValue(questionsData[index]?.complexity || 1);
    setSelectedAnswers(questionsData[index]?.answers || {});

    // Find the index of the correct answer
    const correctAnswerIndex = Object.values(
      questionsData[index]?.answers || {}
    ).findIndex((answer) => answer === questionsData[index]?.correctAnswer);

    // Set the selectedAnswer to the correct answer index
    setSelectedAnswer(
      correctAnswerIndex !== -1 ? String(correctAnswerIndex) : ""
    );
  };

  const handleHideButtonClick = () => {
    if (selectedQuestionIndex !== null) {
      const updatedQuestionsData = [...questionsData];
      if (updatedQuestionsData[selectedQuestionIndex].status === "Hidden")
        updatedQuestionsData[selectedQuestionIndex].status = "Active";
      else {
        updatedQuestionsData[selectedQuestionIndex].status = "Hidden";
      }
      setQuestionsData(updatedQuestionsData);
    }
    console.log(questionsData);
  };

  const dynamicHeight = 780 + numberOfAnswers * 55;

  const [selectedAnswers, setSelectedAnswers] = useState([]);

  const handleAnswerChange = (questionIndex, answer) => {
    setSelectedAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[questionIndex] = answer;
      return updatedAnswers;
    });
  };

  return (
    <Box mt="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Create Quiz" subtitle="Modules > Create Module" />
      </Box>
      <PaperBg customWidth={1500} customHeight={dynamicHeight}>
        <Box display="flex">
          <Box width="60%">
            <ModuleNav />

            <QuestionBox
              question="Question"
              value={questionText}
              onChange={(e) => {
                setQuestionText(e.target.value);
              }}
            />
            <Box
              display="flex"
              alignItems="center"
              sx={{ padding: "30px", paddingLeft: "100px" }}
            >
              <Typography variant="h4" sx={{ flex: "0 0 250px" }}>
                Complexity
              </Typography>
              <Box sx={{ width: "1080px" }}>
                <PrettoSlider
                  defaultValue={1}
                  valueLabelDisplay="auto"
                  step={1}
                  value={typeof sliderValue === "number" ? sliderValue : 0}
                  marks
                  min={1}
                  max={5}
                  onChange={handleSliderChange}
                  aria-labelledby="input-slider"
                />
              </Box>
            </Box>

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
                Add Question
              </LMSButton>
              <LMSButton
                variant="contained"
                customFontSize="14px"
                customHeight="40px"
                customWidth="130px"
                onClick={handleHideButtonClick}
                style={{
                  display: questionsData.length === 0 ? "none" : "block",
                }}
              >
                {questionsData[selectPreviewQuestion] &&
                  (questionsData[selectPreviewQuestion].status === "Hidden"
                    ? "Unhide"
                    : "Hide")}
                {!questionsData[selectPreviewQuestion] && "Hide"}
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
              {questionsData.map((question, index) => (
                <div key={index} style={{ marginBottom: "20px" }}>
                  <Box display="flex" flexDirection="row" alignItems="center">
                    <Radio
                      checked={selectedQuestionIndex === index}
                      onChange={() => {
                        handlePreviewSelectedQuestion(index);
                        handlePreviewRadioChange({ target: { value: index } });
                      }}
                      value={index.toString()}
                    />
                    <Typography
                      variant="h4"
                      sx={{
                        flex: "0 0 180px",
                        color:
                          question.status === "Hidden" ? "#c8c8c8" : "inherit",
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
            <Box display="flex" justifyContent="center">
              <Link
                component={RouterLink}
                to="/create-assessment"
                underline="none"
                color="inherit"
              >
                <LMSButton
                  variant="contained"
                  customWidth="188px"
                  onClick={() => {
                    navigate(`/lecturer/create-assessment/${moduleId}`);
                  }}
                >
                  Create Quiz
                </LMSButton>
              </Link>
            </Box>
          </Box>
        </Box>
      </PaperBg>
      <ToastContainer />
    </Box>
  );
};

export default CreateQuiz;

const PrettoSlider = styled(Slider)({
  color: "#000",
  height: 8,
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-thumb": {
    height: 24,
    width: 24,
    backgroundColor: "#000",
    border: "2px solid currentColor",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
    },
    "&:before": {
      display: "none",
    },
  },
  "& .MuiSlider-valueLabel": {
    lineHeight: 1.2,
    fontSize: 12,
    background: "unset",
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: "50% 50% 50% 00%",
    backgroundColor: "#0be2e2",
    color: "#000",
    fontWeight: "bold",
    transformOrigin: "bottom left",
    transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
    "&:before": { display: "none" },
    "&.MuiSlider-valueLabelOpen": {
      transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
    },
    "& > *": {
      transform: "rotate(45deg)",
    },
  },
});
