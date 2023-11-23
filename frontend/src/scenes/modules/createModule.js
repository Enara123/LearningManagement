import { Box, Link } from "@mui/material";
import React, { useState } from "react";
import Header from "../../components/Header";

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
      ></Box>
    </Box>
  );
};

export default CreateModule;
