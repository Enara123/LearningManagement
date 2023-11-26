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
import Courses from "./scenes/student/Courses";
import CourseInfo from "./scenes/student/CourseInfo";
import AttemptQuiz from "./scenes/student/AttemptQuiz";
import axios from "axios";
import { baseURL } from "./utils/constant";
import { useState } from "react";
import StuDashboard from "./scenes/student/StuDashboard";

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/";
  const [isUserType, setIsUserType] = useState(false);

  async function submit({
    e,
    username,
    password,
    notify,
    history,
    setUsername,
    setPassword,
    isBooleanValue,
    setIsBooleanValue,
  }) {
    e.preventDefault();
    if (username === "") {
      notify("Please Enter Username");
    } else if (password === "") {
      notify("Please Enter Password");
    } else {
      if (username.trim().charAt(0).toUpperCase() === "L") {
        try {
          await axios
            .post(`${baseURL}/lecturer/login`, {
              lecturerUsername: username,
              lecturerPassword: password,
            })
            .then((res) => {
              if (res.data === "Success") {
                setIsBooleanValue(!isBooleanValue);
                setIsUserType(!isUserType);
                history("/dashboard", { state: { id: username } });
                setUsername("");
                setPassword("");
              } else if (res.data === "not exist") {
                notify("Username or Password is incorrect");
              }
            })
            .catch((e) => {
              notify("Username or Password is incorrect");
              console.log(e);
            });
        } catch (e) {
          console.log(e);
        }
      } else {
        try {
          await axios
            .post(`${baseURL}/student/login`, {
              studentId: username,
              studentPassword: password,
            })
            .then((res) => {
              if (res.data === "Success") {
                setIsBooleanValue(isBooleanValue);
                setIsUserType(isUserType);
                history("/student", { state: { id: username } });
                setUsername("");
                setPassword("");
              } else if (res.data === "not exist") {
                notify("Username or Password is incorrect");
              }
            })
            .catch((e) => {
              notify("Username or Password is incorrect");
              console.log(e);
            });
        } catch (e) {
          console.log(e);
        }
      }
    }
  }

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
          fontWeight: "bold",
          fontSize: 20,
        },
        h5: {
          fontFamily: ["Montserrat", "sans-serif"].join(","),
          fontWeight: "bold",
          fontSize: 16,
        },
        h6: {
          fontFamily: ["Montserrat", "sans-serif"].join(","),
          fontWeight: "bold",
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
        {!isLoginPage && <SideBar userType={isUserType} />}
        <Routes>
          <Route path="/" element={<Login submit={submit} />} />
          {/* Lecturer Paths */}
          <Route
            path="/dashboard"
            element={
              <main className="content">
                <LecDashboard />
              </main>
            }
          />
          <Route
            path="/moduleInfo/:moduleId"
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
            path="/create-quiz/:moduleId"
            element={
              <main className="content">
                <CreateQuiz />
              </main>
            }
          />
          <Route
            path="/moduleMenu"
            element={
              <main className="content">
                <moduleMenu />
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
          {/* Student Paths */}
          <Route
            path="/student"
            element={
              <main className="content">
                <StuDashboard />
              </main>
            }
          />
          <Route
            path="/student/courses"
            element={
              <main className="content">
                <Courses />
              </main>
            }
          />
          <Route
            path="/student/course-info/:moduleId"
            element={
              <main className="content">
                <CourseInfo />
              </main>
            }
          />
          <Route
            path="/student/courses/attempt-quiz/:moduleId"
            element={
              <main className="content">
                <AttemptQuiz />
              </main>
            }
          />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
