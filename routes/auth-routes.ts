import express from "express"

import authController from "../controllers/auth-controller"
import validation from "../utils/validation"

const router = express.Router()

router.post("/reg", validation, authController.registration)
router.post("/login", authController.login)

export default router
