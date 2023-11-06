const mongoose = require("mongoose");

const moduleSchema = new mongoose.Schema({
    moduleName: { type: String, required: true, unique: true },
    moduleNumber: { type: Number, required: true, unique: true },
    moduleDescription: String,
    moduleStatus: String,
    quizQuestions: [
        {
            questionNumber: Number, 
            complexity: Number, 
            question: String, 
            answer: [String], 
            status: String, 
            correctAnswer: [String]
        }
    ],
});

module.exports = mongoose.model("Module", moduleSchema);