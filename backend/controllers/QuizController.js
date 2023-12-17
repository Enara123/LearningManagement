const QuizModel = require("../models/QuizModel");
const StudentModel = require("../models/StudentModel");
const ModuleModel = require("../models/ModuleModel"); // Add missing import statement

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

const calculateGrade = (percentage) => {
  if (percentage >= 75) {
    return "A";
  } else if (percentage >= 60) {
    return "B";
  } else if (percentage >= 40) {
    return "C";
  } else if (percentage >= 30) {
    return "D";
  } else {
    return "F";
  }
};

module.exports.getMarksByModuleId = async (req, res) => {
  const { moduleId } = req.params;

  const extractAttributes = (obj) => {
    const {
      quizQuestions: [{ questionNumber, complexity }],
    } = obj;
    return { questionId: obj._id, complexity, questionNumber };
  };

  try {
    const quizData = await QuizModel.find({ moduleId });
    const marksObject = {};

    // Fetch complexity information for all questions
    const complexityInfo = await Promise.all(
      quizData.flatMap((quiz) =>
        quiz.asnweredQuestions.map(async (answer) => ({
          questionId: answer.questionId,
          complexity: extractAttributes(
            await ModuleModel.findOne(
              { _id: moduleId, "quizQuestions._id": answer.questionId },
              { "quizQuestions.$": 1 }
            ).exec()
          ),
        }))
      )
    );

    for (const quiz of quizData) {
      const { studentId, marks, quizDate, questionIds, asnweredQuestions } =
        quiz;

      if (!marksObject[studentId]) {
        marksObject[studentId] = {
          studentId,
          attempts: [],
          studentObject: await StudentModel.findOne({ _id: studentId }),
        };
      }

      const attemptInfo = asnweredQuestions.map((answer) => {
        const foundComplexity = complexityInfo.find((info) => info.questionId === answer.questionId);
        return {
          questionId: answer.questionId,
          complexity: foundComplexity?.complexity,
          questionNumber: foundComplexity?.questionNumber,
        };
      });
      
      marksObject[studentId].attempts.push({
        questionIds,
        marks,
        quizDate,
        questions: attemptInfo,
      });
      
    }

    let id = 0;

    const marksArray = Object.values(marksObject).map(
      ({ studentId, attempts, studentObject }) => {
        id++;
        const noOfAttempts = attempts.length;
        const totalMarks = attempts.reduce(
          (acc, attempt) => acc + attempt.marks,
          0
        );
        const accuracy = (totalMarks / (noOfAttempts * 10)) * 100;
        const highestMark =
          (Math.max(...attempts.map((attempt) => attempt.marks)) / 10) * 100;
        const lowestMark =
          (Math.min(...attempts.map((attempt) => attempt.marks)) / 10) * 100;
        const marksPercentage = attempts.map(
          (attempt) => (attempt.marks / 10) * 100
        );
        const grade = calculateGrade(accuracy);

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
          grade,
        };
      }
    );

    const sortedMarksArray = marksArray.sort((a, b) =>
      b.accuracy !== a.accuracy
        ? b.accuracy - a.accuracy
        : b.noOfAttempts - a.noOfAttempts
    );

    sortedMarksArray.forEach((student, index) => (student.rank = index + 1));

    res.status(200).json(sortedMarksArray);
  } catch (err) {
    console.log("Error fetching quiz marks", err);
    res.status(400).json({ message: err.message });
  }
};
