import { Box, Typography } from "@mui/material";

const UpcomingAct = ({ title, time, duration, assessmentId }) => {
  return (
    <Box
      sx={{
        padding: "10px",
        marginTop: "20px",
      }}
    >
      <Typography variant="h4" fontWeight="bold" marginBottom="10px">
        {title}
      </Typography>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography sx={{ mr: "20px" }}>Start Time & Date: {time}</Typography>
          <Typography>Time Duration: {duration}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default UpcomingAct;
