import { Box, Typography } from "@mui/material";
import Header from "../../components/Header";
import LMSButton from "../../components/LMSButton";
import ModuleCard from "../../components/ModuleCard";
import { useNavigation } from "react-router-dom";

const Modules = () => {
  const navigation = useNavigation();

  const handleCreateModule = () => {
    console.log("create module button clicked");
    navigation.navigate("/createModule");
  };
  return (
    <Box mt="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Modules" subtitle="Manage your modules" />
      </Box>
      <LMSButton
        customWidth="228px"
        customFontSize="16px"
        onClick={handleCreateModule}
      >
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
