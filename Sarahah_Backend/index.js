import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import { connection } from './database/connection.js'
import userRouter from './src/modules/user/user.routes.js'
import globalError from './src/utilities/golbalError.js'
import AppError from './src/utilities/AppError.js'
import messageRouter from './src/modules/message/message.routes.js'

const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(cors())
app.get("/", (req, res) => {
    res.setHeader("Access-Control-Allow-Credentials", "true")
})

connection()

app.use("/user", userRouter)
app.use("/message", messageRouter)

app.use("*", (req, res, next) => {
    next(new AppError(`Invalid URl ${req.originalUrl}`, 404))
})

app.use(globalError)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))