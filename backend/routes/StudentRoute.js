const { Router } = require("express");

const {
  getStudents,
  getBatchStudents,
  saveStudent,
  changePassword,
  deleteStudent,
  loginStudent,
  getBatches,
} = require("../controllers/StudentController");

const router = Router();

router.get("/student", getStudents);
router.get("/student/batch", getBatchStudents);
router.post("/student/save", saveStudent);
router.put("/student/change-password", changePassword);
router.delete("/student/delete/:id", deleteStudent);
router.post("/student/login", loginStudent);
router.get("/student/batch/all", getBatches);

module.exports = router;
