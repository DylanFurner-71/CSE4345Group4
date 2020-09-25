import mongoose from "mongoose";
const Schema = mongoose.Schema;

/**
 * Create database scheme for notes
 */
const StylistSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please Enter a First Name"],
    },
    lastName: {
      type: String,
      required: [true, "Please Enter a Last Name"],
    },
    email: {
      type: String,
      required: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid email",
      ],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
    },
    photo: {
      type: String,
      default: "no-photo.jpg",
    },
    address: {
      type: String,
      default: "",
    },
    location: {
      // GeoJSON Point
      // Will take in address and generate a location
      type: {
        type: String,
        enum: ["Point"],
      },
      coordinates: {
        type: [Number],
        index: "2dsphere",
      },
      formattedAddress: String,
      street: String,
      city: String,
      state: String,
      zipcode: String,
      country: String,
    },
    lastLogin: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "stylists" }
);

export default mongoose.model("Stylist", StylistSchema);
