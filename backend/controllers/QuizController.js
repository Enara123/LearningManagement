const QuizModel = require("../models/QuizModel");
const StudentModel = require("../models/StudentModel");

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
  const { studentId, moduleId } = req.params;

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

module.exports.getMarksByModuleId = async (req, res) => {
  const { moduleId } = req.params;

  try {
    const quizData = await QuizModel.find({ moduleId });
    const marksObject = {};

    for (const quiz of quizData) {
      const studentId = quiz.studentId;
      const marks = quiz.marks;
      const quizDate = quiz.quizDate; // Assuming there is a property named quizDate in your QuizModel

      if (marksObject[studentId]) {
        marksObject[studentId].attempts.push({ marks, quizDate });
      } else {
        marksObject[studentId] = {
          studentId,
          attempts: [{ marks, quizDate }],
          studentObject: await StudentModel.findOne({ _id: studentId }),
        };
      }
    }

    let id = 0;

    const marksArray = Object.values(marksObject).map(({ studentId, attempts, studentObject }) => {
      id++;
      const noOfAttempts = attempts.length;
      const totalMarks = attempts.reduce((acc, attempt) => acc + attempt.marks, 0);
      const accuracy = (totalMarks / (noOfAttempts * 10)) * 100;
      const highestMark = (Math.max(...attempts.map(attempt => attempt.marks)) / 10) * 100;
      const lowestMark = (Math.min(...attempts.map(attempt => attempt.marks)) / 10) * 100;
      const marksPercentage = attempts.map(attempt => (attempt.marks / 10) * 100);

      return {
        id,
        indexNumber: studentObject.studentId,
        highestMark,
        lowestMark,
        noOfAttempts,
        accuracy,
        marksPercentage,
        studentId,
        attempts,
      };
    });

    res.status(200).json(marksArray);
  } catch (err) {
    console.log("Error fetching quiz marks", err);
    res.status(400).json({ message: err.message });
  }
};