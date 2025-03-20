const mongoose = require("mongoose");
const { type } = require("os");

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
  createdBy:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Admin'
  },
  questions:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Question'
  }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Exam", ExamSchema);
