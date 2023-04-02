import express from 'express'
import { auth } from '../../../middleware/auth.js'
import { validation } from '../../../middleware/validation.js'
import { editMessage, sendMessage, userMessages } from './controller/message.controller.js'
import { messageSchema } from './controller/message.validation.js'

const router = express.Router()

router.post("/send/:id", validation(messageSchema), sendMessage)

router.get("/", auth, userMessages)

router.put("/edit", auth, editMessage)


export default router