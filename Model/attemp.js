const mongoose = require('mongoose');
const AttemptSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    quizId: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz", required: true },
    responses: [
        {
            questionId: { type: mongoose.Schema.Types.ObjectId, ref: "Question" },
            selectedOption: { type: String, required: true } // User's answer
        }
    ],
    score: { type: Number, default: null }, // Auto-calculated after submission
    isCompleted: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Attempt", AttemptSchema);
