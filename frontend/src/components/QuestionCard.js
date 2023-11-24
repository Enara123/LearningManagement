import { React } from "react";
import { Box, Typography, Radio } from "@mui/material";
import PaperBg from "./PaperBg";
import { useState } from "react";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

const QuestionCard = ({ questionNumber, question, answer, correctAnswer }) => {
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [numberOfAnswers, setNumberOfAnswers] = useState(4);

  const handleRadioChange = (event) => {
    setSelectedAnswer(event.target.value);
  };
  const [selectedAnswers, setSelectedAnswers] = useState([]);

  const handleAnswerChange = (questionIndex, answer) => {
    setSelectedAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[questionIndex] = answer;
      return updatedAnswers;
    });
  };

  return (
    <Box>
      <PaperBg customWidth={1020} customHeight={"80%"}>
        <Box sx={{ padding: "30px" }}>
          <Typography variant="h4">{`Question ${questionNumber}`}</Typography>
          <Typography variant="body1" mt="10px" sx={{ fontSize: "24px" }}>
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
              {answer.map((answerOne, index) => (
                <Box
                  key={index}
                  display="flex"
                  alignItems="center"
                  sx={{ padding: "30px", paddingLeft: "20px" }}
                >
                  <FormControlLabel value={String(index)} control={<Radio />} />
                  <Typography variant="h5" sx={{ flex: "0 0 60px" }}>
                    {` ${String.fromCharCode(65 + index)} .`}
                  </Typography>
                  <Typography
                    variant="outlined"
                    checked={selectedAnswer === String(index)}
                    value={answerOne || ""}
                    onChange={(e) => {
                      handleAnswerChange(index, e.target.value);
                    }}
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      border: "1px solid #A0AAB4",
                      borderRadius: "10px",
                      width: "100%",
                      height: "55px",
                      padding: "10px 20px",
                      fontSize: "20px",
                    }}
                  >
                    {answerOne}
                  </Typography>
                </Box>
              ))}
            </RadioGroup>
          </Box>
        </Box>
      </PaperBg>
    </Box>
  );
};

export default QuestionCard;
