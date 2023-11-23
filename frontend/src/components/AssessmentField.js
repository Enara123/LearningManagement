import { Box, Typography } from "@mui/material";
import LMSButton from "./LMSButton";

const AssessmentField = ({ title, questions, duration, assessmentId }) => {
  return (
    <Box
      sx={{
        border: "1px solid #A0AAB4",
        borderRadius: "10px",
        padding: "10px",
        marginTop: "20px",
      }}
    >
      <Typography variant="h4" fontWeight="bold">
        {title}
      </Typography>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box display="flex">
          <Typography sx={{ mr: "20px" }}>{questions}</Typography>
          <Typography>{duration}</Typography>
        </Box>
        <Box>
          <LMSButton
            sx={{ mt: "0", mb: "0", mr: "10px" }}
            customWidth="130px"
            customHeight="40px"
            customFontSize="14px"
          >
            View
          </LMSButton>
          <LMSButton
            sx={{ m: "0" }}
            customWidth="130px"
            customHeight="40px"
            customFontSize="14px"
          >
            Edit
          </LMSButton>
        </Box>
      </Box>
    </Box>
  );
};

export default AssessmentField;
