import { Box, Typography } from "@mui/material";

const QuizField = ({ title, time, duration, score, assessmentId }) => {
  return (
    <Box
      sx={{
        padding: "10px",
        marginTop: "20px",
      }}
    >
      <Typography variant="h5" fontWeight="bold">
        {title}
      </Typography>
      <Typography variant="body1">Start Time & Duration: {time}</Typography>
      <Typography variant="body1">Duration: {duration}</Typography>
      <Typography variant="h5" color="#0be2e2">
        Score: {score}
      </Typography>
    </Box>
  );
};

export default QuizField;
