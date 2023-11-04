import React, { useEffect, useState } from "react";
import List from "./List";
import { baseURL } from "../utils/constant";
import axios from "axios";

function Home() {
  const [name, setName] = useState("");
  const [telephone, setTelephone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [updateUI, setUpdateUI] = useState(false);
  const [updateId, setUpdateId] = useState(null);
  const [users, setUsers] = useState([name, telephone, username, password]);

  useEffect(() => {
    axios.get(`${baseURL}/get`).then((res) => {
      console.log(res.data);
      setName(res.data.name);
      setTelephone(res.data.telephone);
      setUsername(res.data.username);
      setPassword(res.data.password);
      setUsers(res.data);
    });
  }, [updateUI]);

  const addUser = () => {
    axios
      .post(`${baseURL}/save`, {
        name: name,
        telephone: telephone,
        username: username,
        password: password,
      })
      .then((res) => {
        console.log(res.data);
        setName("");
        setTelephone("");
        setUsername("");
        setPassword("");
        setUpdateUI((prevState) => !prevState);
      });
  };

  const updateMode = (id, name, telephone, username, password) => {
    console.log(name, telephone, username, password);
    setName(name);
    setTelephone(telephone);
    setUsername(username);
    setPassword(password);
    setUpdateId(id);
  };

  const updateTask = () => {
    axios
      .put(`${baseURL}/update/${updateId}`, {
        name: name,
        telephone: telephone,
        username: username,
        password: password,
      })
      .then((res) => {
        console.log(res.data);
        setUpdateUI((prevState) => !prevState);
        setUpdateId(null);
        setName("");
        setTelephone("");
        setUsername("");
        setPassword("");
      });
  };

  const handleLogout = () => {
    localStorage.clear();
    // Redirect to the login page
    window.location.href = `http://localhost:3000/`; // Replace "/login" with your actual login page URL
  };

  return (
    <main>
      <h1 className="title">User Management</h1>

      <div className="input_holder">
        <input
          type="text"
          value={name}
          placeholder="Enter Name"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          value={telephone}
          placeholder="Enter Telephone"
          onChange={(e) => setTelephone(e.target.value)}
        />

        <input
          type="text"
          value={username}
          placeholder="Enter Username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          value={password}
          placeholder="Enter Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" onClick={updateId ? updateTask : addUser}>
          {updateId ? "Update User" : "Add User"}
        </button>
      </div>

      <ul>
        <table>
          <tr>
            <th>Name</th>
            <th>Telephone</th>
            <th>Username</th>
            <th>Password</th>
            <th>Actions</th>
          </tr>
          {users.map((user) => (
            <List
              key={user._id}
              id={user._id}
              name={user.name}
              telephone={user.telephone}
              username={user.username}
              password={user.password}
              setUpdateUI={setUpdateUI}
              updateMode={updateMode}
            />
          ))}
        </table>
      </ul>
      <button
        className="logout"
        onClick={() => {
          handleLogout();
        }}
      >
        Logout
      </button>
    </main>
  );
}

export default Home;
