import { ThemeProvider } from "@emotion/react";
import "./App.css";
import SideBar from "./components/SideBar";
import { CssBaseline } from "@mui/material";
import { Routes, Route, useLocation } from "react-router-dom";
import Login from "./scenes/Login";
import { createTheme } from "@mui/material/styles";
import { grey, cyan } from "@mui/material/colors";
import LecDashboard from "./scenes/lecDashboard/LecDashboard";
import CreateQuiz from "./scenes/modules/CreateQuiz";
import ModuleInfo from "./scenes/modules/moduleInfo";
import ModuleMenu from "./scenes/modules/moduleMenu";
import CreateModule from "./scenes/modules/createModule";
import CreateAssessment from "./scenes/modules/CreateAssessment";

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/";
  const theme = () =>
    createTheme({
      palette: {
        primary: {
          main: grey[500],
        },
        secondary: {
          main: cyan[500],
        },
        background: {
          default: grey[200],
        },
      },
      typography: {
        fontFamily: ["Montserrat", "sans-serif"].join(","),
        fontSize: 12,
        h1: {
          fontFamily: ["Montserrat", "sans-serif"].join(","),
          fontSize: 40,
        },
        h2: {
          fontFamily: ["Montserrat", "sans-serif"].join(","),
          fontSize: 32,
        },
        h3: {
          fontFamily: ["Montserrat", "sans-serif"].join(","),
          fontSize: 24,
        },
        h4: {
          fontFamily: ["Montserrat", "sans-serif"].join(","),
          fontSize: 20,
        },
        h5: {
          fontFamily: ["Montserrat", "sans-serif"].join(","),
          fontSize: 16,
        },
        h6: {
          fontFamily: ["Montserrat", "sans-serif"].join(","),
          fontSize: 14,
        },
        body1: {
          fontFamily: ["Montserrat", "sans-serif"].join(","),
          fontSize: 14,
        },
      },
    });

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
                <LecDashboard />
              </main>
            }
          />
          <Route
            path="/moduleInfo"
            element={
              <main className="content">
                <ModuleInfo />
              </main>
            }
          />
          <Route
            path="/moduleMenu"
            element={
              <main className="content">
                <ModuleMenu />
              </main>
            }
          />
          <Route
            path="/createModule"
            element={
              <main className="content">
                <CreateModule />
              </main>
            }
          />
          <Route
            path="/create-quiz"
            element={
              <main className="content">
                <CreateQuiz />
              </main>
            }
          />
          <Route
            path="/create-assessment"
            element={
              <main className="content">
                <CreateAssessment />
              </main>
            }
          />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
