const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { type } = require("os");

const CourseSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  image: {
    type: String,
  },
  Description: {
    type: String,
  },
  CourseCode:{
    type:String,
  },
  CourseName:{
    type:String,
  },
  Duration: {
    type:String,
  },
  CourseFee:{
    type:String,
  },
  subject:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Subject'
  }]
});

module.exports = mongoose.model("Course", CourseSchema);
