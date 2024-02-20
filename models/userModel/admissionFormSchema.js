import mongoose from 'mongoose'
import Student from './studentSchema.js'

const admissionFormSchema = new mongoose.Schema({
    fullName:{
        type : String,
        required : true
    },
    registrationNumber:{
        type : Number,
        required : true
    },
    currentYear:{
        type : Number,
        required : true
    },
    aadharNumber:{
        type : Number,
        required : true
    },
    dOB:{
        type : String,
        required : true
    },
    sex:{
        type : String,
        required : true
    },
    nationality:{
        type : String,
        required : true
    },
    religion:{
        type : String,
        required : true
    },
    caste:{
        type : String,
        required : true
    },
    fatherName:{
        type : String,
        required : true
    },
    motherName:{
        type : String,
        required : true
    },
    parmanentAddress:{
        type : String,
        required : true
    },
    parmanentAddressPin:{
        type : Number,
        required : true
    },
    presentAddress:{
        type : String,
        required : true
    },
    presentAddressPin:{
        type : Number,
        required : true
    },
    mobileNumber:{
        type : Number,
        required : true
    },
    email: {
        type : String,
        required : true
    },
    appliedBy: {
        // type: mongoose.Schema.Types.ObjectId,
        // ref:'Student'
        type : String,
        required : true
    }
},{timestamps:true})

export default mongoose.model("AdmissionForm", admissionFormSchema)