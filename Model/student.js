const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { type } = require("os");

const studentSchema = new mongoose.Schema({
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
    default: "student",
  },
  phone: {
    type: String,
  },
  Gender: {
    type: String,
  },
  Dob: {
    type: String,
  },
  fatherName: {
    type: String,
  },
  motherName: {
    type: String,
  },
  academicQualification: {
    type: String,
  },
  technicalQualification: {
    type: String,
  },
  NameOfSkill: {
    type: String,
  },
  Experience: {
    type: String,
  },
  Name_AddressOfLastJob: {
    type: String,
  },
  Nationality: {
    type: String,
  },
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  InstitutionName: {
    type: String,
  },
  place_dateOfRegistration: {
    //already registered
    type: String,
  },
  signature: {
    type: image,
  },
  onDemandAdmissionForm: { //for skilled and exp
    type: Boolean,
  },
  generalAdmissionForm: { //through training centre
    type: Boolean,
  },
  InstitutionName:{
    type:String,
  },
  codeName_addressOfTrainingCentre: {
    type: String,
  },
  centreGeneratedStudentId:{
    type:String,
  },
  placedAt_byIISt:{
    type:String,
  },
  Training_byIISt:{
    type:String,
  },
  enrolledInProgram:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Program'
  }],
  centreAssigned:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Centre'
  },
  counsellorAssigned:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Counsellor'
  },
  exam:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Exam'
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

studentSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

studentSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (err) {
    throw new Error("Error comparing passwords");
  }
};

studentSchema.methods.createToken = function () {
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

module.exports = mongoose.model("Student", studentSchema);
