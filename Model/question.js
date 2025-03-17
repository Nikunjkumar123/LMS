const mongoose = require('mongoose');
const QuestionSchema = new mongoose.Schema({
    quizId: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz", required: true },
    questionText: { type: String, required: true },
    options: [
        { text: String, isCorrect: Boolean }
    ],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Question", QuestionSchema);
