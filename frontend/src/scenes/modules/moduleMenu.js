import { Box, Typography, Link } from "@mui/material";
import Header from "../../components/Header";
import LMSButton from "../../components/LMSButton";
import ModuleCard from "../../components/ModuleCard";
import { Link as RouterLink } from "react-router-dom";

const Modules = () => {
  const handleCreateModule = () => {
    console.log("create module button clicked");
  };
  return (
    <Box mt="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Modules" subtitle="Manage your modules" />
      </Box>
      <Link
        component={RouterLink}
        to="/createModule"
        underline="none"
        color="inherit"
      >
        <LMSButton
          customWidth="228px"
          customFontSize="16px"
          onClick={handleCreateModule}
        >
          + Create Module
        </LMSButton>
      </Link>
      <Box display="flex">
        <ModuleCard />
        <ModuleCard />
        <ModuleCard />
      </Box>
    </Box>
  );
};

export default Modules;
