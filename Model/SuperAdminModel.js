const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const superAdminSchema = new mongoose.Schema({
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

superAdminSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

superAdminSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (err) {
    throw new Error("Error comparing passwords");
  }
};

superAdminSchema.methods.createToken = function () {
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

module.exports = mongoose.model("SuperAdmin", superAdminSchema);
