import { ThemeProvider, useTheme } from "@emotion/react";
import "./App.css";
import SideBar from "./components/SideBar";
import { CssBaseline } from "@mui/material";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Login from "./scenes/Login";

function App() {
  const theme = useTheme();
  const location = useLocation();
  const isLoginPage = location.pathname === "/";

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        {!isLoginPage && <SideBar />}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <main className="content">
                <Login />
              </main>
            }
          />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
