import Joi from "joi"
export const signUpSchema = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    email: Joi.string().email({minDomainSegments: 2, tlds: {allow: false}}).required(),
    password: Joi.string().pattern(new RegExp(/^[a-zA-Z0-9]{6,30}$/)).required(),
    confirmedPassword: Joi.string().pattern(new RegExp(/^[a-zA-Z0-9]{6,30}$/)).required(),
    age: Joi.number().min(10).max(100).required()
})

export const sigInSchema = Joi.object({
    email: Joi.string().email({minDomainSegments: 2, tlds: {allow: false}}).required(),
    password: Joi.string().pattern(new RegExp(/^[a-zA-Z0-9]{6,30}$/)).required(),
})

export const updatePasswordSchema = Joi.object({
    email: Joi.string().email({minDomainSegments: 2, tlds: {allow: false}}).required(),
    password: Joi.string().pattern(new RegExp(/^[a-zA-Z0-9]{6,30}$/)).required(),
    confirmedPassword: Joi.string().pattern(new RegExp(/^[a-zA-Z0-9]{6,30}$/)).required(),
})