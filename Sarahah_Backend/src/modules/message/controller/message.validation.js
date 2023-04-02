import Joi from "joi"
export const messageSchema = Joi.object({
    message: Joi.string().min(3).max(100).required().messages({
        "string.empty":"Message must not be empty",
        "string.min":"Message must be greater than 3 characters",
        "string.max":"Message must be smaller than 20 characters"
      })
})