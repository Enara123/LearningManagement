import { Box, Typography } from "@mui/material";
import Header from "../../components/Header";
import ModuleCard from "../../components/ModuleCard";

const Courses = () => {
  return (
    <Box mt="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Courses" subtitle="Access your courses here" />
      </Box>
      <Box display="flex">
        <ModuleCard />
        <ModuleCard />
      </Box>
    </Box>
  );
};

export default Courses;
