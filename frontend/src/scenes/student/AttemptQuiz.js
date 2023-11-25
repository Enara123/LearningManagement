import { Box, Button, Typography } from "@mui/material";
import Header from "../../components/Header";
import PaperBg from "../../components/PaperBg";
import QuestionCard from "../../components/QuestionCard";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

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
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const { moduleId } = useParams();

  useEffect(() => {
    const fetchQuestionData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/module/${moduleId}/getquestions`
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch module details: ${response.status}`);
        }

        const responseData = await response.json();
        setQuestionData(responseData);
      } catch (error) {
        console.error("Error fetching question data: ", error);
      }
    };
    fetchQuestionData();
  }, [moduleId]);

  const handleNextClick = () => {
    setCurrentQuestionIndex((prevIndex) =>
      Math.min(prevIndex + 1, questionData.length - 1)
    );
  };

  const handlePrevClick = () => {
    setCurrentQuestionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  if (!questionData) {
    return <p>Loading...</p>;
  }

  const currentQuestion = questionData[currentQuestionIndex];

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
            <Button
              sx={{ fontSize: "16px", color: "#5D5D5D" }}
              onClick={handleNextClick}
            >
              Next {">"}{" "}
            </Button>
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
            <Typography variant="h5" color="#FF0000" m="20px 30px">
              Time: 00:00:00
            </Typography>
          </PaperBg>
        </Box>
      </Box>
    </Box>
  );
};

export default AttemptQuiz;
