const LecturerModel = require("../models/LecturerModel");

module.exports.getLecturers = async (req, res) => {
  const lecturers = await LecturerModel.find();
  res.send(lecturers);
};

module.exports.saveLecturer = async (req, res) => {
  const {
    lecturerName,
    lecturerAddress,
    lecturerTelephone,
    lecturerEmail,
    lecturerSpeciality,
  } = req.body;

  LecturerModel.create({
    lecturerName,
    lecturerAddress,
    lecturerTelephone,
    lecturerEmail,
    lecturerSpeciality,
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
  const {
    lecturerName,
    lecturerAddress,
    lecturerTelephone,
    lecturerEmail,
    lecturerSpeciality,
  } = req.body;

  LecturerModel.findByIdAndUpdate(id, {
    lecturerName,
    lecturerAddress,
    lecturerTelephone,
    lecturerEmail,
    lecturerSpeciality,
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
