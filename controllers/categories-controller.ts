import { type Request, type Response } from "express"

import Categories from "../models/categories"
import handleError from "../utils/handleError"

class CategoriesController {
  async getCategories(req: Request, res: Response) {
    Categories.find()
      .sort({ title: 1 })
      .then((categories) => {
        res.status(200).json(categories)
      })
      .catch((err) => handleError(res, err))
  }
}

const categoriesController = new CategoriesController()

export default categoriesController
