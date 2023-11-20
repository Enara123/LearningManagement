const { Router } = require("express");

const {
  getQuiz,
  saveQuizMarks,
  getQuizByStudentIdAndModuleId,
} = require("../controllers/QuizController");

const router = Router();

router.get("/quiz", getQuiz);
router.post("/quiz/save", saveQuizMarks);
router.get("/quiz/get", getQuizByStudentIdAndModuleId);

module.exports = router;
