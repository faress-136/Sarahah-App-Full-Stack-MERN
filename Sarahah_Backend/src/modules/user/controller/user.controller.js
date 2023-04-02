import userModel from "../../../../database/Models/user.model.js"
import bcrypt from 'bcrypt'
import errorHandling from "../../../utilities/AsyncErrorHandler.js"
import AppError from "../../../utilities/AppError.js"
import jwt from 'jsonwebtoken'
import { sendEmail } from "../../../../services/email.js"
import { PasswordReset } from "../../../../services/reset-password.js"

export const signup = errorHandling(async (req, res, next) => {
    let {name, email, age, password, confirmedPassword} = req.body

    if(password != confirmedPassword) return next(new AppError("Failed, confrimed Password does not match", 400))
    let founded = await userModel.findOne({email})
    if(founded) return next(new AppError("Failed, Email already exist", 400))
    let hashedPassword = bcrypt.hashSync(password, Number(process.env.HASHING_ROUNDS))
    let added = userModel.insertMany({name, email, age, password: hashedPassword})
    sendEmail({name, email})
    res.status(201).json({message: "Success", added})
})

export const signIn = errorHandling(async (req, res, next) => {
    let {email, password} = req.body

    let founded = await userModel.findOne({email})
    if(!founded) return next(new AppError("You must register first", 400))
    if(founded.confirmedEmail == false) return next(new AppError("Failed, Please verify your email first", 400))
    let matched = bcrypt.compareSync(password, founded.password)
    if(!matched) return next(new AppError("Incorrect Password", 400))
    let token = jwt.sign({userId: founded._id, email, name: founded.name}, process.env.SECRET_KEY)
    res.status(200).json({message: "Success", token})
})

export const verifyEmail = errorHandling(async (req, res, next) => {
    let {token} = req.params
    jwt.verify(token, process.env.VERIFY_KEY, async (err, decoded) => {
        if(err) return next(new AppError("Failed Invalid verify token", 400, err))

        let verfiyUser = await userModel.findOneAndUpdate({email: decoded.email}, {confirmedEmail: true}, {new: true})
        verfiyUser.password = undefined
        res.status(200).json({message: "Success", verfiyUser})
    })
})

export const userDetails = errorHandling(async (req, res, next) => {
    let {id} = req.params
    let founded = await userModel.findOne({_id: id}).select('name')
    if(!founded) return next(new AppError("Incorrect user Id", 400))
    res.status(200).json({message: "Success", founded})
})

export const resetPassword = errorHandling(async (req, res, next) => {
    let {email ,OTP} = req.body

    let founded = await userModel.findOne({email})
    if(!founded) return next(new AppError("Failed Incorrect Email", 400))
    PasswordReset({email, OTP})
    res.status(200).json({message: "Success"})
})

export const updatePassword = errorHandling(async (req, res, next) => {
    let {email, password, confirmedPassword} = req.body
    if (password != confirmedPassword) return next(new AppError("Failed, unmatched password", 400))

    let hashedPassword = bcrypt.hashSync(password,Number(process.env.HASHING_ROUNDS))
    let updated = await userModel.findOneAndUpdate({email}, {password: hashedPassword})
    updated ? res.status(200).json({message: "Success", updated}) : next(new AppError("Failed to update password"))
})
