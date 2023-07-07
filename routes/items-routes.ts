import express from "express"

import itemController from "../controllers/items-controller"
import authMiddleware from "../middlewares/auth-middleware"

const router = express.Router()

router.get("/items", itemController.getItems)
router.post("/sorted-items", authMiddleware, itemController.getSortingItems)
router.post("/items", authMiddleware, itemController.addItem)
router.delete("/items/:id", itemController.deleteItem)
router.patch("/items/:id", itemController.updateItem)

export default router
