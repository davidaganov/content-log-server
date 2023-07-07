import { Schema, model } from "mongoose"

export enum Tab {
  Halfway = "halfway",
  Finished = "finished",
  Planned = "planned",
  Delayed = "delayed",
  Broken = "broken"
}

const item = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    slug: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: false
    },
    description: {
      type: String,
      required: false
    },
    createdBy: {
      type: Date,
      required: true
    },
    rating: {
      type: Number,
      required: false
    },
    tab: {
      type: String,
      enum: [Tab.Halfway, Tab.Finished, Tab.Planned, Tab.Delayed, Tab.Broken],
      required: true
    },
    category: {
      type: String,
      required: true
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { collection: "items" }
)

const Item = model("Item", item)

export default Item
