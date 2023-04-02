import mongoose from 'mongoose'


export const connection = () => {
    mongoose.set('strictQuery', true)

    mongoose.connect(process.env.MONGOOSE_URL)
    .then(() => {
        console.log("Connected to MongoDB ....");
    })
    .catch((err) => {
        console.log("Error in connecting to MongoDB ....", err);
    })
}