const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { type } = require("os");

const Counsellorschema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "superAdmin",
  },
  phone: {
    type: String,
  },
  address: {
    type: String,
  },
  status: {
    type: String,
  },
  centre:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Centre"
  },
  student:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Student"
  },
  emailVerified: {
    type: Boolean,
  },
  image: {
    type: String,
  },
  myToken: {
    type: String,
    default: "",
  },
  Verified: {
    type: String,
    default: "no",
  },
});

Counsellorschema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

Counsellorschema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (err) {
    throw new Error("Error comparing passwords");
  }
};

Counsellorschema.methods.createToken = function () {
  const token = jwt.sign(
    {
      userId: this._id,
      email: this.email,
      role: this.role,
      name: this.fullName,
      gender: this.gender,
    },
    process.env.SECRCET,
    { expiresIn: process.env.Expires }
  );
  return token;
};

module.exports = mongoose.model("Counsellor", Counsellorschema);
