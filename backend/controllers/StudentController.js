const StudentModel = require("../models/StudentModel");
const bcrypt = require("bcrypt");

module.exports.getStudents = async (req, res) => {
  try {
    const students = await StudentModel.find(); // If using Mongoose, use find instead of findAll
    res.send(students);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error, msg: "Something went wrong!" });
  }
};

module.exports.getBatchStudents = async (req, res) => {
  try {
    const { batchName } = req.body;
    const students = await StudentModel.find({
      studentId: { $regex: `^${batchName}` },
    });
    res.send({ students: students, count: students.length });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error, msg: "Something went wrong!" });
  }
};

module.exports.saveStudent = async (req, res) => {
  const { batchName, studentsNumber } = req.body;

  if (!batchName || !studentsNumber) {
    return res.status(400).json({ error: "Please provide all the details" });
  }

  const studentPromises = [];

  for (let i = 0; i < studentsNumber; i++) {
    const studentId = `${batchName}-${String(i + 1).padStart(3, "0")}`;
    const student = new StudentModel({
      studentId: studentId,
      studentPassword: generateRandomPassword(),
    });
    studentPromises.push(student.save());
  }

  try {
    await Promise.all(studentPromises);
    res.status(201).json({ message: "Students created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err, msg: "Something went wrong!" });
  }
};

module.exports.changePassword = async (req, res) => {
  try {
    let { studentId, oldPassword, newPassword } = req.body;

    const student = await StudentModel.findOne({ studentId: studentId });

    if (!student) {
      return res.status(404).send("Student not found");
    }

    if (!student.passwordChanged) {
      if (oldPassword != student.studentPassword) {
        return res.status(401).send("Incorrect old password");
      }
    } else {
      const isPasswordMatch = await bcrypt.compare(
        oldPassword,
        student.studentPassword
      );
      if (!isPasswordMatch) {
        return res.status(401).send("Incorrect old password");
      }
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    const updatedStudent = await StudentModel.findByIdAndUpdate(
      student._id,
      { studentPassword: hashedNewPassword, passwordChanged: true },
      { new: true }
    );

    if (updatedStudent) {
      console.log("Password updated successfully");
      res.status(201).send(updatedStudent);
    } else {
      res.status(500).send("Failed to update password");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: err, msg: "Something went wrong!" });
  }
};

module.exports.deleteStudent = async (req, res) => {
  const { id } = req.params;

  StudentModel.findByIdAndDelete(id)
    .then(() => res.send("Deleted successfully"))
    .catch((err) => {
      console.log(err);
      res.send({ error: err, msg: "Something went wrong!" });
    });
};

module.exports.loginStudent = async (req, res) => {
  const { studentId, studentPassword } = req.body;

  try {
    const student = await StudentModel.findOne({ studentId });
    if (!student) {
      return res.status(400).send("Student not found");
    }

    if (!student.studentPassword) {
      return res.status(400).send("Password not set");
    }

    const isMatch = await bcrypt.compare(
      studentPassword,
      student.studentPassword
    );

    if (isMatch) {
      console.log("Login successful");
      return res.status(200).send("Login successful");
    } else {
      return res.status(400).send("Invalid password");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: err, msg: "Something went wrong!" });
  }
};

module.exports.getBatches = async (req, res) => {
  try {
    const batches = await StudentModel.distinct("studentId");
    const batchNames = [
      ...new Set(batches.map((batch) => batch.split("-")[0])),
    ];
    res.send({ batches: batchNames, count: batchNames.length });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error, msg: "Something went wrong!" });
  }
};

function generateRandomPassword() {
  const lowerCaseLetters = "abcdefghijklmnopqrstuvwxyz";
  const upperCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const specialCharacters = "!@#$%^&*()-_=+[{]};:'\"|,.<>?/`~";

  const password = [];

  password.push(
    lowerCaseLetters.charAt(Math.floor(Math.random() * lowerCaseLetters.length))
  );
  password.push(
    upperCaseLetters.charAt(Math.floor(Math.random() * upperCaseLetters.length))
  );
  password.push(numbers.charAt(Math.floor(Math.random() * numbers.length)));
  password.push(
    specialCharacters.charAt(
      Math.floor(Math.random() * specialCharacters.length)
    )
  );

  for (let i = 4; i < 12; i++) {
    password.push(
      lowerCaseLetters.charAt(
        Math.floor(Math.random() * lowerCaseLetters.length)
      )
    );
  }

  return password.join("");
}
