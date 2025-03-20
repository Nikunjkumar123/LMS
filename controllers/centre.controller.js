const centreModel = require("../Model/Centre.js");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");

const nodemailer = require("nodemailer");

const sentResetPasswordMail = async (name, email, myToken) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587, // Use 587 for TLS
      secure: false, // Use false for TLS
      requireTLS: true, // Ensure TLS is used
      auth: {
        user: process.env.EMAILUSER,
        pass: process.env.EMAILPASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAILUSER,
      to: email,
      subject: "For reset password",
      html:
        "<p>Hi " +
        name +
        ", please check 6 digit OTP " +
        myToken +
        " for reset your password</a></p>",
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Mail has been sent: ", info.response);
      }
    });
  } catch (error) {
    console.error("Error while sending email: ", error);
  }
};

const registerCentre = async (req, res) => {
  try {
    let image;
    if (req.files && req.files.image) {
      const result = await cloudinary.uploader.upload(
        req.files.image.tempFilePath,
        {
          use_filename: true,
          folder: "file-upload",
        }
      );
      fs.unlinkSync(req.files.image.tempFilePath);
      image = result.secure_url;
    }

    const {
      CenterCode,
      NameOfCenter,
      SpecialisedSkillofCentre,
      AssignedCounsellor,
      password,
      loginId,
    } = req.body;

    // Create a new user
    const user = await centreModel.create({
      CenterCode,
      NameOfCenter,
      SpecialisedSkillofCentre,
      AssignedCounsellor,
      password,
      loginId,
      image,
    });

    res.status(201).json({ message: "user created" });
  } catch (error) {
    return res.status(500).json({
      msg: " register failed",
      error: error.message,
    });
  }
};
const loginCentre = async (req, res) => {
  try {
    const { loginId, password } = req.body;

    if (!loginId || !password) {
      return res.status(400).json({ message: "Enter complete fields" });
    }

    const checkcentre = await centreModel.findOne({ loginId });
    // console.log(checkuser)
    if (!checkcentre) {
      return res.status(400).json({ message: "Enter correct id " });
    }

    if(checkcentre.password != password){
      return res.status(400).json({ message: "Enter correct password " });
    }
    

    const token = checkuser.createToken();
    if (!token) {
      return res.status(500).json({ message: "Token problem" });
    }

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 2592000000, // 30 days in milliseconds
      sameSite: "None",
    });

    return res.status(200).json({ user: "Login successful" });
  } catch (error) {
    console.error("Error during login:", error); // Log error for debugging
    res.status(500).json({ message: "Login failed. Please try again later." });
  }
};
const logoutCentre = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "None",
    });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ error: error, message: "Logout failed" });
  }
};

const generateOTP = () => {
  return crypto.randomInt(100000, 999999).toString(); // Generates a 6-digit OTP
};

const forgotPasswordCentre = async (req, res) => {
  try {
    const userEmail = req.body.email;
    const userData = await centreModel.findOne({ email: userEmail });
    if (!userData) return res.status(400).json({ msg: "email not registered" });
    const otp = generateOTP();
    const data = await centreModel.updateOne(
      { email: userEmail },
      { $set: { myToken: otp } }
    );
    sentResetPasswordMail(userData.name, userData.email, otp);
    res.status(200).json({ msg: "please check your Email" });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};
const verifyTokenCentre = async (req, res) => {
  try {
    const { email, myToken } = req.body;
    const user = await centreModel.findOne({ email: email });
    if (user.myToken != myToken) {
      return res.status(400).json({ msg: "enter correct otp" });
    }
    user.myToken = 2911200429112004;
    await user.save();
    res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const updatePasswordOTPCentre = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await centreModel.findOne({ email: email });
    if (user.myToken != 2911200429112004) {
      return res
        .status(400)
        .json({ msg: "please verify yourself or try again" });
    }
    user.password = password;
    user.myToken = "";
    await user.save();
    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  registerCentre,
  loginCentre,
  logoutCentre,
  forgotPasswordCentre,
  verifyTokenCentre,
  updatePasswordOTPCentre,
};
