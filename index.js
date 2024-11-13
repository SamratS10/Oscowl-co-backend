import express from "express"
import dotenv from 'dotenv'
import cors from "cors"
import cookieParser from "cookie-parser"
import connectDatabase from "./config/connectDb.js"
import userRouter from "./router/userRoute.js"
import todoRouter from "./router/todoRoute.js"
dotenv.config()

const app = express()
app.use(cors({
    origin:"http://localhost:5173",
    methods:['GET','POST','DELETE','PUT'],
    allowedHeaders:[
        "Content-Type",
        "Authorization",
        "Cache-Control",
        "Expires",
        "Pragma"
    ],
    credentials:true
}))

app.use(cookieParser())
app.use(express.json())
app.use('/api/auth',userRouter)
app.use("/api/todo",todoRouter)

const port = process.env.PORT || 5000 
app.listen(port,()=>console.log(`server is running at ${port}`)) 
connectDatabase()

