import { Schema, model } from "mongoose"

const categories = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    slug: {
      type: String,
      required: true
    }
  },
  { collection: "categories" }
)

const Categories = model("Categories", categories)

export default Categories
