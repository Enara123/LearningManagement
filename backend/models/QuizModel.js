const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  moduleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Module",
    required: true,
  },
  quizDate: { type: Date, required: true, default: Date.now() },
  marks: { type: Number, required: true },
});

module.exports = mongoose.model("Quiz", quizSchema);
