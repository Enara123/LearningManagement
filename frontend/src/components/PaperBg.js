import React from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";

const PaperBg = ({ customWidth, customHeight, children }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        "& > :not(style)": {
          m: 1,
          width: customWidth || 500,
          height: customHeight || 400,
          borderRadius: "20px",
          boxShadow: "3px 8px 10px 2px rgba(0, 0, 0, 0.15)",
        },
      }}
    >
      <Paper>{children}</Paper>
    </Box>
  );
};

PaperBg.propTypes = {
  customWidth: PropTypes.number,
  customHeight: PropTypes.number,
  children: PropTypes.node,
};

export default PaperBg;
