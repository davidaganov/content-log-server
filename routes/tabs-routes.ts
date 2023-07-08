import express from "express"
import tabsController from "../controllers/tabs-controller"

const router = express.Router()

router.get("/tabs", tabsController.getTabs)

export default router
