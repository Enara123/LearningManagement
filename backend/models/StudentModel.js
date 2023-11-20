const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  studentId: { type: String, required: true, unique: true },
  studentPassword: String,
  passwordChanged: { type: Boolean, default: false },
  batch: String,
});

module.exports = mongoose.model("Student", studentSchema);
