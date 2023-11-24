import { Box, Typography } from "@mui/material";
import LMSButton from "./LMSButton";

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
        <Box>
          <LMSButton
            sx={{ mt: "0", mb: "0", mr: "10px" }}
            customWidth="130px"
            customHeight="40px"
            customFontSize="14px"
          >
            Attempt
          </LMSButton>
        </Box>
      </Box>
    </Box>
  );
};

export default UpcomingAct;
