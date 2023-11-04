import React from "react";
import { BsTrash } from "react-icons/bs";
import { BiEditAlt } from "react-icons/bi";
import axios from "axios";
import { baseURL } from "../utils/constant";

const List = ({
  id,
  name,
  telephone,
  username,
  password,
  setUpdateUI,
  updateMode,
}) => {
  const removeUser = () => {
    axios.delete(`${baseURL}/delete/${id}`).then((res) => {
      console.log(res);
      setUpdateUI((prevState) => !prevState);
    });
  };

  return (
    <tr>
      <td>{name}</td>
      <td>{telephone}</td>
      <td>{username}</td>
      <td>{password}</td>
      <td>
        <div className="icon_holder">
          <BiEditAlt
            className="icon"
            onClick={() => updateMode(id, name, telephone, username, password)}
          />
          <BsTrash className="icon" onClick={removeUser} />
        </div>
      </td>
    </tr>
  );
};

export default List;
