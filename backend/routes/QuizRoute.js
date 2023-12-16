const { Router } = require("express");

const {
  getQuiz,
  saveQuizMarks,
  getQuizByStudentIdAndModuleId,
  getMarksByModuleId
} = require("../controllers/QuizController");

const router = Router();

router.get("/quiz", getQuiz);
router.post("/quiz/save", saveQuizMarks);
router.get("/quiz/get/:studentId/:moduleId", getQuizByStudentIdAndModuleId);
router.get("/quiz/getmarks/:moduleId",getMarksByModuleId);

module.exports = router;
