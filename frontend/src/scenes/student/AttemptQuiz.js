import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import Header from "../../components/Header";
import PaperBg from "../../components/PaperBg";
import QuestionCard from "../../components/QuestionCard";
import { useNavigate, useParams } from "react-router-dom";

const QuestionPreview = ({ number, active, onClick }) => {
  return (
    <Box
      onClick={onClick}
      sx={{
        cursor: "pointer",
        width: "35px",
        height: "46px",
        backgroundColor: "#D9D9D9",
        margin: "10px",
      }}
    >
      <Typography variant="h6" textAlign="center" color="#000000">
        {number}
      </Typography>
      <Box
        sx={{
          width: "35px",
          height: "23px",
          backgroundColor: active ? "#0BE2E2" : "#505050",
        }}
      />
    </Box>
  );
};

const AttemptQuiz = () => {
  const [questionData, setQuestionData] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [answer, setAnswer] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const { moduleId } = useParams();

  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes in seconds
  const history = useNavigate();

  useEffect(() => {
    // Update the timer every second
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => Math.max(0, prevTime - 1));
    }, 1000);

    return () => clearInterval(timer); // Clear the interval on component unmount
  }, []);

  useEffect(() => {
    // Check if the timer has reached zero and submit the quiz
    if (timeLeft === 0) {
      handleSubmitClick();
    }
  }, [timeLeft]);

  useEffect(() => {
    const fetchQuestionData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/module/${moduleId}/getquestions/656235540fd3ff5e42180fb2`
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch module details: ${response.status}`);
        }

        const responseData = await response.json();
        setQuestionData(responseData);

        setSelectedAnswers(Array(responseData.length).fill(""));
      } catch (error) {
        console.error("Error fetching question data: ", error);
      }
    };
    fetchQuestionData();
  }, [moduleId]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")} Minutes ${String(
      remainingSeconds
    ).padStart(2, "0")} Seconds`;
  };

  const handleNextClick = () => {
    const newIndex = Math.min(
      currentQuestionIndex + 1,
      questionData.length - 1
    );
    setCurrentQuestionIndex(newIndex);
  };

  const handlePrevClick = () => {
    const newIndex = Math.max(currentQuestionIndex - 1, 0);
    setCurrentQuestionIndex(newIndex);
  };

  const handleRadioChange = (event) => {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[currentQuestionIndex] = event.target.value;
    setSelectedAnswers(updatedAnswers);
    setAnswer(questionData[currentQuestionIndex].answer[event.target.value]);
  };

  const handleSubmitClick = async () => {
    var correctCount = 0;
    for (let i = 0; i < questionData.length; i++) {
      if (
        questionData[i].correctAnswer.includes(
          questionData[i].answer[selectedAnswers[i]]
        )
      ) {
        correctCount++;
      }
    }

    try {
      const studentId = "6561748bb324cfe270193b7c";
      const marks = correctCount;
      const asnweredQuestions = questionData.map((question, index) => ({
        questionId: question._id,
      }));

      console.log(asnweredQuestions);
      const requestBody = JSON.stringify({
        studentId,
        moduleId,
        marks,
        asnweredQuestions,
      });

      const response = await fetch("http://localhost:5000/api/quiz/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: requestBody,
      });

      if (response.ok) {
        console.log(response.status);
        history(`/student/course-info/${moduleId}`);
      } else {
        console.log(response.status);
        history(`/student/course-info/${moduleId}`);
      }
    } catch (error) {
      console.log(error);
      history(`/student/course-info/${moduleId}`);
    }

    console.log(`${correctCount}/${questionData.length}`);
  };

  if (!questionData) {
    return <p>Loading...</p>;
  }

  const currentQuestion = questionData[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questionData.length - 1;

  return (
    <Box mt="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Attempt Quiz" />
      </Box>
      <Box display="flex">
        <Box>
          <QuestionCard
            key={currentQuestion.questionId}
            questionNumber={currentQuestionIndex + 1}
            question={currentQuestion.question}
            answer={currentQuestion.answer}
            correctAnswer={currentQuestion.correctAnswer}
            selectedAnswer={selectedAnswers[currentQuestionIndex]}
            handleRadioChange={handleRadioChange}
          />
          <Box
            display="flex"
            justifyContent="space-between"
            sx={{
              mt: "20px",
              mb: "50px",
              paddingRight: "80px",
              paddingLeft: "80px",
            }}
          >
            <Button
              sx={{ fontSize: "16px", color: "#5D5D5D" }}
              onClick={handlePrevClick}
            >
              {"<"} Previous
            </Button>
            {isLastQuestion ? (
              <Button
                variant="contained"
                color="primary"
                sx={{ fontSize: "16px" }}
                onClick={handleSubmitClick}
              >
                Submit
              </Button>
            ) : (
              <Button
                sx={{ fontSize: "16px", color: "#5D5D5D" }}
                onClick={handleNextClick}
              >
                Next {">"}{" "}
              </Button>
            )}
          </Box>
        </Box>

        <Box sx={{ ml: "50px" }}>
          <PaperBg customWidth={442} customHeight={300}>
            <Box sx={{ padding: "20px 30px" }}>
              <Typography variant="h4">Quiz Navigation</Typography>
            </Box>
            <Box display="flex" flexWrap="wrap" sx={{ ml: "20px", mr: "20px" }}>
              {questionData.map((question, index) => (
                <QuestionPreview
                  key={index}
                  number={index + 1}
                  active={index === currentQuestionIndex}
                  onClick={() => setCurrentQuestionIndex(index)}
                />
              ))}
            </Box>
            <Typography
              variant="h5"
              color="#FF0000"
              m="20px 30px"
              sx={{ fontSize: "22px" }}
            >
              {`Time Left: ${formatTime(timeLeft)}`}
            </Typography>
          </PaperBg>
        </Box>
      </Box>
    </Box>
  );
};

export default AttemptQuiz;
