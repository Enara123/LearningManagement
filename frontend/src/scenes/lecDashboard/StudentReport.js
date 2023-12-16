import { Box, Typography } from "@mui/material";
import Header from "../../components/Header";
import PaperBg from "../../components/PaperBg";
import React from "react";
import { Pie } from "react-chartjs-2";

const StudentReport = () => {
  const data = {
    labels: ["Label 1", "Label 2"],
    datasets: [
      {
        data: [40, 60],
        backgroundColor: ["#444444", "#0BE2E2"],
        hoverBackgroundColor: ["#444444", "#0BE2E2"],
      },
    ],
  };
  return (
    <Box mt="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Students Performance Report" />
      </Box>
      <Box>
        <PaperBg customWidth={1200} customHeight={500}>
          <Box display="flex" justifyContent="space-between">
            <Box sx={{ textAlign: "center", pt: "50px", pl: "50px" }}>
              <Pie data={data} />
              <Typography variant="h4" mt="20px">
                Completed Percentage
              </Typography>
            </Box>
          </Box>
        </PaperBg>
      </Box>
    </Box>
  );
};

export default StudentReport;
