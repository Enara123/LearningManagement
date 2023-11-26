import { Box, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import React, { useState } from "react";

const ModuleNav = () => {
  const [selectedNav, setSelectedNav] = useState(false);

  const handleNavClick = () => {
    setSelectedNav(!selectedNav);
    console.log(selectedNav);
  };

  const ModuleLinkNav = ({ title, to }) => {
    return (
      <Link
        variant="h4"
        underline="hover"
        component={RouterLink}
        to={to}
        sx={{
          pt: "10px",
          color: "#7E7E7E",
          cursor: "pointer",
        }}
      >
        {title}
      </Link>
    );
  };

  return (
    <Box
      display="flex"
      gap="30px"
      alignItems="center"
      sx={{ padding: "30px", paddingLeft: "90px" }}
    >
      <ModuleLinkNav
        title="> &nbsp;&nbsp;Enter Module Details"
        to="/createModule"
      />
      <ModuleLinkNav
        title="> &nbsp;&nbsp;Create Quiz"
        to="/create-quiz/:moduleId"
      />
      <ModuleLinkNav
        title="> &nbsp;&nbsp;Create Assessment"
        to="/create-assessment"
      />
    </Box>
  );
};

export default ModuleNav;
