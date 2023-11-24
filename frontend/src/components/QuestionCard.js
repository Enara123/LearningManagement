import { React } from "react";
import { Box, Typography, Radio, Button } from "@mui/material";
import PaperBg from "./PaperBg";
import { useState } from "react";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

const QuestionCard = ({ question }) => {
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
          <Typography variant="h4">Question Number</Typography>
          <Typography variant="body1" mt="10px">
            Which of the following is the correct syntax of including a user
            defined header files in C++?
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
              {[...Array(numberOfAnswers)].map((_, index) => (
                <Box
                  key={index}
                  display="flex"
                  alignItems="center"
                  sx={{ padding: "30px", paddingLeft: "20px" }}
                >
                  <FormControlLabel value={String(index)} control={<Radio />} />
                  <Typography variant="h5" sx={{ flex: "0 0 100px" }}>
                    {`Answer ${index + 1}`}
                  </Typography>
                  <Typography
                    variant="outlined"
                    checked={selectedAnswer === String(index)}
                    value={selectedAnswers[index] || ""}
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
                    }}
                  ></Typography>
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
        <Button sx={{ fontSize: "16px" }}>{"<"} Previous</Button>
        <Button sx={{ fontSize: "16px" }}>Next {">"} </Button>
      </Box>
    </Box>
  );
};

export default QuestionCard;
