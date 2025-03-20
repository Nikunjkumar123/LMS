const mongoose = require('mongoose');
const franchiseModel = require("../Model/franchise.js");

const addEnquiryFranchise = async (req, res) => {
  try {
    const { applicantName, centreLocation, SpecialisedCourseofCentre } = req.body;

    // Validate input
    if (!applicantName?.trim() || !centreLocation?.trim() || !SpecialisedCourseofCentre?.trim()) {
      return res.status(400).json({ msg: "All fields are required." });
    }

    // Check for duplicate entry
    const existingRequest = await franchiseModel.findOne({ applicantName, centreLocation });
    if (existingRequest) {
      return res.status(400).json({ msg: "Duplicate request exists." });
    }

    // Insert into database
    const franchiseRequest = await franchiseModel.create({
      applicantName: applicantName,
      centreLocation: centreLocation,
      SpecialisedCourseofCentre: SpecialisedCourseofCentre,
    });

    return res.status(201).json({ msg: "Added to franchise request list", franchiseRequest });
  } catch (error) {
    console.error("Error during franchise request:", error.message, error.stack);
    res.status(500).json({ msg: "Franchise request failed. Please try again later." });
  }
};

const getEnquiryFranchise = async (req, res) => {
  try {
    const allfranchiserequest = await franchiseModel.find();
    if (!allfranchiserequest) {
      return res.status(500).json({ msg: "No franchise request available" });
    }
    return res.status(200).json({ requests: allfranchiserequest });
  } catch (error) {
    console.error("Error during getting franchise:", error); // Log error for debugging
    res
      .status(500)
      .json({ message: "getting franchise failed. Please try again later." });
  }
};
const updateEnquiryFranchise = async (req, res) => {
    try {
      const { id } = req.params; // Fix destructuring
  
      const updatedFranchise = await franchiseModel.findOneAndUpdate(
        { _id: id },  // Correct filter
        req.body,     // Update data
        { new: true, } // Return updated document
      );
  
      if (!updatedFranchise) {
        return res.status(404).json({ message: "Franchise not found" });
      }
  
      res.status(200).json(updatedFranchise);
    } catch (error) {
      console.error("Error during update Enquiry Franchise:", error);
      res
        .status(500)
        .json({ message: "Update Enquiry Franchise failed. Please try again later." });
    }
  };
  
  const deleteEnquiryFranchise = async (req, res) => {
    try {
      const { id } = req.params; // Extract the id from request params
  
      const deletedFranchise = await franchiseModel.findByIdAndDelete(id);
  
      if (!deletedFranchise) {
        return res.status(404).json({ message: "Franchise not found" });
      }
  
      res.status(200).json({ message: "Franchise deleted successfully" });
    } catch (error) {
      console.error("Error deleting Enquiry Franchise:", error);
      res.status(500).json({ message: "Failed to delete Franchise. Please try again later." });
    }
  };
  

module.exports = {
  addEnquiryFranchise,
  getEnquiryFranchise,
  updateEnquiryFranchise,
  deleteEnquiryFranchise,
};
