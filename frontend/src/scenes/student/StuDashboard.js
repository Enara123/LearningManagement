import { Box, Typography, createTheme } from "@mui/material";
import Header from "../../components/Header";
import PaperBg from "../../components/PaperBg";
import courses from "../../icons/courses.png";
import completed from "../../icons/completed.png";
import study from "../../icons/study.png";
import cpcourse from "../../icons/cpcourse.png";
import secourse from "../../icons/secourse.png";
import ra from "../../icons/ra.png";
import LMSButton from "../../components/LMSButton";
import * as React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { ThemeProvider } from "@emotion/react";

const StuDashboard = () => {
  return (
    <Box mt="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Dashboard" subtitle="Welcome to your dashboard" />
      </Box>
      <Box display="flex" flexDirection="row">
        <Box>
          <PaperBg customWidth={342} customHeight={236}>
            <Box sx={{ textAlign: "center" }}>
              <img
                src={courses}
                alt="courses"
                style={{
                  marginTop: "40px",
                  width: "65px",
                }}
              />
              <Typography variant="h1" fontWeight="bold" color="#0BE2E2">
                2
              </Typography>
              <Typography variant="h6">Active Courses</Typography>
            </Box>
          </PaperBg>

          <Box sx={{ mt: "10px" }}>
            <PaperBg customWidth={342} customHeight={236}>
              <Box sx={{ textAlign: "center" }}>
                <img
                  src={completed}
                  alt="completed"
                  style={{
                    marginTop: "40px",
                    width: "65px",
                  }}
                />
                <Typography variant="h1" fontWeight="bold" color="#0BE2E2">
                  0
                </Typography>
                <Typography variant="h6">Completed Courses</Typography>
              </Box>
            </PaperBg>
          </Box>

          <Box sx={{ mt: "10px" }}>
            <PaperBg customWidth={342} customHeight={236}>
              <Box sx={{ textAlign: "center" }}>
                <img
                  src={study}
                  alt="study"
                  style={{
                    marginTop: "40px",
                    width: "65px",
                  }}
                />
                <Typography
                  variant="h1"
                  fontWeight="bold"
                  color="#0BE2E2"
                  sx={{ mt: "10px" }}
                >
                  4h 35m
                </Typography>
                <Typography variant="h6">Total Study Hours</Typography>
              </Box>
            </PaperBg>
          </Box>
        </Box>

        <Box>
          <PaperBg customWidth={589} customHeight={220}>
            <Typography sx={{ ml: "50px", mt: "30px" }} variant="h4">
              Notifications
            </Typography>

            <Box display="flex" sx={{ padding: "20px 40px" }}>
              <Box
                sx={{
                  width: "25px",
                  height: "25px",
                  backgroundColor: "#0BE2E2",
                  borderRadius: "50px",
                }}
              />
              <Box sx={{ ml: "20px" }}>
                <Typography variant="h5" fontWeight="medium">
                  Software Engineering
                </Typography>
                <Box sx={{ ml: "10px", mt: "10px" }}>
                  <Typography> Start Time & Date: 10:30 AM, 5 Nov </Typography>
                  <Typography> Time Duration: 30 mins </Typography>
                </Box>
              </Box>
              <LMSButton
                customWidth="130px"
                customHeight="40px"
                customFontSize="14px"
                sx={{ ml: "50px" }}
              >
                View
              </LMSButton>
            </Box>
          </PaperBg>

          <Box sx={{ mt: "30px" }}>
            <PaperBg customWidth={590} customHeight={404}>
              <Typography sx={{ ml: "50px", mt: "30px" }} variant="h4">
                Courses
              </Typography>
              <Box sx={{ ml: "50px", mt: "30px" }}>
                <Typography>C++ Programming</Typography>
                <img
                  src={cpcourse}
                  alt="cpcourse"
                  style={{
                    marginTop: "10px",
                    width: "475px",
                  }}
                />
              </Box>
              <Box sx={{ ml: "50px", mt: "30px" }}>
                <Typography>Software Engineering</Typography>
                <img
                  src={secourse}
                  alt="secourse"
                  style={{
                    marginTop: "10px",
                    width: "475px",
                  }}
                />
              </Box>
            </PaperBg>
          </Box>
        </Box>

        <Box textAlign="center">
          <PaperBg customWidth={394} customHeight={890}>
            <Box>
              <Typography sx={{ mt: "30px" }} variant="h4">
                Event Calender
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <ThemeProvider
                  theme={createTheme({ palette: { mode: "dark" } })}
                >
                  <Box
                    sx={{
                      m: "20px 30px",
                      backgroundColor: "#000",
                      color: "#fff",
                      borderRadius: "20px",
                    }}
                  >
                    <DateCalendar />
                  </Box>
                </ThemeProvider>
              </LocalizationProvider>
            </Box>
            <Box>
              <Typography sx={{ mt: "30px" }} variant="h4">
                Recently Accessed
              </Typography>
              <img
                src={ra}
                alt="ra"
                style={{
                  marginTop: "10px",
                  width: "350px",
                }}
              />
            </Box>
          </PaperBg>
        </Box>
      </Box>
    </Box>
  );
};

export default StuDashboard;
