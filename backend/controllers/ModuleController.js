const ModuleModel = require('../models/ModuleModel');

module.exports.getModules = async (req, res) => {
    const modules = await ModuleModel.find();
    res.send(modules);
}

module.exports.saveModule = (req, res) => {
    const { moduleName, moduleNumber, moduleDescription, moduleStatus } = req.body;

    ModuleModel.create({ moduleName, moduleNumber, moduleDescription, moduleStatus })
        .then((data) => {
            console.log('Saved Successfully...');
            res.status(201).send(data);
        })
        .catch((err) => {
            console.log(err);
            res.send({ error: err, msg: 'Something went wrong!' });
        });
}

module.exports.updateModule = (req, res) => {
    const { id } = req.params;
    const { moduleName, moduleNumber, moduleDescription, moduleStatus } = req.body;

    ModuleModel.findByIdAndUpdate(id, { moduleName, moduleNumber, moduleDescription, moduleStatus })
        .then(() => res.send('Updated successfully'))
        .catch((err) => {
            console.log(err);
            res.send({ error: err, msg: 'Something went wrong!' });
        });
}

module.exports.deleteModule = (req, res) => {
    const { id } = req.params;

    ModuleModel.findByIdAndDelete(id)
        .then(() => res.send('Deleted successfully'))
        .catch((err) => {
            console.log(err);
            res.send({ error: err, msg: 'Something went wrong!' });
        });
}

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
                return res.status(404).send('Module not found');
            }
            res.json(updatedModule);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({ error: err, msg: 'Something went wrong!' });
        });
}

