import express from 'express'
const router = express.Router()
import {auth} from '../middlewares/auth.js'

import { 
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
 from '../controllers/studentsController.js'



router.get('/', homePage)

router.get('/signup', studentsSignup)

router.post('/signup', studentsSignupPost)

router.get('/login', studentsLogin)

router.post('/login', studentsLoginPost)

router.get('/logout', studentsLogout)

router.get('/index', auth, studentIndexPage)

router.get('/admForm', auth, admissionForm)

router.post('/admForm', auth, admissionFormPost)

router.get('/clcForm', auth, clcForm)

router.post('/clcForm', auth, clcFormPost)

export default router