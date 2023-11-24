import { Box, Typography } from "@mui/material";
import Header from "../../components/Header";
import PaperBg from "../../components/PaperBg";
import UpcomingAct from "../../components/UpcomingAct";
import StuAssessField from "../../components/StuAssessField";
import QuizField from "../../components/QuizField";

const CourseInfo = () => {
  return (
    <Box mt="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="C++ Programming" subtitle="Courses > C++ Programming" />
      </Box>
      <Box display="flex">
        <Box>
          <Box>
            <PaperBg customWidth={1075} customHeight={215}>
              <Box sx={{ padding: "30px" }}>
                <Typography variant="h3">Upcoming Activities</Typography>
                <UpcomingAct />
              </Box>
            </PaperBg>
          </Box>
          <Box mt="30px">
            <PaperBg customWidth={1075} customHeight={655}>
              <Box sx={{ padding: "30px" }}>
                <Typography variant="h3">Course Content</Typography>
                <StuAssessField />
              </Box>
            </PaperBg>
          </Box>
        </Box>

        <Box>
          <PaperBg customWidth={470} customHeight={900}>
            <Box sx={{ padding: "30px" }}>
              <Typography variant="h3">Quiz Attempts</Typography>
              <QuizField />
            </Box>
          </PaperBg>
        </Box>
      </Box>
    </Box>
  );
};

export default CourseInfo;
