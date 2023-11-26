import { Box, Typography } from "@mui/material";
import Header from "../../components/Header";
import PaperBg from "../../components/PaperBg";

const LecDashboard = () => {
  return (
    <Box mt="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Dashboard" subtitle="Welcome to your dashboard" />
      </Box>

      {/* Main section into two */}
      <Box display="flex">
        <Box display="flex">
          {/* 1st section with 4 boxes */}
          <Box display="flex" flexWrap="wrap">
            {/* 2 Rows */}
            <Box display="flex">
              {/* 2 boxes */}
              <Box>
                <PaperBg customWidth={384} customHeight={412}>
                  1
                  <Typography sx={{ ml: "20px" }} variant="h4">
                    Existing Modules
                  </Typography>
                </PaperBg>
              </Box>
              <Box>
                <PaperBg customWidth={699} customHeight={415}>
                  2
                  <Typography sx={{ ml: "20px" }} variant="h4">
                    Student Overview
                  </Typography>
                </PaperBg>
              </Box>
            </Box>
            <Box display="flex">
              {/* 2 boxes */}
              <Box>
                <PaperBg customWidth={384} customHeight={412}>
                  3
                  <Typography sx={{ ml: "20px" }} variant="h4">
                    Module Pass Rate
                  </Typography>
                </PaperBg>
              </Box>
              <Box>
                <PaperBg customWidth={699} customHeight={415}>
                  4
                  <Typography sx={{ ml: "20px" }} variant="h4">
                    Latest Results
                  </Typography>
                </PaperBg>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box>
          {/* Calender */}
          <PaperBg customWidth={394} customHeight={890}>
            5
            <Typography sx={{ ml: "20px" }} variant="h4">
              Assignment Schedule
            </Typography>
          </PaperBg>
        </Box>
      </Box>
    </Box>
  );
};

export default LecDashboard;
