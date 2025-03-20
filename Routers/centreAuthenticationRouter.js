const express = require('express');
const authenticationRouter = require('./SuperadminauthenticationRouter');

const centreAuthenticationRouter = express.Router();

const {registerCentre,loginCentre,logoutCentre,forgotPasswordCentre,verifyTokenCentre,updatePasswordOTPCentre}=require('../controllers/centre.controller.js');

centreAuthenticationRouter.route('/register').post(registerCentre);
centreAuthenticationRouter.route('/login').post(loginCentre);
centreAuthenticationRouter.route('/logout').post(logoutCentre);
centreAuthenticationRouter.route('/forgotpassword').post(forgotPasswordCentre);
centreAuthenticationRouter.route('/verifyToken').post(verifyTokenCentre);
authenticationRouter.route('/updatePassword').post(updatePasswordOTPCentre);

module.exports = centreAuthenticationRouter;
