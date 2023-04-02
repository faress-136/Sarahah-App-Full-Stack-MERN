import AppError from "../src/utilities/AppError.js"

export const validation = (schema) => {
    return (req, res, next) => {
        let {error} = schema.validate(req.body, {abortEarly: false})

        if(error) return next(new AppError("Validation Error", 400, error))
        next()
    }
}