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
import { useQueryClient, QueryClient, QueryClientProvider } from "react-query";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";

function App() {
  const queryClient = new QueryClient();
  const location = useLocation();
  const isLoginPage = location.pathname === "/";
  const [isUserType, setIsUserType] = useState(false);
  const [lecturerId, setLecturerId] = useState("");
  const [studentId, setStudentId] = useState("");
  const generateSessionId = () => {
    return Math.random().toString(36).substring(2, 15);
  };
  const [sessionId, setSessionId] = useState(() => {
    // Use localStorage if available, fallback to a generated session ID
    return localStorage.getItem("sessionId") || generateSessionId();
  });

  useEffect(() => {
    // Save the session ID to localStorage
    localStorage.setItem("sessionId", sessionId);
  }, [sessionId]);

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
          const res = await axios.post(`${baseURL}/lecturer/login`, {
            lecturerUsername: username,
            lecturerPassword: password,
          });

          if (res.data.split(".")[0] === "Success") {
            const newSessionId = generateSessionId();
            setSessionId(newSessionId);
            sessionStorage.setItem("sessionId", newSessionId);

            setIsBooleanValue(!isBooleanValue);
            setIsUserType(!isUserType);
            setLecturerId(res.data.split(".")[1]);
            history("lecturer/dashboard", { state: { id: username } });
            setUsername("");
            setPassword("");
          } else if (res.data === "not exist") {
            notify("Username or Password is incorrect");
          }
        } catch (e) {
          notify("Username or Password is incorrect");
          console.error(e);
        }
      } else {
        try {
          const res = await axios.post(`${baseURL}/student/login`, {
            studentId: username,
            studentPassword: password,
          });

          if (res.data.split(".")[0] === "Success") {
            const newSessionId = generateSessionId();
            setSessionId(newSessionId);
            sessionStorage.setItem("sessionId", newSessionId);

            setIsBooleanValue(isBooleanValue);
            setIsUserType(isUserType);
            history("/student/courses", { state: { id: username } });
            setStudentId(res.data.split(".")[1]);
            console.log(studentId);
            setUsername("");
            setPassword("");
          } else if (res.data === "not exist") {
            notify("Username or Password is incorrect");
          }
        } catch (e) {
          notify("Username or Password is incorrect");
          console.error(e);
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

  const PrivateRoute = ({ element, userType }) => {
    if (!sessionId) {
      // Redirect to login if session ID is not available
      return <Navigate to="/" />;
    }

    // Add additional checks based on userType if needed
    // For example: if (userType === 'lecturer' && !isUserType) ...

    return element;
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        {!isLoginPage && <SideBar userType={isUserType} />}
        <Routes>
          <Route path="/" element={<Login submit={submit} />} />
          <Route
            path="/lecturer/dashboard"
            element={
              <PrivateRoute
                element={
                  <main className="content">
                    <LecDashboard />
                  </main>
                }
              />
            }
          />
          <Route
            path="/lecturer/moduleInfo/:moduleId"
            element={
              <PrivateRoute
                element={
                  <main className="content">
                    <ModuleInfo />
                  </main>
                }
              />
            }
          />
          <Route
            path="/lecturer/moduleMenu"
            element={
              <PrivateRoute
                element={
                  <main className="content">
                    <ModuleMenu />
                  </main>
                }
              />
            }
          />
          <Route
            path="/lecturer/createModule"
            element={
              <PrivateRoute
                element={
                  <main className="content">
                    <CreateModule />
                  </main>
                }
              />
            }
          />
          <Route
            path="/lecturer/create-quiz/:moduleId"
            element={
              <PrivateRoute
                element={
                  <main className="content">
                    <CreateQuiz />
                  </main>
                }
              />
            }
          />
          <Route
            path="/student/moduleMenu"
            element={
              <PrivateRoute
                element={
                  <main className="content">
                    <moduleMenu />
                  </main>
                }
              />
            }
          />
          <Route
            path="/lecturer/create-assessment"
            element={
              <PrivateRoute
                element={
                  <main className="content">
                    <CreateAssessment />
                  </main>
                }
              />
            }
          />
          <Route
            path="/student/courses"
            element={
              <PrivateRoute
                element={
                  <main className="content">
                    <Courses />
                  </main>
                }
              />
            }
          />
          <Route
            path="/student/courses"
            element={
              <PrivateRoute
                element={
                  <main className="content">
                    <Courses />
                  </main>
                }
              />
            }
          />
          <Route
            path="/student/course-info/:moduleId"
            element={
              <PrivateRoute
                element={
                  <main className="content">
                    <CourseInfo />
                  </main>
                }
              />
            }
          />
          <Route
            path="/student/courses/attempt-quiz/:moduleId"
            element={
              <PrivateRoute
                element={
                  <main className="content">
                    <AttemptQuiz />
                  </main>
                }
              />
            }
          />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
