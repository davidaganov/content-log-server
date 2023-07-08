import { Tab } from "../interfaces"
import { Schema, model } from "mongoose"

const tabs = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    slug: {
      type: String,
      enum: [Tab.Halfway, Tab.Finished, Tab.Planned, Tab.Delayed, Tab.Broken],
      required: true
    }
  },
  { collection: "tabs" }
)

const Tabs = model("Tabs", tabs)

export default Tabs
