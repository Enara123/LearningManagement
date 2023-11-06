const { Router } = require("express");

const {
  getLecturers,
  saveLecturer,
  updateLecturer,
  deleteLecturer,
} = require("../controllers/LecturerController");

const router = Router();

router.get("/getlecturers", getLecturers);
router.post("/savelecturer", saveLecturer);
router.put("/updatelecturer/:id", updateLecturer);
router.delete("/deletelecturer/:id", deleteLecturer);
