/*eslint-disable*/
import mongoose from "mongoose";
const Schema = mongoose.Schema;

/**
 * Create database scheme for notes
 */
const StylistSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    lastLogin: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "Stylist" }
);

export default mongoose.model("Stylist", StylistSchema);