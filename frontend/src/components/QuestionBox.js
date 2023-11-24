import React from "react";
import { Box, Typography } from "@mui/material";
import StyledTextField from "./StyledTextField";

function QuestionBox({ question, onChange, value }) {
  return (
    <Box
      display="flex"
      alignItems="center"
      sx={{ padding: "30px", paddingLeft: "100px" }}
    >
      <Typography variant="h4" sx={{ flex: "0 0 250px" }}>
        {question}
      </Typography>
      <StyledTextField
        variant="outlined"
        value={value}
        onChange={onChange}
        fullWidth
      />
    </Box>
  );
}

export default QuestionBox;
