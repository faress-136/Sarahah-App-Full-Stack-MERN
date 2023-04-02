const globalError = (err, req, res, next)=>{
    let code = err.statusCode || 500
    res.status(code).json({message: "Error", err: err.message, details: err.details})
}

export default globalError