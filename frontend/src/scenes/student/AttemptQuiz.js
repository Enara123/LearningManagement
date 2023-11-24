import { Box, Typography } from "@mui/material";
import Header from "../../components/Header";
import PaperBg from "../../components/PaperBg";
import QuestionCard from "../../components/QuestionCard";
import LMSButton from "../../components/LMSButton";
import { useState } from "react";

const QuestionPreview = ({ number }) => {
  return (
    <Box
      sx={{
        width: "35px",
        height: "46px",
        backgroundColor: "#D9D9D9",
        margin: "10px",
      }}
    >
      <Typography variant="h6" textAlign="center">
        {number}
      </Typography>
      <Box sx={{ width: "35px", height: "23px", backgroundColor: "#505050" }} />
    </Box>
  );
};

const AttemptQuiz = () => {
  return (
    <Box mt="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Attempt Quiz" subtitle="Courses > C++ Programming" />
      </Box>
      <Box display="flex">
        {/* Question Card */}
        <Box>
          <LMSButton
            variant="contained"
            customHeight="50px"
            customWidth="190px"
            customFontSize="16px"
            onClick={handleSubmit}
          ></LMSButton>
        </Box>

        {/* Quiz Navigation */}
        <Box sx={{ ml: "50px" }}>
          <PaperBg customWidth={442} customHeight={300}>
            <Box sx={{ padding: "20px 30px" }}>
              <Typography variant="h4">Quiz Navigation</Typography>
            </Box>
            <Box display="flex" flexWrap="wrap" sx={{ ml: "20px", mr: "20px" }}>
              <QuestionPreview number="1" />
              <QuestionPreview number="2" />
              <QuestionPreview number="3" />
              <QuestionPreview number="4" />
              <QuestionPreview number="5" />
              <QuestionPreview number="6" />
              <QuestionPreview number="7" />
              <QuestionPreview number="8" />
              <QuestionPreview number="9" />
              <QuestionPreview number="10" />
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
