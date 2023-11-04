const UserModel = require("../models/UserModel");

module.exports.getUsers = async (req, res) => {
  const users = await UserModel.find();
  res.send(users);
};

module.exports.saveUser = (req, res) => {
  const { name, telephone, username, password } = req.body;

  UserModel.create({ name, telephone, username, password })
    .then((data) => {
      console.log("Saved Successfully...");
      res.status(201).send(data);
    })
    .catch((err) => {
      console.log(err);
      res.send({ error: err, msg: "Something went wrong!" });
    });
};

module.exports.loginUser = (req, res) => {
  const { username, password } = req.body;

  UserModel.findOne({ username, password })
    .then((data) => {
      if (data) {
        console.log("Logged in Successfully...");
        res.status(201).send("exist");
      } else {
        res.send("not exist");
      }
    })
    .catch((err) => {
      console.log(err);
      res.send({ error: err, msg: "Something went wrong!" });
    });
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
