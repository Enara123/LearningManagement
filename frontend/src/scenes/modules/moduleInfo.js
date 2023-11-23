import { Box, Typography } from "@mui/material";
import Header from "../../components/Header";
import PaperBg from "../../components/PaperBg";
import LMSButton from "../../components/LMSButton";
import AssessmentField from "../../components/AssessmentField";
import AssessmentSchedule from "../../components/AssessmentSchedule";

const ModuleInfo = () => {
  return (
    <Box mt="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="Software Engineering"
          subtitle="Modules > Software Engineering"
        />
      </Box>
      <Box>
        <PaperBg customWidth={1582} customHeight={180}>
          <Box sx={{ padding: "30px" }}>
            <Typography variant="h3">Module Description</Typography>
            <Typography variant="body1" sx={{ mt: "10px" }}>
              Load text here.
            </Typography>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box display="flex" justifyContent="space-between">
                <Typography sx={{ mr: "20px" }}>No of Assessments</Typography>
                <Typography sx={{ mr: "20px" }}>Study time</Typography>
                <Typography sx={{ mr: "20px" }}>Difficulty</Typography>
              </Box>
              <LMSButton
                customWidth="130px"
                customHeight="40px"
                customFontSize="14px"
              >
                Edit
              </LMSButton>
            </Box>
          </Box>
        </PaperBg>
      </Box>

      <Box display="flex" sx={{ mt: "30px" }}>
        <PaperBg customWidth={1080} customHeight={700}>
          <Box sx={{ padding: "30px" }}>
            <Typography variant="h3">Module Content</Typography>
            <AssessmentField />
          </Box>
        </PaperBg>
        <PaperBg customWidth={476} customHeight={694}>
          <Box sx={{ padding: "30px" }}>
            <Typography variant="h3">Assessment Schedule</Typography>
            <AssessmentSchedule />
          </Box>
        </PaperBg>
      </Box>
    </Box>
  );
};

export default ModuleInfo;
