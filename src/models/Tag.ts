import { Schema, model } from "mongoose";
import { ref } from "process";

const tagSchema = new Schema({
  name: { type: String },
  posts: [{ type: Schema.ObjectId, ref: "Post" }],
});
const Tag = model("Tag", tagSchema);
export default Tag;
