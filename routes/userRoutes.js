import express from "express"
const router = express.Router()

import { currentUser, loginUser, registerUser } from "../controllers/userController.js"
import { validateToken } from "../middleware/validateTokenHandler.js"

router.post('/register', registerUser)

router.post('/login', loginUser)

router.get('/current', validateToken,currentUser)

export default router