import { type Request, type Response } from "express"

import Tabs from "../models/tabs"
import handleError from "../utils/handleError"

class TabsController {
  async getTabs(req: Request, res: Response) {
    Tabs.find()
      .then((tabs) => {
        res.status(200).json(tabs)
      })
      .catch((err) => handleError(res, err))
  }
}

const tabsController = new TabsController()

export default tabsController
