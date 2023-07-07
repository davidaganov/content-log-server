import express from "express"
import categoriesController from "../controllers/categories-controller"

const router = express.Router()

router.get("/categories", categoriesController.getCategories)

export default router
