const { Router } = require("express");

const {
  getModules,
  getModulesById,
  saveModule,
  updateModule,
  deleteModule,
  addNewQuestion,
  updateQuestion,
  deleteQuestion,
  hideQuestion,
  unHideQuestion,
  getQuestions,
  addAssessment,
  updateAssessment,
  deleteAssessment,
  hideAssessment,
  unHideAssessment,
  getAssessments,
  addAssessmentQuestion,
  updateAssessmentQuestion,
  deleteAssessmentQuestion,
  hideAssessmentQuestion,
  unHideAssessmentQuestion,
  getAssessmentQuestions,
  setAllowedBatch,
  getQuizQuestions,
  getQuestion
} = require("../controllers/ModuleController");

const router = Router();

router.get("/getmodules", getModules);
router.get("/getmodule/:id", getModulesById);
router.post("/savemodule", saveModule);
router.put("/updatemodule/:id", updateModule);
router.delete("/deletemodule/:id", deleteModule);
router.put("/module/:id/addquestion", addNewQuestion);
router.put("/module/:id/updatequestion", updateQuestion);
router.put("/module/:id/deletequestion", deleteQuestion);
router.put("/module/:id/hidequestion", hideQuestion);
router.put("/module/:id/unhidequestion", unHideQuestion);
router.get("/module/:moduleId/getquestions/:studentId", getQuestions);
router.get("/module/:moduleId/quizQuestion", getQuizQuestions)
router.get("/module/:moduleId/getquestion/:questionId",getQuestion)
router.put("/module/:id/addassessment", addAssessment);
router.put("/module/:id/updateassessment", updateAssessment);
router.put("/module/:id/deleteassessment", deleteAssessment);
router.put("/module/:id/hideAssessment", hideAssessment);
router.put("/module/:id/unhideAssessment", unHideAssessment);
router.get("/module/:id/getassessment", getAssessments);
router.put(
  "/module/:id/addassessmentquestion/:assessmentId",
  addAssessmentQuestion
);
router.put("/module/:id/updateassessmentquestion", updateAssessmentQuestion);
router.put("/module/:id/deleteassessmentquestion", deleteAssessmentQuestion);
router.put("/module/:id/hideassessmentquestion", hideAssessmentQuestion);
router.put("/module/:id/unhideassessmentquestion", unHideAssessmentQuestion);
router.get("/module/:id/getassessmentquestions", getAssessmentQuestions);
router.put("/module/:id/batch/save", setAllowedBatch);

module.exports = router;
