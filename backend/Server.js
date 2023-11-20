const express = require("express");

const mongoose = require("mongoose");
require("dotenv").config();

const userroutes = require("./routes/UserRoute");
const moduleroutes = require("./routes/ModuleRoute");
const lecturerroutes = require("./routes/LecturerRoute");
const studentroutes = require("./routes/StudentRoute");
const quizroutes = require("./routes/QuizRoute");

const cors = require("cors");

const app = express();
const PORT = process.env.PORT | 5000;

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.use(
  "/api",
  userroutes,
  moduleroutes,
  lecturerroutes,
  studentroutes,
  quizroutes
);

app.listen(PORT, () => console.log(`Listening at ${PORT}`));
