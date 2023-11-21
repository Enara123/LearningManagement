const ModuleModel = require("../models/ModuleModel");
//const { v4: uuidv4 } = require("uuid");

module.exports.getModules = async (req, res) => {
  const modules = await ModuleModel.find();
  res.send(modules);
};

module.exports.getModulesById = (req, res) => {
  const { id } = req.params;
  const module = ModuleModel.findById(id)
    .then((data) => {
      if (!data) {
        return res.status(404).send("Module not found");
      }
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.send({ error: err, msg: "Something went wrong!" });
    });
};

module.exports.saveModule = (req, res) => {
  const {
    moduleName,
    moduleDescription,
    noOfAssessments,
    expectedStudyHours,
    moduleStatus,
  } = req.body;

  ModuleModel.create({
    moduleName,
    moduleDescription,
    noOfAssessments,
    expectedStudyHours,
    moduleStatus,
  })
    .then((data) => {
      console.log("Saved Successfully...");
      res.status(201).send(data);
    })
    .catch((err) => {
      console.log(err);
      res.send({ error: err, msg: "Something went wrong!" });
    });
};

module.exports.updateModule = (req, res) => {
  const { id } = req.params;
  const {
    moduleName,
    moduleDescription,
    noOfAssessments,
    expectedStudyHours,
    moduleStatus,
  } = req.body;

  ModuleModel.findByIdAndUpdate(id, {
    moduleName,
    moduleDescription,
    noOfAssessments,
    expectedStudyHours,
    moduleStatus,
  })
    .then(() => res.send("Updated successfully"))
    .catch((err) => {
      console.log(err);
      res.send({ error: err, msg: "Something went wrong!" });
    });
};

module.exports.deleteModule = (req, res) => {
  const { id } = req.params;

  ModuleModel.findByIdAndDelete(id)
    .then(() => res.send("Deleted successfully"))
    .catch((err) => {
      console.log(err);
      res.send({ error: err, msg: "Something went wrong!" });
    });
};

module.exports.addNewQuestion = (req, res) => {
  const { id } = req.params;
  const question = req.body;

  const newQuestion = {
    questionNumber: question.questionNumber,
    complexity: question.complexity,
    question: question.question,
    answer: question.answer,
    status: question.status,
    correctAnswer: question.correctAnswer,
  };

  ModuleModel.findOneAndUpdate(
    { _id: id },
    { $push: { quizQuestions: newQuestion } },
    { new: true }
  )
    .then((updatedModule) => {
      if (!updatedModule) {
        return res.status(404).send("Module not found");
      }
      res.json(updatedModule);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ error: err, msg: "Something went wrong!" });
    });
};

module.exports.updateQuestion = (req, res) => {
  const { id } = req.params;
  const question = req.body;

  const updatedQuestion = {
    questionNumber: question.questionNumber,
    complexity: question.complexity,
    question: question.question,
    answer: question.answer,
    status: question.status,
    correctAnswer: question.correctAnswer,
  };

  ModuleModel.findOneAndUpdate(
    { _id: id, "quizQuestions._id": question._id },
    { $set: { "quizQuestions.$": updatedQuestion } },
    { new: true }
  )
    .then((updatedModule) => {
      if (!updatedModule) {
        return res.status(404).send("Module not found");
      }
      res.json(updatedModule);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ error: err, msg: "Something went wrong!" });
    });
};

module.exports.deleteQuestion = (req, res) => {
  const { id } = req.params;

  ModuleModel.findOneAndUpdate(
    { _id: id },
    { $pull: { quizQuestions: { _id: req.body._id } } },
    { new: true }
  )
    .then((updatedModule) => {
      if (!updatedModule) {
        return res.status(404).send("Module not found");
      }
      res.json(updatedModule);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ error: err, msg: "Something went wrong!" });
    });
};

module.exports.hideQuestion = (req, res) => {
  const { id } = req.params;

  ModuleModel.findOneAndUpdate(
    { _id: id, "quizQuestions._id": req.body._id },
    { $set: { "quizQuestions.$.status": "Hidden" } },
    { new: true }
  )
    .then((updatedModule) => {
      if (!updatedModule) {
        return res.status(404).send("Module not found");
      }
      res.json(updatedModule);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ error: err, msg: "Something went wrong!" });
    });
};

module.exports.unHideQuestion = (req, res) => {
  const { id } = req.params;

  ModuleModel.findOneAndUpdate(
    { _id: id, "quizQuestions._id": req.body._id },
    { $set: { "quizQuestions.$.status": "Active" } },
    { new: true }
  )
    .then((updatedModule) => {
      if (!updatedModule) {
        return res.status(404).send("Module not found");
      }
      res.json(updatedModule);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ error: err, msg: "Something went wrong!" });
    });
};

module.exports.getQuestions = (req, res) => {
  const { id } = req.params;

  ModuleModel.findById(id)
    .select("quizQuestions")
    .exec()
    .then((module) => {
      if (!module) {
        return res.status(404).send("Module not found");
      }

      const randomQuestions = module.quizQuestions
        .sort(() => 0.5 - Math.random())
        .slice(0, 10);

      res.json(randomQuestions);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ error: err, msg: "Something went wrong!" });
    });
};

module.exports.addAssessment = (req, res) => {
  const { id } = req.params;
  const assessment = req.body;

  const newAssessment = {
    assessmentNumber: assessment.assessmentNumber,
    assessmentName: assessment.assessmentName,
    assessmentDescription: assessment.assessmentDescription,
    assessmentStatus: assessment.assessmentStatus,
    unlockTime: assessment.unlockTime,
    dueTime: assessment.dueTime,
    assessmentQuestions: assessment.assessmentQuestions,
  };

  ModuleModel.findOneAndUpdate(
    { _id: id },
    { $push: { assessment: newAssessment } },
    { new: true }
  )
    .then((updatedModule) => {
      if (!updatedModule) {
        return res.status(404).send("Module not found");
      }
      res.json(updatedModule);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ error: err, msg: "Something went wrong!" });
    });
};

module.exports.updateAssessment = (req, res) => {
  const { id } = req.params;
  const assessment = req.body;

  const updatedAssessment = {
    assessmentNumber: assessment.assessmentNumber,
    assessmentName: assessment.assessmentName,
    assessmentDescription: assessment.assessmentDescription,
    assessmentStatus: assessment.assessmentStatus,
    unlockTime: assessment.unlockTime,
    dueTime: assessment.dueTime,
    assessmentQuestions: assessment.assessmentQuestions,
  };

  ModuleModel.findOneAndUpdate(
    { _id: id, "assessment._id": assessment._id },
    { $set: { "assessment.$": updatedAssessment } },
    { new: true }
  )
    .then((updatedModule) => {
      if (!updatedModule) {
        return res.status(404).send("Module not found");
      }
      res.json(updatedModule);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ error: err, msg: "Something went wrong!" });
    });
};

module.exports.deleteAssessment = (req, res) => {
  const { id } = req.params;

  ModuleModel.findOneAndUpdate(
    { _id: id },
    { $pull: { assessment: { _id: req.body._id } } },
    { new: true }
  )
    .then((updatedModule) => {
      if (!updatedModule) {
        return res.status(404).send("Module not found");
      }
      res.json(updatedModule);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ error: err, msg: "Something went wrong!" });
    });
};

module.exports.hideAssessment = (req, res) => {
  const { id } = req.params;

  ModuleModel.findOneAndUpdate(
    { _id: id, "assessment._id": req.body._id },
    { $set: { "assessment.$.assessmentStatus": "Hidden" } },
    { new: true }
  )
    .then((updatedModule) => {
      if (!updatedModule) {
        return res.status(404).send("Module not found");
      }
      res.json(updatedModule);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ error: err, msg: "Something went wrong!" });
    });
};

module.exports.unHideAssessment = (req, res) => {
  const { id } = req.params;

  ModuleModel.findOneAndUpdate(
    { _id: id, "assessment._id": req.body._id },
    { $set: { "assessment.$.assessmentStatus": "Active" } },
    { new: true }
  )
    .then((updatedModule) => {
      if (!updatedModule) {
        return res.status(404).send("Module not found");
      }
      res.json(updatedModule);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ error: err, msg: "Something went wrong!" });
    });
};

module.exports.getAssessments = (req, res) => {
  const { id } = req.params;

  ModuleModel.findById(id)
    .select("assessment")
    .exec()
    .then((module) => {
      if (!module) {
        return res.status(404).send("Module not found");
      }
      res.json(module.assessment);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ error: err, msg: "Something went wrong!" });
    });
};

module.exports.addAssessmentQuestion = (req, res) => {
  const { id } = req.params;
  const question = req.body;

  const newQuestion = {
    questionNumber: question.questionNumber,
    question: question.question,
    answer: question.answer,
    status: question.status,
    correctAnswer: question.correctAnswer,
  };

  ModuleModel.findOneAndUpdate(
    { _id: id, "assessment._id": question._id },
    { $push: { "assessment.$.assessmentQuestions": newQuestion } },
    { new: true }
  )
    .then((updatedModule) => {
      if (!updatedModule) {
        return res.status(404).send("Module not found");
      }
      res.json(updatedModule);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ error: err, msg: "Something went wrong!" });
    });
};

module.exports.updateAssessmentQuestion = (req, res) => {
  const { id } = req.params;
  const question = req.body;

  const updatedQuestion = {
    questionNumber: question.questionNumber,
    question: question.question,
    answer: question.answer,
    status: question.status,
    correctAnswer: question.correctAnswer,
  };

  ModuleModel.findOneAndUpdate(
    { _id: id, "assessment._id": question._id },
    { $set: { "assessment.$.assessmentQuestions.$": updatedQuestion } },
    { new: true }
  )
    .then((updatedModule) => {
      if (!updatedModule) {
        return res.status(404).send("Module not found");
      }
      res.json(updatedModule);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ error: err, msg: "Something went wrong!" });
    });
};

module.exports.deleteAssessmentQuestion = (req, res) => {
  const { id } = req.params;

  ModuleModel.findOneAndUpdate(
    { _id: id, "assessment._id": req.body._id },
    { $pull: { "assessment.$.assessmentQuestions": { _id: req.body._id } } },
    { new: true }
  )
    .then((updatedModule) => {
      if (!updatedModule) {
        return res.status(404).send("Module not found");
      }
      res.json(updatedModule);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ error: err, msg: "Something went wrong!" });
    });
};

module.exports.hideAssessmentQuestion = (req, res) => {
  const { id } = req.params;

  ModuleModel.findOneAndUpdate(
    { _id: id, "assessment._id": req.body._id },
    { $set: { "assessment.$.assessmentQuestions.$.status": "Hidden" } },
    { new: true }
  )
    .then((updatedModule) => {
      if (!updatedModule) {
        return res.status(404).send("Module not found");
      }
      res.json(updatedModule);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ error: err, msg: "Something went wrong!" });
    });
};

module.exports.unHideAssessmentQuestion = (req, res) => {
  const { id } = req.params;

  ModuleModel.findOneAndUpdate(
    { _id: id, "assessment._id": req.body._id },
    { $set: { "assessment.$.assessmentQuestions.$.status": "Active" } },
    { new: true }
  )
    .then((updatedModule) => {
      if (!updatedModule) {
        return res.status(404).send("Module not found");
      }
      res.json(updatedModule);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ error: err, msg: "Something went wrong!" });
    });
};

module.exports.getAssessmentQuestions = (req, res) => {
  const { id } = req.params;

  ModuleModel.findById(id)
    .select("assessment.assessmentQuestions")
    .exec()
    .then((module) => {
      if (!module) {
        return res.status(404).send("Module not found");
      }
      res.json(module.assessment.assessmentQuestions);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ error: err, msg: "Something went wrong!" });
    });
};

module.exports.setAllowedBatch = (req, res) => {
  const { id } = req.params;

  const { batchId } = req.body;

  ModuleModel.findOneAndUpdate(
    { _id: id },
    { $push: { allowedBatches: batchId } },
    { new: true }
  )
    .then((updatedModule) => {
      if (!updatedModule) {
        return res.status(404).send("Module not found");
      }
      res.json(updatedModule);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ error: err, msg: "Something went wrong!" });
    });
};

module.exports.getAllowedBatches = (req, res) => {
  const { id } = req.params;

  ModuleModel.findById(id)
    .select("assessment.allowedBatches")
    .exec()
    .then((module) => {
      if (!module) {
        return res.status(404).send("Module not found");
      }
      res.json(module.assessment.allowedBatches);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ error: err, msg: "Something went wrong!" });
    });
};
