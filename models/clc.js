import mongoose from 'mongoose'

const clcSchema = new mongoose.Schema({
    fName:{
        type : String,
        required : true
    },
    lName: {
        type : String,
        required : true,
    },
    fatherName: {
        type : String,
        required : true
    },
    class: {
        type : String,
        required : true,
    },
    classRollNumber: {
        type : Number,
        required : true,
    },
    session: {
        type : String,
        required : true,
    },
    registrationNumber: {
        type : String,
        default: Date.now,
        required : true,
    },
    universityRollNumber: {
        type : String,
        required : true,
    },
    universityPassingYear: {
        type : Number,
        required : true,
    },
    dOB: {
        type : String,
        required : true,
    },
    subjectTaken: {
        type : String,
        required : true,
    },
    email:{
        type : String,
        required : true,
    },
    appliedBy: {
        type : String,
        required : true
    },
    isApprove :{
        type: Boolean,
        default: false
    }
},{timestamps:true})

export default mongoose.model("Clc", clcSchema)