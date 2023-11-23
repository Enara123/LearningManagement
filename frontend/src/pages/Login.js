import React, { useState } from "react";
import axios from "axios";
import { baseURL } from "../utils/constant";
import { useNavigate } from "react-router-dom";
import TextInput from "../components/TextInput";
import ButtonCustom from "../components/ButtonCustom";
import Heading from "../components/Heading";
import hatImage from "../icons/Hat.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const history = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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

  return (
    <div className="login" style={outer}>
      <div className="login" style={divStyle}>
        <form onSubmit={submit} style={{ textAlign: "center" }}>
          <img src={hatImage} alt="Hat" style={{ marginTop: "10px" }} />

          <Heading text="Welcome Back" />

          <TextInput
            type="text"
            placeholder="Username"
            height="30px"
            width="200px"
            required
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <TextInput
            type="password"
            placeholder="Password"
            height="30px"
            width="200px"
            required
            onChange={(e) => setPassword(e.target.value)}
          />

          <ButtonCustom
            label="Sign In"
            height="52px"
            width="389px"
            type="submit"
            onClick={(e) => submit(e)}
          />
          <ToastContainer />
        </form>
      </div>
    </div>
  );
}

export default Login;

const divStyle = {
  display: "float",
  height: "510px",
  width: "534px",
  borderRadius: "20px",
  boxShadow: "4px 4px 12px 0px rgba(0,0,0,0.15)",
  background: "var(--White, #FFFFFF)",
  padding: "30px 0 0 0 ",
};

const outer = {
  display: "flex",
  justifyContent: "center",
  width: "100%",
  alignItems: "center",
  background: "#EFF",
};
