import { Box, Typography, createTheme } from "@mui/material";
import Header from "../../components/Header";
import PaperBg from "../../components/PaperBg";
import chart1 from "../../icons/chart1.png";
import barchart from "../../icons/barchart.png";
import cp from "../../icons/cp.png";
import se from "../../icons/se.png";
import * as React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { ThemeProvider } from "@emotion/react";
import LMSButton from "../../components/LMSButton";

const LecDashboard = () => {
  return (
    <Box mt="20px">
      <Box>
        <Header title="Dashboard" subtitle="Welcome to your dashboard" />
      </Box>

      {/* Main section into two */}
      <Box display="flex">
        <Box display="flex">
          <Box display="flex" flexWrap="wrap">
            <Box display="flex">
              {/* Existing Modules Card*/}
              <Box>
                <PaperBg customWidth={384} customHeight={412}>
                  <Typography sx={{ mt: "30px", ml: "50px" }} variant="h4">
                    Existing Modules
                  </Typography>
                  {/* 1 Module Info */}
                  <Box display="flex" sx={{ padding: "20px 40px" }}>
                    <Box
                      sx={{
                        width: "25px",
                        height: "25px",
                        backgroundColor: "#A09D9D",
                      }}
                    />
                    <Box sx={{ ml: "20px" }}>
                      <Typography variant="h5" fontWeight="medium">
                        Software Engineering
                      </Typography>
                      <Box sx={{ ml: "10px", mt: "10px" }}>
                        <Typography> 5 Assessments </Typography>
                        <Typography> 15 Hours of study time </Typography>
                        <Typography> Moderate difficulty </Typography>
                      </Box>
                    </Box>
                  </Box>
                  {/* 2 Module Info */}
                  <Box display="flex" sx={{ padding: "10px 40px" }}>
                    <Box
                      sx={{
                        width: "25px",
                        height: "25px",
                        backgroundColor: "#666666",
                      }}
                    />
                    <Box sx={{ ml: "20px" }}>
                      <Typography variant="h5" fontWeight="medium">
                        C++ Programming
                      </Typography>
                      <Box sx={{ ml: "10px", mt: "10px" }}>
                        <Typography> 5 Assessments </Typography>
                        <Typography> 20 Hours of study time </Typography>
                        <Typography> Hard difficulty </Typography>
                      </Box>
                    </Box>
                  </Box>
                </PaperBg>
              </Box>

              {/* Students Overview Card*/}
              <Box>
                <PaperBg customWidth={669} customHeight={415}>
                  <Typography sx={{ ml: "50px", mt: "30px" }} variant="h4">
                    Student Overview
                  </Typography>
                  <Box display="flex" sx={{ mt: "50px", padding: "10px 40px" }}>
                    <img
                      src={chart1}
                      alt="Chart"
                      style={{
                        marginTop: "10px",
                        width: "200px",
                      }}
                    />
                    <Box sx={{ mt: "100px", ml: "50px" }}>
                      <Box display="flex" alignItems="center">
                        <Box
                          sx={{
                            width: "25px",
                            height: "25px",
                            backgroundColor: "#0BE2E2",
                          }}
                        />
                        <Typography sx={{ ml: "10px", mt: "10px" }}>
                          {" "}
                          Active Learners - 821{" "}
                        </Typography>
                      </Box>
                      <Box display="flex" alignItems="center">
                        <Box
                          sx={{
                            width: "25px",
                            height: "25px",
                            backgroundColor: "#A09D9D",
                          }}
                        />
                        <Typography sx={{ ml: "10px", mt: "10px" }}>
                          {" "}
                          Learners with medium risk factor - 212{" "}
                        </Typography>
                      </Box>
                      <Box display="flex" alignItems="center">
                        <Box
                          sx={{
                            width: "25px",
                            height: "25px",
                            backgroundColor: "#444444",
                          }}
                        />
                        <Typography sx={{ ml: "10px", mt: "10px" }}>
                          {" "}
                          Learners with high risk factor - 488{" "}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </PaperBg>
              </Box>
            </Box>

            <Box display="flex">
              {/* Module Pass Rate Card*/}
              <Box>
                <PaperBg customWidth={693} customHeight={439}>
                  <Typography sx={{ ml: "50px", mt: "30px" }} variant="h4">
                    Module Pass Rate
                  </Typography>
                  <Box display="flex" sx={{ mt: "50px", padding: "10px 40px" }}>
                    <img
                      src={barchart}
                      alt="Chart"
                      style={{
                        marginTop: "10px",
                        width: "400px",
                      }}
                    />
                    <Box sx={{ mt: "100px", ml: "20px" }}>
                      <Box display="flex" alignItems="center">
                        <Box
                          sx={{
                            width: "25px",
                            height: "25px",
                            backgroundColor: "#0BE2E2",
                          }}
                        />
                        <Typography sx={{ ml: "10px", mt: "10px" }}>
                          {" "}
                          C++ Programming{" "}
                        </Typography>
                      </Box>
                      <Box display="flex" alignItems="center">
                        <Box
                          sx={{
                            width: "25px",
                            height: "25px",
                            backgroundColor: "#A09D9D",
                          }}
                        />
                        <Typography sx={{ ml: "10px", mt: "10px" }}>
                          {" "}
                          Software Engineering{" "}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </PaperBg>
              </Box>

              {/* Latest Results Card*/}
              <Box>
                <PaperBg customWidth={390} customHeight={439}>
                  <Typography sx={{ ml: "50px", mt: "30px" }} variant="h4">
                    Latest Results
                  </Typography>
                  <Typography
                    variant="h1"
                    fontWeight="bold"
                    color="#0BE2E2"
                    sx={{ ml: "50px", mt: "30px" }}
                  >
                    12.23 %
                  </Typography>
                  <Typography variant="body1" sx={{ ml: "50px", mt: "5px" }}>
                    Overall Performance Increase
                  </Typography>
                  <Box sx={{ ml: "50px", mt: "5px" }}>
                    <Typography sx={{ mt: "30px" }}>C++ Programming</Typography>
                    <img
                      src={cp}
                      alt="C++"
                      style={{
                        marginTop: "10px",
                        width: "300px",
                      }}
                    />
                    <Typography sx={{ mt: "20px" }}>
                      Software Engineering
                    </Typography>
                    <img
                      src={se}
                      alt="se"
                      style={{
                        marginTop: "10px",
                        width: "300px",
                      }}
                    />
                  </Box>
                </PaperBg>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box>
          {/* Calender */}
          <PaperBg customWidth={394} customHeight={890}>
            <Typography sx={{ ml: "50px", mt: "30px" }} variant="h4">
              Assignment Schedule
            </Typography>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <ThemeProvider theme={createTheme({ palette: { mode: "dark" } })}>
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
            <Typography variant="h6" sx={{ ml: "50px", mt: "30px" }}>
              Upcoming Activities
            </Typography>
          </PaperBg>
        </Box>
      </Box>
    </Box>
  );
};

export default LecDashboard;
