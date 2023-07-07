import { type NextFunction, type Request, type Response } from "express"
import { type ObjectId } from "mongodb"
import jwt from "jsonwebtoken"

interface AuthRequest extends Request {
  user: {
    _id: ObjectId
  }
}

import secret from "../config"
import handleError from "../utils/handleError"

export default function authMiddleware(req: any, res: Response, next: NextFunction) {
  if (req.method === "OPTIONS") {
    next()
  }

  try {
    const token = req.headers.authorization?.split(" ")[1]

    if (!token) {
      return handleError(res, "Пользователь не авторизован")
    }

    const decodedData = jwt.verify(token, secret) as { _id: ObjectId }
    req.user = decodedData
    next()
  } catch (err) {
    return handleError(res, `${err}`)
  }
}
