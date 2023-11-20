const mongoose = require("mongoose");

const lecturerSchema = new mongoose.Schema({
  lecturerName: { type: String, required: true, unique: true },
  lecturerAddress: String,
  lecturerTelephone: String,
  lecturerEmail: String,
  lecturerSpeciality: String,
  lecturerUsername: String,
  lecturerPassword: String,
});

module.exports = mongoose.model("Lecturer", lecturerSchema);
