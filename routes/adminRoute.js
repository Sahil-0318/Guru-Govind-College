import express from 'express'
const adminRouter = express.Router()
import {adminAuth} from '../middlewares/auth.js'

import { 
    dashboard,
    clc,
    approvedByAdmin,
    admissionList
 } 
 from '../controllers/adminController.js'
import admissionFormSchema from '../models/userModel/admissionFormSchema.js'

 adminRouter.get('/adminDashboard', adminAuth, dashboard)

 adminRouter.get('/clc', adminAuth, clc)
 
 adminRouter.post('/approvedByAdmin', approvedByAdmin)
 
 adminRouter.get('/admissionList', adminAuth, admissionList)


export default adminRouter