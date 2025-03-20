const mongoose = require("mongoose");

const franchiseSchema = new mongoose.Schema({
    applicantName:{
        type:String,
    },
    centreLocation:{
        type:String,
    },
    SpecialisedCourseofCentre:{
        type:String,
    },
    DateTimeofApplication:{
        type: Date, 
        default: Date.now
    },
    Status:{
        type:String,
        enum:['Rejected','Pending','Approved'],
        default:'Pending',
    }
})

module.exports = mongoose.model('Franchise',franchiseSchema);