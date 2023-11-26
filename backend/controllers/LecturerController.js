const LecturerModel = require("../models/LecturerModel");
const bcrypt = require("bcrypt");

module.exports.getLecturers = async (req, res) => {
  const lecturers = await LecturerModel.find();
  res.send(lecturers);
};

module.exports.saveLecturer = async (req, res) => {
  let {
    lecturerName,
    lecturerAddress,
    lecturerTelephone,
    lecturerEmail,
    lecturerSpeciality,
    lecturerUsername,
    lecturerPassword,
  } = req.body;

  lecturerPassword = await bcrypt.hash(lecturerPassword, 10);

  LecturerModel.create({
    lecturerName,
    lecturerAddress,
    lecturerTelephone,
    lecturerEmail,
    lecturerSpeciality,
    lecturerUsername,
    lecturerPassword,
  })
    .then((data) => {
      console.log("Saved Successfully...");
      res.status(201).send(data);
    })
    .catch((err) => {
      console.log(err);
      res.send({ error: err, msg: "Something went wrong!" });
    });
};

module.exports.updateLecturer = async (req, res) => {
  const { id } = req.params;
  let {
    lecturerName,
    lecturerAddress,
    lecturerTelephone,
    lecturerEmail,
    lecturerSpeciality,
    lecturerUsername,
    lecturerPassword,
  } = req.body;

  lecturerPassword = await bcrypt.hash(lecturerPassword, 10);

  LecturerModel.findByIdAndUpdate(id, {
    lecturerName,
    lecturerAddress,
    lecturerTelephone,
    lecturerEmail,
    lecturerSpeciality,
    lecturerUsername,
    lecturerPassword,
  })
    .then((data) => {
      console.log("Updated Successfully...");
      res.status(201).send(data);
    })
    .catch((err) => {
      console.log(err);
      res.send({ error: err, msg: "Something went wrong!" });
    });
};

module.exports.deleteLecturer = async (req, res) => {
  const { id } = req.params;

  LecturerModel.findByIdAndDelete(id)
    .then(() => res.send("Deleted successfully"))
    .catch((err) => {
      console.log(err);
      res.send({ error: err, msg: "Something went wrong!" });
    });
};

module.exports.loginLecturer = async (req, res) => {
  const { lecturerUsername, lecturerPassword } = req.body;

  try {
    const lecturer = await LecturerModel.findOne({ lecturerUsername });

    if (!lecturer) {
      return res.status(400).send("Lecturer not found");
    }

    if (!lecturer.lecturerPassword) {
      return res.status(500).send("Lecturer password not set");
    }

    const isPasswordValid = await bcrypt.compare(
      lecturerPassword,
      lecturer.lecturerPassword
    );

    if (isPasswordValid) {
      res.status(200).send(`Success.${lecturer._id}`);
      console.log(`Logged in Successfully... `);
    } else {
      res.status(401).send("Invalid password");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: err, msg: "Something went wrong!" });
  }
};
