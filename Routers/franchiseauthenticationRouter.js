const express = require('express');

const franchiseauthenticationRouter = express.Router();

const {addEnquiryFranchise,getEnquiryFranchise,updateEnquiryFranchise,deleteEnquiryFranchise} = require('../controllers/franchise.js');

franchiseauthenticationRouter.route('/add-enquiry').post(addEnquiryFranchise);
franchiseauthenticationRouter.route('/get-enquiry').get(getEnquiryFranchise);
franchiseauthenticationRouter.route('/update/:id').patch(updateEnquiryFranchise);
franchiseauthenticationRouter.route('/delete/:id').delete(deleteEnquiryFranchise);

module.exports = franchiseauthenticationRouter;