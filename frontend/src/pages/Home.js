import DashboardNavigation from "../components/DashboardNavigation";
import { useNavigate } from "react-router-dom";
import ModuleCard from "../components/ModuleCard";

function Home() {
  const buttons = ["Dashboard", "Module", "Report"];

  const nav = useNavigate();

  const handleLogout = () => {
    console.log("logout");
    nav("/");
  };


  return (
    <div style={{ display: "flex" }}>
      <DashboardNavigation buttons={buttons} onLogout={handleLogout} />
      <div style={{ width: "70%", paddingLeft:"30px", paddingTop:"30px", display: "flex", gap: "30px" }}>    
        <ModuleCard moduleId="655c49756723559f1e822166"/>
        <ModuleCard moduleId="655c49756723559f1e822166"/>
        <ModuleCard moduleId="655c49756723559f1e822166"/>
      </div>
    </div>
  );
}

export default Home;
