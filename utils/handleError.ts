import { type Response } from "express"
import { type Result, type ValidationError } from "express-validator"

export default function handleError(
  res: Response,
  error: string,
  arrayErrors?: Result<ValidationError>
) {
  res.status(500).json({ error, arrayErrors })
}
