const { Router } = require("express");

const {
  getModules,
  saveModule,
  updateModule,
  deleteModule,
  addNewQuestion,
} = require("../controllers/ModuleController");


const router = Router();

router.get("/getmodules", getModules);
router.post("/savemodule", saveModule);
router.put("/updatemodule/:id", updateModule);
router.delete("/deletemodule/:id", deleteModule);
router.put("/module/:id/addquestion", addNewQuestion);

module.exports = router;