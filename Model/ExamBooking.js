const mongoose = require('mongoose');

const ExamBookingSchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
    examId: { type: mongoose.Schema.Types.ObjectId, ref: "Exam", required: true },
    centreId: { type: mongoose.Schema.Types.ObjectId, ref: "Centre", required: true },
    bookedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("ExamBooking", ExamBookingSchema);
