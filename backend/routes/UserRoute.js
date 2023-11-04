const { Router } = require("express");

const {
  getUsers,
  saveUser,
  updateUser,
  deleteUser,
  loginUser,
} = require("../controllers/UserControllers");

const router = Router();

router.get("/get", getUsers);
router.post("/login", loginUser);
router.post("/save", saveUser);
router.put("/update/:id", updateUser);
router.delete("/delete/:id", deleteUser);

module.exports = router;
