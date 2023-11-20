import DashboardNavigation from "../components/DashboardNavigation";
import { useNavigate } from "react-router-dom";

function Home() {
  const buttons = ["Dashboard", "Module", "Report"];

  const nav = useNavigate();

  const handleLogout = () => {
    console.log("logout");
    nav("/");
  };

  return <DashboardNavigation buttons={buttons} onLogout={handleLogout} />;
}

export default Home;
