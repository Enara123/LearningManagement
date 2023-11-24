import { Box, Link } from "@mui/material";
import Header from "../../components/Header";
import LMSButton from "../../components/LMSButton";
import ModuleCard from "../../components/ModuleCard";
import { Link as RouterLink } from "react-router-dom";
import { useState, useEffect } from "react";

const Modules = () => {
  const [modules, setModules] = useState([]);

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/getmodules");

        if (response.ok) {
          const responseData = await response.json();
          setModules(responseData);
        } else {
          console.error("Failed to fetch modules: " + response.status);
        }
      } catch (error) {
        console.error("Error fetching modules: ", error);
      }
    };

    fetchModules();
  }, []);

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
        {modules.map((module) => (
          <ModuleCard moduleId={module._id} />
        ))}
      </Box>
    </Box>
  );
};

export default Modules;
