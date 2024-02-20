import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'




const app = express()
const port = process.env.PORT || 3000

import router from './routes/studentsRoute.js'
import adminRouter from './routes/adminRoute.js'
import path from "path"

//DB Connection
mongoose.connect(process.env.DB_CONNECTION).then(()=>{
    console.log('DB Connected Successfully');
}).catch((err)=>{
    console.log(err);
})

app.use(cookieParser())


// Set template engine
app.set("view engine", "ejs");
app.use(express.static('./public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Load routes
app.use('/', router)
app.use('/', adminRouter)

app.listen(port, ()=>{
    console.log(`Server listening at http://localhost:${port}`);
})