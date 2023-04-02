import mongoose from 'mongoose'


const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    confirmedEmail: {
        type: Boolean,
        default: false 
    },
    age: {
        type: Number,
        min: 10,
        max: 80
    },
    password: String
})

const userModel = mongoose.model("User", userSchema)

export default userModel