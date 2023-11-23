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
import { styled } from "@mui/material/styles";

function Login() {
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

  async function submit(e) {
    e.preventDefault();
    if (username === "") {
      notify("Please Enter Username");
    } else if (password === "") {
      notify("Please Enter Password");
    } else {
      try {
        await axios
          .post(`${baseURL}/login`, {
            username,
            password,
          })
          .then((res) => {
            if (res.data === "Success") {
              history("/home", { state: { id: username } });
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

  const LMSButton = styled(Button)(({ theme }) => ({
    color: "#000000",
    backgroundColor: "#0BE2E2",
    padding: "10px 20px",
    border: "none",
    borderRadius: "30px",
    cursor: "pointer",
    fontSize: "20px",
    margin: "50px 0px",
    height: "50px",
    width: "192px",
    fontFamily: "Montserrat",
    "&:hover": {
      backgroundColor: "#FFF",
    },
  }));

  return (
    <div className="login" style={outer}>
      <div className="login" style={divStyle}>
        <form onSubmit={submit} style={{ textAlign: "center" }}>
          <img src={hatImage} alt="Hat" style={{ marginTop: "10px" }} />

          <Typography variant="h3">Welcome Back</Typography>

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
                    onChange={(e) => setPassword(e.target.value)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          <br />
          <LMSButton variant="contained" onClick={(e) => submit(e)}>
            View
          </LMSButton>

          {/* <ButtonCustom
            label="Sign In"
            height="52px"
            width="389px"
            type="submit"
            onClick={(e) => submit(e)}
          /> */}
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
