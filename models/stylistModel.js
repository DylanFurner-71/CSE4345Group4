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
    numReviews: {
      type: Number,
      default: 0,
      required: true,
    },
    average: {
      type: Number,
      default: 0,
    },
    reviews: {
      type: [{
        reviewName: {
          type: String,
          required: true,
        },
        score: {
          type: Number,
          required: true,
        },
        notes: {
          type: String,
          required: true,
        }
      }]
    },
    reviewScores: {
      type:[Number]
    }
  },
  { collection: "Stylist" }
);

export default mongoose.model("Stylist", StylistSchema);