import mongoose from 'mongoose'


const messageSchmea = new mongoose.Schema({
    message: String,
    recievedId: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }
})

const messageModel = mongoose.model("Message", messageSchmea)

export default messageModel