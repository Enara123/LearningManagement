import React, { useState } from "react";
import { Box, Typography, Radio, Button } from "@mui/material";
import PaperBg from "./PaperBg";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

const QuestionCard = ({
  questionNumber,
  question,
  answers,
  correctAnswer,
  onNext,
  onPrevious,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [selectedAnswers, setSelectedAnswers] = useState([]);

  const handleRadioChange = (event) => {
    setSelectedAnswer(event.target.value);
  };

  const handleAnswerChange = (answer) => {
    setSelectedAnswers(answer);
  };

  return (
    <Box>
      <PaperBg customWidth={1020} customHeight={"80%"}>
        <Box sx={{ padding: "30px" }}>
          <Typography variant="h4">Question Number {questionNumber}</Typography>
          <Typography variant="body1" mt="10px">
            {question}
          </Typography>
          <Box flexDirection="row">
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              value={selectedAnswer}
              name="radio-buttons-group"
              onChange={(e) => {
                handleRadioChange(e);
              }}
            >
              {answers.map((answer, index) => (
                <Box
                  key={index}
                  display="flex"
                  alignItems="center"
                  sx={{ padding: "30px", paddingLeft: "20px" }}
                >
                  <FormControlLabel value={answer} control={<Radio />} />
                  <Typography variant="h5" sx={{ flex: "0 0 100px" }}>
                    {`Answer ${index + 1}`}
                  </Typography>
                  <Typography
                    variant="outlined"
                    checked={selectedAnswer === answer}
                    value={selectedAnswers[index] || ""}
                    onChange={() => {
                      handleAnswerChange(answer);
                    }}
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      border: "1px solid #A0AAB4",
                      borderRadius: "10px",
                      width: "100%",
                      height: "55px",
                      padding: "10px 20px",
                    }}
                  >
                    {answer}
                  </Typography>
                </Box>
              ))}
            </RadioGroup>
          </Box>
        </Box>
      </PaperBg>
      <Box
        display="flex"
        justifyContent="space-between"
        sx={{ mt: "20px", mb: "50px" }}
      >
        <Button sx={{ fontSize: "16px" }} onClick={onPrevious}>
          {"<"} Previous
        </Button>
        <Button sx={{ fontSize: "16px" }} onClick={onNext}>
          Next {">"}
        </Button>
      </Box>
    </Box>
  );
};

export default QuestionCard;
