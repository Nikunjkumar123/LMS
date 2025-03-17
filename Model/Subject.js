const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { type } = require("os");

const SubjectSchema = new mongoose.Schema({
  CourseName: {
    type: String,
  },
  CourseCode: {
    type: String,
  },
  image: {
    type: String,
  },
  subjectname: {
    type: String,
  },
  SubjectCode: {
    type: String,
  },
  Description: {
    type: String,
  },
  video_Content:[{
    type:String
  }],
  readable_Content:[{
    type:String
  }],
});

module.exports = mongoose.model("Subject", SubjectSchema);
