import React, { useState, useEffect, useRef } from "react";
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
import LMSButton from "../../components/LMSButton";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Line, Chart } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const Performance = () => {
  const [attemptData, setAttemptData] = useState([]);
  const [expandedRow, setExpandedRow] = useState(null);
  const { moduleId } = useParams();

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
  }, [moduleId]);

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
        <Header
          title="Module Performance"
          subtitle="View Students Performance"
        />
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
                        <TableCell>
                          {calculateAverageMarks(row.marksPercentage) +
                            " (" +
                            row.grade +
                            ")"}
                        </TableCell>
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
                            <Line
                              data={{
                                labels: Array.from(
                                  { length: row.attempts.length },
                                  (_, i) => `Attempt ${i + 1}`
                                ),
                                datasets: [
                                  {
                                    label: "Quiz Marks",
                                    data: row.attempts.map(
                                      (item) => item.marks
                                    ),
                                    fill: false,
                                    borderColor: "rgb(75, 192, 192)",
                                    tension: 0.1,
                                  },
                                  {
                                    label: "Average Complexity",
                                    data: row.attempts.map((item) => {
                                      const totalComplexity =
                                        item.questions.reduce(
                                          (acc, question) =>
                                            acc +
                                            question.complexity.complexity,
                                          0
                                        );
                                      return (
                                        (totalComplexity / item.questions.length) * 2 
                                      );
                                    }),
                                    fill: false,
                                    borderColor: "rgb(255, 0, 0)",
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
      </Box>
    </Box>
  );
};

export default Performance;
