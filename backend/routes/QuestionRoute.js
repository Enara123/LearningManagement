const { Router } = require("express");

const {
  getQuestions,
  saveQuestion,
  updateQuestion,
  deleteQuestion,
  hideQuestion,
  unhideQuestion,
} = require("../controllers/QuestionController");

const router = Router();

router.get("/getquestion", getQuestions);
router.post("/savequestion", saveQuestion);
router.put("/updatequestion/:id", updateQuestion);
router.delete("/deletequestion/:id", deleteQuestion);
router.put("/hidequestion/:id", hideQuestion);
router.put("/unhidequestion/:id", unhideQuestion);

module.exports = router;
