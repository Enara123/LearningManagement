import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Modules from "./pages/Modules";
import SideBar from "./components/SideBar";

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

const AppContent = () => {
  const location = useLocation();

  // Check if the current route is the login page
  const isLoginPage = location.pathname === "/";

  return (
    <div className="App">
      {!isLoginPage && <SideBar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/modules" element={<Modules />} />
      </Routes>
    </div>
  );
};

export default App;
