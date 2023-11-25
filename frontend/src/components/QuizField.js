import { Box, Typography } from "@mui/material";

const QuizField = ({ title, time, duration, score, assessmentId }) => {
  const formatLocalDate = (utcDate) => {
    const date = new Date(utcDate);
    if (isNaN(date)) {
      return "Invalid Date";
    }
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };
    const dateFormatter = new Intl.DateTimeFormat("en-US", options);
    const formattedDate = dateFormatter.format(date);

    const timeOptions = {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true, // Use 24-hour format
    };
    const timeFormatter = new Intl.DateTimeFormat("en-US", timeOptions);
    const formattedTime = timeFormatter.format(date);

    return `Date: ${formattedDate} Time: ${formattedTime}`;
  };

  const newDate = formatLocalDate(time);

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
      <Typography variant="body1"> {newDate}</Typography>
      <Typography variant="body1">Duration: {duration}</Typography>
      <Typography variant="h5" color="#0be2e2">
        Score: {score}
      </Typography>
    </Box>
  );
};

export default QuizField;
