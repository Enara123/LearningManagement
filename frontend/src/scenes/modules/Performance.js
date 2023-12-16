import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import PaperBg from "../../components/PaperBg";
import Header from "../../components/Header";
import React, { useState } from "react";
import { Line, Chart} from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import LMSButton from "../../components/LMSButton";
import { useReactToPrint } from "react-to-print";
import html2pdf from "html2pdf.js";

const Performance = () => {
  const [attemptData, setAttemptData] = useState([]);
  const [expandedRow, setExpandedRow] = useState(null);
  const { moduleId } = useParams();

  const componentRef = React.useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "PerformanceReport",
    onBeforePrint: () => {
      // Add any logic needed before printing
    },
    onAfterPrint: () => {
      // Add any logic needed after printing
    },
  });

  const generateReport = () => {
    const content = componentRef.current;

    html2pdf(content, {
      margin: 10,
      filename: "PerformanceReport.pdf",
      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "portrait",
      },
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/quiz/getmarks/${moduleId}`
        );
        setAttemptData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const calculateAverageMarks = (marksPercentage) => {
    const sum = marksPercentage.reduce((acc, mark) => acc + mark, 0);
    return (sum / marksPercentage.length).toFixed(2);
  };

  const handleViewClick = (rowId) => {
    setExpandedRow(expandedRow === rowId ? null : rowId);
  };

  return (
    <Box mt="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Module Performance" subtitle="View Students Performance" />
      </Box>
      <Box>
        <PaperBg customWidth={1200} customHeight={500}>
          <Box sx={{ padding: "30px" }}>
            <Typography variant="h3" mb="30px">
              Ranking
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Rank</TableCell>
                    <TableCell>Student ID</TableCell>
                    <TableCell>No of attempts</TableCell>
                    <TableCell>Avg Marks</TableCell>
                    <TableCell>Highest Mark</TableCell>
                    <TableCell>Lowest Mark</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {attemptData.map((row) => (
                    <React.Fragment key={row.id}>
                      <TableRow>
                        <TableCell>#{row.rank}</TableCell>
                        <TableCell>{row.indexNumber}</TableCell>
                        <TableCell>{row.noOfAttempts}</TableCell>
                        <TableCell>{calculateAverageMarks(row.marksPercentage) + ' (' + row.grade + ")"}</TableCell>
                        <TableCell>{row.highestMark}</TableCell>
                        <TableCell>{row.lowestMark}</TableCell>
                        <TableCell>
                          <Button onClick={() => handleViewClick(row.id)}>
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                      {expandedRow === row.id && (
                        <TableRow>
                          <TableCell colSpan={7}>
                            {/* Space for line chart (to be implemented) */}
                            <Line
                              data={{
                                labels: Array.from(
                                  { length: row.attempts.length },
                                  (_, i) => `Attempt ${i + 1}`
                                ),
                                datasets: [
                                  {
                                    label: "Quiz Marks",
                                    data: row.attempts.map((item) => item.marks),
                                    fill: false,
                                    borderColor: "rgb(75, 192, 192)",
                                    tension: 0.1,
                                  },
                                ],
                              }}
                            />
                          </TableCell>
                        </TableRow>
                      )}
                    </React.Fragment>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </PaperBg>
        <LMSButton style={{width: "200px", fontSize: "16px"}}>Export Report</LMSButton>
      </Box>
    </Box>
  );
};

export default Performance;
