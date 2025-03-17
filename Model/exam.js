const mongoose = require("mongoose");

const ExamSchema = new mongoose.Schema({
  ExamType: {
    type: String,
  },
  StudentDetail: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'Student'
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'Course'
  },
  Description: {
    type: String,
  },
  ExamFeeReceived: {
    type: String,
  },
  ExamFormStatus: {
    type: String,
  },
  PaymentStatus: {
    type: String,
  },
  ExamTitle: {
    type: String,
  },
  Date: {
    type: String,
  },
  Duration: {
    type: String,
  },
  MaxMarks: {
    type: String,
  },
  Status: {
    type: String,
  },
  
});

module.exports = mongoose.model("Exam", ExamSchema);
