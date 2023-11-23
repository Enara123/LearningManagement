import "./App.css";
import SideBar from "./components/SideBar";
import { useTheme } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import LecDashboard from "./scenes/lecDashboard";

function App() {
  const [theme] = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <SideBar />
        <main className="content">
          <Routes>
            <Route path="/" element={<LecDashboard />} />
          </Routes>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
