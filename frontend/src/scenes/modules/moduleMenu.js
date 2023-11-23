import { Box, Typography } from "@mui/material";
import Header from "../../components/Header";
import LMSButton from "../../components/LMSButton";
import ModuleCard from "../../components/ModuleCard";

const Modules = () => {
  return (
    <Box mt="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Modules" subtitle="Manage your modules" />
      </Box>
      <LMSButton customWidth="228px" customFontSize="16px">
        + Create Module
      </LMSButton>
      <Box display="flex">
        <ModuleCard />
        <ModuleCard />
        <ModuleCard />
      </Box>
    </Box>
  );
};

export default Modules;
