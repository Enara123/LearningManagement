const { Router } = require("express");

const {
  getLecturers,
  saveLecturer,
  updateLecturer,
  deleteLecturer,
  loginLecturer,
} = require("../controllers/LecturerController");

const router = Router();

router.get("/lecturer", getLecturers);
router.post("/lecturer/save", saveLecturer);
router.put("/lecturer/update/:id", updateLecturer);
router.delete("/lecturer/delete/:id", deleteLecturer);
router.post("/lecturer/login", loginLecturer);

module.exports = router;
