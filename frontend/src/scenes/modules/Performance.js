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

const Performance = () => {
  const dummyData = [
    {
      id: 1,
      attempts: 3,
      avgMarks: 85,
      highestMark: 95,
      lowestMark: 75,
      accuracy: "90%",
    },
    {
      id: 2,
      attempts: 4,
      avgMarks: 78,
      highestMark: 89,
      lowestMark: 65,
      accuracy: "85%",
    },
  ];

  const [expandedRow, setExpandedRow] = useState(null);

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
                    <TableCell>ID</TableCell>
                    <TableCell>No of attempts</TableCell>
                    <TableCell>Avg Marks</TableCell>
                    <TableCell>Highest Mark</TableCell>
                    <TableCell>Lowest Mark</TableCell>
                    <TableCell>Accuracy</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dummyData.map((row) => (
                    <React.Fragment key={row.id}>
                      <TableRow>
                        <TableCell>{row.id}</TableCell>
                        <TableCell>{row.attempts}</TableCell>
                        <TableCell>{row.avgMarks}</TableCell>
                        <TableCell>{row.highestMark}</TableCell>
                        <TableCell>{row.lowestMark}</TableCell>
                        <TableCell>{row.accuracy}</TableCell>
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
                            Line Chart Space
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
