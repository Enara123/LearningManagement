const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  questionNumber: { type: Number, required: true, unique: true },
  complexity: Number,
  question: String,
  answer: [String],
  status: String,
});

module.exports = mongoose.model("Question", questionSchema);
