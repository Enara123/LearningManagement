import { Box, Typography } from "@mui/material";

const AssessmentSchedule = ({
  title,
  status,
  time,
  duration,
  assessmentId,
}) => {
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
      <Typography variant="body1">Status: {status}</Typography>
      <Typography variant="body1">Start Time & Duration: {time}</Typography>
      <Typography variant="body1">Duration: {duration}</Typography>
    </Box>
  );
};

export default AssessmentSchedule;
