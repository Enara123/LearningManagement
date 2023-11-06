const mongoose = require("mongoose");

const moduleSchema = new mongoose.Schema({
    moduleName: { type: String, required: true, unique: true },
    moduleDescription: String,
    noOfAssessments: Number,
    expectedStudyHours: Number,
    moduleStatus: String,
    assessment: [
        {
            assessmentNumber: Number,
            assessmentName: String,
            assessmentDescription: String,
            assessmentStatus: String,
            unlockTime: Date,
            dueTime: Date,
            assementQuestions: [
                {
                    questionNumber: Number,
                    question: String,
                    answer: [String],
                    status: String,
                    correctAnswer: [String],
                },
            ],
        },
    ],
    
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