const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { type } = require("os");

const ProgramSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  image: {
    type: String,
  },
  Description: {
    type: String,
  },
  course:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Course'
  }]
  
});

module.exports = mongoose.model("Program", ProgramSchema);
