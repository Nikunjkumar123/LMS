const express = require('express');

const studentAuthenticationRouter = express.Router();

const {StudentregisterbyAdmin,Studentregisterbycentre,loginStudent,logoutStudent,forgotPasswordStudent,verifyTokenStudent,updatePasswordOTPStudent} = require('../controllers/student.js');

studentAuthenticationRouter.route('/register-student-superAdmin').post(StudentregisterbyAdmin);
studentAuthenticationRouter.route('/register-student-centre').post(Studentregisterbycentre);
studentAuthenticationRouter.route('/login').post(loginStudent);
studentAuthenticationRouter.route('/logout').post(logoutStudent);
studentAuthenticationRouter.route('/forgotpassword').post(forgotPasswordStudent);
studentAuthenticationRouter.route('/verifyToken').post(verifyTokenStudent);
studentAuthenticationRouter.route('/updatePassword').post(updatePasswordOTPStudent);



module.exports = studentAuthenticationRouter;