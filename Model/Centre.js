const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const centreSchema = new mongoose.Schema({
  CenterCode: {
    type: String,
  },
  NameOfCenter: {
    type: String,
  },
  SpecialisedSkillofCentre: {
    type: String,
  },
  AssignedCounsellor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Counsellor",
  },
  password: {
    type: String,
  },
  loginId: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  role: {
    type: String,
    default: "centre",
  },
  phone: {
    type: String,
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
  location: { 
    type: String, 
    required: true 
  },
  capacity: { 
    type: Number, 
    required: true 
  },
  availableSeats: { 
    type: Number, 
    required: true 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

// centreSchema.pre("save", async function (next) {
//   try {
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
//   } catch (error) {
//     next(error);
//   }
// });

// centreSchema.methods.comparePassword = async function (candidatePassword) {
//   try {
//     return await bcrypt.compare(candidatePassword, this.password);
//   } catch (err) {
//     throw new Error("Error comparing passwords");
//   }
// };

centreSchema.methods.createToken = function () {
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

module.exports = mongoose.model("Centre", centreSchema);
