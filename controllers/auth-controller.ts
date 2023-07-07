import { type Request, type Response } from "express"
import { type ObjectId } from "mongodb"
import { validationResult } from "express-validator"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

import User from "../models/user"
import secret from "../config"
import handleError from "../utils/handleError"

const generateAccessToken = (_id: ObjectId) => {
  const payload = { _id }

  return jwt.sign(payload, secret, { expiresIn: "24h" })
}

class AuthController {
  async registration(req: Request, res: Response) {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return handleError(res, "Некорректные данные при регистрации", errors)
      }

      const { username, password } = req.body
      const candidate = await User.findOne({ username })

      if (candidate) {
        return handleError(res, "Пользователь с таким именем уже существует")
      }

      const hashPassword = bcrypt.hashSync(password, 7)

      const user = new User({ username, password: hashPassword })
      await user.save()

      const token = generateAccessToken(user._id)

      return res.json({ token, username, message: "Регистрация прошла успешно!" })
    } catch (err) {
      return handleError(res, `${err}`)
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body
      const user = await User.findOne({ username })

      if (!user) {
        return handleError(res, `Пользователь ${username} не найден`)
      }

      const validPassword = bcrypt.compareSync(password, user.password)

      if (!validPassword) {
        return handleError(res, "Введен неверный пароль")
      }

      console.log(res.status)

      const token = generateAccessToken(user._id)
      return res.json({ token, username, message: "Вход выполнен успешно!" })
    } catch (err) {
      return handleError(res, `${err}`)
    }
  }
}

export default new AuthController()
