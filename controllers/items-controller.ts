import { type Request, type Response } from "express"

import Item from "../models/item"
import handleError from "../utils/handleError"

class ItemController {
  async getItems(req: Request, res: Response) {
    Item.find()
      .then((items) => {
        res.status(200).json(items)
      })
      .catch((err) => handleError(res, err))
  }

  async getSortingItems(req: any, res: Response) {
    const userId = req.user._id
    const { category } = req.body
    const filter = { userId, category }

    Item.find(filter)
      .sort({ createdBy: -1 })
      .then((items) => {
        res.status(200).json(items)
      })
      .catch((err) => handleError(res, err))
  }

  async deleteItem(req: Request, res: Response) {
    Item.findByIdAndDelete(req.params.id)
      .then((result) => {
        res.status(200).json(result)
      })
      .catch((err) => handleError(res, err))
  }

  async addItem(req: any, res: Response) {
    const userId = req.user._id
    const item = new Item({ ...req.body, userId })

    item
      .save()
      .then((result) => {
        res.status(201).json(result)
      })
      .catch((err) => handleError(res, err))
  }

  async updateItem(req: Request, res: Response) {
    Item.findByIdAndUpdate(req.params.id, req.body)
      .then((result) => {
        res.status(200).json(result)
      })
      .catch((err) => handleError(res, err))
  }
}

const itemController = new ItemController()

export default itemController
