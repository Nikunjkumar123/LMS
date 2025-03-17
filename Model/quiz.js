const mongoose = require('mongoose');
const QuizSchema = new mongoose.Schema({
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    title: { type: String, required: true },
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
    passingScore: { type: Number, required: true }, // Example: 50%
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Quiz", QuizSchema);
