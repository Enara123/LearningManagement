const QuestionModel = require("../models/QuestionModel");
const Question = require("../models/QuestionModel");

module.exports.getQuestions = async (req, res) => {
  const questions = await Question.find();
  res.send(questions);
};

module.exports.saveQuestion = (req, res) => {
  const { questionNumber, complexity, question, answer, status } = req.body;

  Question.create({ questionNumber, complexity, question, answer, status })
    .then((data) => {
      console.log("Saved Successfully...");
      res.status(201).send(data);
    })
    .catch((err) => {
      console.log(err);
      res.send({ error: err, msg: "Something went wrong!" });
    });
};

module.exports.updateQuestion = (req, res) => {
  const { id } = req.params;
  const { questionNumber, complexity, question, answer, status } = req.body;

  QuestionModel.findByIdAndUpdate(id, {
    questionNumber,
    complexity,
    question,
    answer,
    status,
  })
    .then(() => res.send("Updated successfully"))
    .catch((err) => {
      console.log(err);
      res.send({ error: err, msg: "Something went wrong!" });
    });
};

module.exports.deleteQuestion = (req, res) => {
  const { id } = req.params;

  QuestionModel.findByIdAndDelete(id)
    .then(() => res.send("Deleted successfully"))
    .catch((err) => {
      console.log(err);
      res.send({ error: err, msg: "Something went wrong!" });
    });
};

module.exports.hideQuestion = (req, res) => {
  const { id } = req.params;

  QuestionModel.findByIdAndUpdate(id, { status: "Hidden" })
    .then(() => res.send("Hidden successfully"))
    .catch((err) => {
      console.log(err);
      res.send({ error: err, msg: "Something went wrong!" });
    });
};

module.exports.unhideQuestion = (req, res) => {
  const { id } = req.params;

  QuestionModel.findByIdAndUpdate(id, { status: "Active" })
    .then(() => res.send("Unhidden successfully"))
    .catch((err) => {
      console.log(err);
      res.send({ error: err, msg: "Something went wrong!" });
    });
};
