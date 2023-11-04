import React, { useState } from "react";
import axios from "axios";
import { baseURL } from "../utils/constant";
import { useNavigate } from "react-router-dom";

function Login() {
  const history = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function submit(e) {
    e.preventDefault();
    try {
      await axios
        .post(`${baseURL}/login`, {
          username,
          password,
        })
        .then((res) => {
          if (res.data === "exist") {
            history("/home", { state: { id: username } });
            setUsername("");
            setPassword("");
          } else if (res.data === "not exist") {
            alert("User have not sign up");
          }
        })
        .catch((e) => {
          alert("wrong details");
          console.log(e);
        });
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="login">
      <h1>Login</h1>

      <form action="POST">
        <input
          type="text"
          id="username"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          placeholder="Username"
          required
        />
        <input
          type="password"
          id="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="Password"
          required
        />
        <input type="submit" onClick={submit} />
      </form>
    </div>
  );
}

export default Login;
