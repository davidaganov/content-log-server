import express, { type Request, type Response } from "express"
import mongoose from "mongoose"
import cors from "cors"

import authRouter from "./routes/auth-routes"
import categoriesRouter from "./routes/categories-routes"
import itemsRouter from "./routes/items-routes"

const PORT = 3000
const URL = "mongodb://localhost:27017/plans"

const app = express()

app
  .use(cors())
  .use(express.json())
  .use(categoriesRouter)
  .use("/auth", authRouter)
  .use("/categories", itemsRouter)

mongoose
  .connect(URL)
  .then(() => {
    console.log("Connected to MongoDB!")
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  })
  .catch((err) => {
    console.error(`DB connection error: ${err}`)
  })
