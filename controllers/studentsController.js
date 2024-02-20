import Student from '../models/userModel/studentSchema.js'
import AdmissionForm from '../models/userModel/admissionFormSchema.js'
import Clc from '../models/clc.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


const homePage = (req, res) => {
  return res.render('homePage')
}


const studentsSignup = (req, res) => {
  return res.render('signupPage')
}


const studentsSignupPost = async (req, res) => {
  try {
    const hashpassword = await bcrypt.hash(req.body.password, 10)
    const registerStudent = new Student({
      fullName: req.body.fullName,
      email: req.body.email,
      password: hashpassword
    })

    const registered = await registerStudent.save();

    res.status(201).redirect('login')

  } catch (err) {
    console.log(err);
    res.status(400).render('error');
  }
}


const studentsLogin = (req, res) => {
  return res.render('loginPage')
}


const studentsLoginPost = async (req, res) => {
  try {
    const { email, password } = req.body
    const result = await Student.findOne({ email: email })

    if (result != null) {
      const isMatch = await bcrypt.compare(password, result.password)
      if (result.email == email && isMatch && result.isAdmin == true) {
        // console.log(result);

        const token = jwt.sign({
          id: result._id,
          email: result.email,
          isAdmin: result.isAdmin
        }, process.env.SECRET_KEY,
        { expiresIn: "1d" })
        res.cookie('uid', token, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true })
        return res.redirect('adminDashboard')
      } 
      else if (result.email == email && isMatch) {
        // console.log(result);
        
        const token = jwt.sign({
          id: result._id,
          email: result.email,
          isAdmin: result.isAdmin
        }, process.env.SECRET_KEY,
          { expiresIn: "1d" })
        res.cookie('uid', token, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true })
        return res.redirect('index')
      } else {
        res.send('Invalid email or password')
      }
    } else {
      return res.redirect('signup')
    }
  } catch (error) {
    console.log(error);

  }
}

const studentsLogout = async (req, res) => {
  res.clearCookie("uid");
  res.status(201).redirect('login')
}



const studentIndexPage = async (req, res) => {
  try {
    const user = await Student.findOne({ _id: req.id })

    return res.render('index', { user })
  } catch (error) {
    res.status(401)
  }
}

const admissionForm = async (req, res) => {
  try {
    const user = await Student.findOne({ _id: req.id })

    return res.render('admissionForm', { user })
  } catch (error) {
    res.status(401)
  }
}

const admissionFormPost = async (req, res) => {
  try {
    const user = await Student.findOne({ _id: req.id })

    const appliedUser = await AdmissionForm.findOne({ appliedBy: user._id.toString() })
    // console.log(appliedUser);

    if (appliedUser == null || appliedUser.appliedBy != user._id.toString()) {
      const admForm = new AdmissionForm({
        fullName: req.body.fullName,
        registrationNumber: req.body.registrationNumber,
        currentYear: req.body.currentYear,
        aadharNumber: req.body.aadharNumber,
        dOB: req.body.dOB,
        sex: req.body.sex,
        nationality: req.body.nationality,
        religion: req.body.religion,
        caste: req.body.caste,
        fatherName: req.body.fatherName,
        motherName: req.body.motherName,
        parmanentAddress: req.body.parmanentAddress,
        parmanentAddressPin: req.body.parmanentAddressPin,
        presentAddress: req.body.presentAddress,
        presentAddressPin: req.body.presentAddressPin,
        mobileNumber: req.body.mobileNumber,
        email: req.body.email,
        appliedBy: user._id
      })

      const admFormSubmitted = await admForm.save();
      res.status(201).render('admissionForm', { "submitted": "Form Submitted", user })
    }
    else {
      res.status(201).render('admissionForm', { "alreadysubmitted": "You have already submitted the form.", user })
    }

  } catch (error) {
    console.log(error);
    res.status(400).render('error');
  }
}


const clcForm = async (req, res) => {
  try {
    const user = await Student.findOne({ _id: req.id })

    return res.render('clcForm', { user })
  } catch (error) {
    res.status(401)
  }
}


const clcFormPost = async (req, res) => {
  try {
    const user = await Student.findOne({ _id: req.id })

    const appliedUser = await Clc.findOne({ appliedBy: user._id.toString() })
    // console.log(appliedUser);

    if (appliedUser == null || appliedUser.appliedBy != user._id.toString()) {
      const clcForm = new Clc({
        fName: req.body.fName,
        lName: req.body.lName,
        fatherName: req.body.fatherName,
        class: req.body.class,
        classRollNumber: req.body.classRollNumber,
        session: req.body.session,
        registrationNumber: req.body.registrationNumber,
        universityRollNumber: req.body.universityRollNumber,
        universityPassingYear: req.body.universityPassingYear,
        dOB: req.body.dOB,
        subjectTaken: req.body.subjectTaken,
        email: req.body.email,
        appliedBy: user._id
      })

      const clcFormSubmitted = await clcForm.save();
      res.status(201).render('clcForm', { "submitted": "Form Submitted", user })
    }
    else {
      res.status(201).render('clcForm', { "alreadysubmitted": "You have already submitted the form.", user })
    }

  } catch (error) {
    console.log(error);
    res.status(400).render('error');
  }
}


export {
  homePage,
  studentsSignup,
  studentsSignupPost,
  studentsLogin,
  studentsLoginPost,
  studentIndexPage,
  admissionForm,
  admissionFormPost,
  studentsLogout,
  clcForm,
  clcFormPost
}