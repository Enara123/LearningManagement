const { Router } = require("express");

const {
  getUsers,
  saveUser,
  updateUser,
  deleteUser,
  loginUser,
} = require("../controllers/UserControllers");

const router = Router();

router.get("/getuser", getUsers);
router.post("/login", loginUser);
router.post("/saveuser", saveUser);
router.put("/updateuser/:id", updateUser);
router.delete("/deleteuser/:id", deleteUser);

module.exports = router;
