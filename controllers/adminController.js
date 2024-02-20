import Student from '../models/userModel/studentSchema.js'
import AdmissionForm from '../models/userModel/admissionFormSchema.js'
import Clc from '../models/clc.js'
import path from "path"
import { PDFDocument, StandardFonts, rgb } from "pdf-lib"
import { writeFileSync, readFileSync } from "fs"
import nodemailer from 'nodemailer'

const dashboard = async (req, res) => {
  try {
    const user = await Student.findOne({ _id: req.id })

    return res.render('admindashboard', { user })
  } catch (error) {
    res.status(401)
  }
}


const clc = async (req, res) => {
  try {
    const user = await Student.findOne({ _id: req.id })
    const clcApprovalList = await Clc.find({ isApprove: "false" })
    // console.log(allUser);
    res.render('clc', { pending: clcApprovalList, user })
  } catch (error) {
    res.status(401)
  }
}


const approvedByAdmin = async (req, res) => {
  try {
    
    let reg = req.body.registrationNumber

    const checked = await Clc.findOneAndUpdate({ registrationNumber: reg }, { isApprove: true, })
    console.log(checked);
    const email = checked.email
    const trimmedFname = checked.fName;

    //Create pdf

    const document = await PDFDocument.load(readFileSync("./certificateForm.pdf"));

    const courierBoldFont = await document.embedFont(StandardFonts.Courier);
    const firstPage = document.getPage(0);

    // firstPage.moveTo(72, 570);
    // firstPage.drawText(new Date().toUTCString(), {
    //   font: courierBoldFont,
    //   size: 12,
    // });

    firstPage.moveTo(110, 600);
    firstPage.drawText(`${trimmedFname}${checked.lName}`, {
      font: courierBoldFont,
      size: 16,
    });

    firstPage.moveTo(110, 585);
    firstPage.drawText(`${checked.class}`, {
      font: courierBoldFont,
      size: 16,
    });

    firstPage.moveTo(160, 537);
    firstPage.drawText(`${checked.dOB}`, {
      font: courierBoldFont,
      size: 16,
    });

    firstPage.moveTo(160, 505);
    firstPage.drawText(`${checked.fatherName}`, {
      font: courierBoldFont,
      size: 10,
    });

    firstPage.moveTo(163, 488);
    firstPage.drawText(`${checked.subjectTaken}`, {
      font: courierBoldFont,
      size: 16,
    });

    firstPage.moveTo(420, 600);
    firstPage.drawText(`${checked.classRollNumber}`, {
      font: courierBoldFont,
      size: 16,
    });

    firstPage.moveTo(380, 585);
    firstPage.drawText(`${checked.session}`, {
      font: courierBoldFont,
      size: 16,
    });

    firstPage.moveTo(433, 553);
    firstPage.drawText(`${checked.universityRollNumber}`, {
      font: courierBoldFont,
      size: 16,
    });

    firstPage.moveTo(421, 537);
    firstPage.drawText(`${checked.registrationNumber}`, {
      font: courierBoldFont,
      size: 16,
    });

    firstPage.moveTo(428, 505);
    firstPage.drawText(`${checked.universityPassingYear}`, {
      font: courierBoldFont,
      size: 16,
    });

    // writeFileSync(checked.registrationNumber + ".pdf", await document.save());
    writeFileSync("RegNo_" + checked.registrationNumber + "_CLC.pdf", await document.save());


    // Create a transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      // port: 587,
      port: 465,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS
      }
    });

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: 'Certificates',
      text: 'This is a test email from Nodemailer.',
      attachments: [{
        filename: "RegNo_" + checked.registrationNumber + "_CLC.pdf",
        path: path.join("RegNo_" + checked.registrationNumber + "_CLC.pdf")
      }]
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });


    console.log(reg);
    res.status(201).redirect('/clc');

  } catch (err) {
    res.status(400).send(err);

  }
}



const admissionList = async (req, res) => {
  try {
    const user = await Student.findOne({ _id: req.id })
    const AdmissionList = await AdmissionForm.find({})
    // console.log(allUser);
    res.render('admissionList', { list: AdmissionList, user })
  } catch (error) {
    res.status(401)
  }
}


export {
  dashboard,
  clc,
  approvedByAdmin,
  admissionList
}