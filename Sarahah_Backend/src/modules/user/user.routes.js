import express from 'express'
import { auth } from '../../../middleware/auth.js'
import { validation } from '../../../middleware/validation.js'
import { resetPassword, signIn, signup, updatePassword, userDetails, verifyEmail } from './controller/user.controller.js'
import { sigInSchema, signUpSchema, updatePasswordSchema } from './controller/user.validation.js'

const router = express.Router()


router.post("/signup", validation(signUpSchema), signup)

router.post("/signin", validation(sigInSchema), signIn)

router.post("/reset", resetPassword)

router.post("/update", validation(updatePasswordSchema), updatePassword)

router.get("/verify/:token", verifyEmail)

router.get("/:id", userDetails)


export default router