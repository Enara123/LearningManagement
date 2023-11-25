const QuizModel = require("../models/QuizModel");

module.exports.getQuiz = async (req, res) => {
  try {
    const quiz = await QuizModel.find();
    res.status(200).json(quiz);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports.saveQuizMarks = async (req, res) => {
  const { studentId, moduleId, marks, asnweredQuestions } = req.body;

  QuizModel.create({ studentId, moduleId, marks, asnweredQuestions })
    .then((data) => {
      console.log("Quiz marks saved successfully");
      res.status(200).json(data);
    })
    .catch((err) => {
      console.log("Error saving quiz marks", err);
      res.status(400).json({ message: err.message });
    });
};

module.exports.getQuizByStudentIdAndModuleId = async (req, res) => {
  const { studentId, moduleId } = req.body;

  QuizModel.find({ studentId, moduleId })
    .then((data) => {
      console.log("Quiz marks fetched successfully");
      res.status(200).json(data);
    })
    .catch((err) => {
      console.log("Error fetching quiz marks", err);
      res.status(400).json({ message: err.message });
    });
};
