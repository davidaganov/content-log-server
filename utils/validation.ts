import { check } from "express-validator"

export default [
  check("username", "Имя пользователя не может быть пустым").notEmpty(),
  check("password", "Пароль должен быть больше 4 символов").isLength({ min: 4 })
]
