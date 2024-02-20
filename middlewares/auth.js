import jwt from 'jsonwebtoken'
import Student from '../models/userModel/studentSchema.js'


const auth = async (req, res , next)=>{
    try {
        const token = req.cookies.uid
        const verifyUser = jwt.verify(token, process.env.SECRET_KEY)
        // console.log(verifyUser)
        req.id = verifyUser.id
        next()
        
    } catch (error) {
        res.status(401).redirect('login')
    }
}

const adminAuth = async (req, res , next)=>{
    try {
        const token = req.cookies.uid
        const verifyUser = jwt.verify(token, process.env.SECRET_KEY)
        // console.log(verifyUser)
        const user = await Student.findOne({ _id: verifyUser.id })
        if (user.isAdmin == true) {
            req.id = user._id
        }
        else {
            res.redirect('login')
        }
        next()
        
    } catch (error) {
        res.status(401).redirect('login')
    }
}

export {
    auth,
    adminAuth
}