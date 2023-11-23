import { Box, Typography } from "@mui/material";
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

const CreateQuiz = () => {
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

  return (
    <Box mt="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header subtitle="Modules > Create Module" />
      </Box>
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
          <Typography
            variant="h3"
            color={colors.blueAccent[500]}
            onClick={() => {
              alert("Hello");
            }}
            sx={{ cursor: "pointer" }}
          >
            {">"} &nbsp;&nbsp;Create Quiz
          </Typography>
        </Box>

        <QuestionBox
          question="Question"
          onChange={(e) => {
            console.log(e.target.value);
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
              marks
              min={1}
              max={5}
              onChange={(e) => {
                // console.log(e.target.value);
              }}
            />
          </Box>
        </Box>

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
            alignItems="center"
            sx={{ paddingLeft: "1200px" }}
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
            Add Question
          </LMSButton>
          <LMSButton
            variant="contained"
            customFontSize="14px"
            customHeight="40px"
            customWidth="130px"
          >
            Hide
          </LMSButton>
        </Box>
      </PaperBg>
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
