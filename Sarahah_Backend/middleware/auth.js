import jwt from 'jsonwebtoken'
import AppError from '../src/utilities/AppError.js'


export const auth = (req, res, next) => {
    let authorization = req.headers['authorization']

    if(!authorization || (authorization && authorization.startsWith('Bearer') == false)) {
        return next(new AppError("Error in token or token not provided", 400))
    }
    else{
        let token = authorization.split(" ")[1]
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if(err) return next(new AppError("Error in token or token not provided", 400))
            req.userId = decoded.userId
            next()
        })
    }
}