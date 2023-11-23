import "./App.css";
import SideBar from "./components/SideBar";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import LecDashboard from "./scenes/lecDashboard";
import { cyan, grey } from "@mui/material/colors";

function App() {
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
