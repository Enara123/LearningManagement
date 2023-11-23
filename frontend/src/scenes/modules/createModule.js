import { Box, Link } from "@mui/material";
import React, { useState } from "react";
import Header from "../../components/Header";

const CustomLink = ({ title, to, children }) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleSelect = () => {
    setIsSelected(true);
  };

  return (
    <Link
      to={to}
      onClick={handleSelect}
      style={{ color: isSelected ? "red" : "blue", textDecoration: "none" }}
    >
      {children}
    </Link>
  );
};

const CreateModule = () => {
  return (
    <Box mt="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Create Module" subtitle="Modules > Create Module" />
      </Box>
      <Box
        sx={{
          backgroundColor: "#ffffff",
          borderRadius: "20px",
          padding: "20px 30px",
          marginRight: "20px",
          boxShadow: "3px 8px 10px 2px rgba(0, 0, 0, 0.15)",
        }}
      >
        <CustomLink title="> Enter Module Details" to="/">
          Link
        </CustomLink>
        {/* <Link sx={{ marginRight: "10px" }}> {">"} Enter Module Details</Link>
        <Link sx={{ marginRight: "10px" }}> {">"} Create Quiz</Link>
        <Link sx={{ marginRight: "10px" }}> {">"} Create Assessment</Link> */}
      </Box>
    </Box>
  );
};

export default CreateModule;
