const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
module.exports.getUsers = async (req, res) => {
  const users = await UserModel.find();
  res.send(users);
};

module.exports.saveUser = async (req, res) => {
  try {
    let { name, telephone, username, password } = req.body;
    password = await bcrypt.hash(password, 10);

    const data = await UserModel.create({
      name,
      telephone,
      username,
      password,
    });

    console.log("Saved Successfully...");
    res.status(201).send(data);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: err, msg: "Something went wrong!" });
  }
};

module.exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await UserModel.findOne({ username });

    if (!user) {
      return res.status(400).send("User not found");
    }

    if (!user.password) {
      return res.status(500).send("User password not set");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      res.status(200).send("Success");
      console.log("Logged in Successfully...");
    } else {
      res.status(401).send("Invalid password");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: err, msg: "Something went wrong!" });
  }
};

module.exports.updateUser = (req, res) => {
  const { id } = req.params;
  const { name, telephone, username, password } = req.body;

  UserModel.findByIdAndUpdate(id, { name, telephone, username, password })
    .then(() => res.send("Updated successfully"))
    .catch((err) => {
      console.log(err);
      res.send({ error: err, msg: "Something went wrong!" });
    });
};

module.exports.deleteUser = (req, res) => {
  const { id } = req.params;

  UserModel.findByIdAndDelete(id)
    .then(() => res.send("Deleted successfully"))
    .catch((err) => {
      console.log(err);
      res.send({ error: err, msg: "Something went wrong!" });
    });
}; 
