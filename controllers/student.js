const studentModel = require("../Model/student.js");
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

const StudentregisterbyAdmin = async (req, res) => {
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
      name,
      email,
      phone,
      Gender,
      Dob,
      fatherName,
      motherName,
      academicQualification,
      technicalQualification,
      NameOfSkill,
      Experience,
      Name_AddressOfLastJob,
      Nationality,
      address,
      city,
      password,
    } = req.body;

    if(!name || !email){
        return res.status(400).json({msg:"Enter complete fields"});
    }
    let onDemandAdmissionForm = true;
    // Create a new user
    const user = await studentModel.create({
      name,
      email,
      phone,
      Gender,
      Dob,
      fatherName,
      motherName,
      academicQualification,
      technicalQualification,
      NameOfSkill,
      Experience,
      Name_AddressOfLastJob,
      Nationality,
      address,
      city,
      password,
      image,
      onDemandAdmissionForm,
    });

    res.status(201).json({ message: "student created" });
  } catch (error) {
    return res.status(500).json({
      msg: " register failed",
      error: error.message,
    });
  }
};
const Studentregisterbycentre = async (req, res) => {
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
      name,
      email,
      phone,
      Gender,
      Dob,
      fatherName,
      motherName,
      academicQualification,
      technicalQualification,
      Nationality,
      address,
      city,
      password,
      place_dateOfRegistration,
      InstitutionName,centreGeneratedStudentId
    } = req.body;

    if(!name || !email){
        return res.status(400).json({msg:"Enter complete fields"});
    }
    let generalAdmissionForm = true;
    // Create a new user
    const user = await studentModel.create({
      name,
      email,
      phone,
      Gender,
      Dob,
      fatherName,
      motherName,
      academicQualification,
      technicalQualification,
      Name_AddressOfLastJob,
      Nationality,
      address,
      city,
      password,
      image,
      generalAdmissionForm,place_dateOfRegistration,InstitutionName,centreGeneratedStudentId
    });

    res.status(201).json({ message: "student created" });
  } catch (error) {
    return res.status(500).json({
      msg: " register failed",
      error: error.message,
    });
  }
};
const loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Enter complete fields" });
    }

    const checkStudent = await studentModel.findOne({ email });
    // console.log(checkuser)
    if (!checkcentre) {
      return res.status(400).json({ message: "Enter correct id " });
    }

    if (checkcentre.password != password) {
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
const logoutStudent = async (req, res) => {
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

const forgotPasswordStudent = async (req, res) => {
  try {
    const userEmail = req.body.email;
    const userData = await studentModel.findOne({ email: userEmail });
    if (!userData) return res.status(400).json({ msg: "email not registered" });
    const otp = generateOTP();
    const data = await studentModel.updateOne(
      { email: userEmail },
      { $set: { myToken: otp } }
    );
    sentResetPasswordMail(userData.name, userData.email, otp);
    res.status(200).json({ msg: "please check your Email" });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};
const verifyTokenStudent = async (req, res) => {
  try {
    const { email, myToken } = req.body;
    const user = await studentModel.findOne({ email: email });
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
const updatePasswordOTPStudent = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await studentModel.findOne({ email: email });
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
  StudentregisterbyAdmin,
  Studentregisterbycentre,
  loginStudent,
  logoutStudent,
  forgotPasswordStudent,
  verifyTokenStudent,
  updatePasswordOTPStudent,
};
