import messageModel from "../../../../database/Models/message.model.js"
import AppError from "../../../utilities/AppError.js"
import errorHandling from "../../../utilities/AsyncErrorHandler.js"

export const sendMessage = errorHandling(async (req, res, next) => {
    let {id} = req.params
    let {message} = req.body
    let added = await messageModel.insertMany({message, recievedId: id})
    res.status(200).json({message: "Success", added})
})

export const userMessages = errorHandling(async (req, res, next) => { 
    let userId = req.userId
    let relatedMessages = await messageModel.find({recievedId: userId})
    res.status(200).json({message: "Sucess", relatedMessages})
})

export const editMessage = errorHandling(async (req, res, next) => {
    let userId = req.userId
    let {_id, message} = req.body
    let userMessage = await messageModel.findOneAndUpdate({_id, recievedId: userId}, {message}, {new: true})
    if(!userMessage) return next(new AppError("Invalid message id or userId" ,400))
    res.status(200).json({message: "Success", userMessage})
})