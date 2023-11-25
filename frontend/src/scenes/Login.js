import React, { useState } from "react";
import axios from "axios";
import { baseURL } from "../utils/constant";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import hatImage from "../icons/Hat.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import LMSButton from "../components/LMSButton";

function Login({ submit }) {
  const history = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const notify = (text) =>
    toast.error(text, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const handleSubmit = (e) => {
    submit({
      e,
      username,
      password,
      notify,
      history,
      setUsername,
      setPassword,
    });
  };

  return (
    <div className="loginPage" style={outer}>
      <div className="loginPage" style={divStyle}>
        <form onSubmit={submit} style={{ textAlign: "center" }}>
          <img src={hatImage} alt="Hat" style={{ marginTop: "10px" }} />

          <Typography variant="h4" gutterBottom>
            Welcome Back
          </Typography>

          <TextField
            id="standard-basic"
            label="Username"
            variant="standard"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <br />
          <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
            <InputLabel htmlFor="standard-adornment-password">
              Password
            </InputLabel>
            <Input
              id="standard-adornment-password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <br />
          <LMSButton variant="contained" onClick={handleSubmit}>
            Login
          </LMSButton>

          <ToastContainer />
        </form>
      </div>
    </div>
  );
}

export default Login;

const divStyle = {
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  alignItems: "center",
  flexShrink: "0",
  height: "523px",
  width: "534px",
  borderRadius: "20px",
  boxShadow: "4px 4px 12px 0px rgba(0,0,0,0.15)",
  background: "var(--White, #FFFFFF)",
  margin: "auto",
};

const outer = {
  display: "flex",
  width: "100%",
  padding: "210px 0px 188px 0px",
  flexDirection: "column",
  justifyContent: "flex-end",
  alignItems: "center",
  gap: "26px",
  background: "#EFF",
};
