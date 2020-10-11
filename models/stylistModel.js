import mongoose from "mongoose";
const Schema = mongoose.Schema;
import { geocoder } from "../utils/geocoder.js";

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
      select: false
    },
    photo: {
      type: String,
      default: "no-photo.jpg",
    },
    address: {
      type: String,
      required: [true, "Must Provide address of business location"],
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
    createdAt: {
      type: Date,
      default: Date.now
    },
    role: {
      type: String,
      enum: ["stylist"],
      default: "stylist",
    },
  },
  { collection: "stylists" }
);

// --------- Mongoose Hooks ----------------
StylistSchema.pre("save", async function (next) {
  console.log("here is johnny");
  const loc = await geocoder.geocode(this.address);

  this.location = {
    type: "Point",
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress,
    street: loc[0].streetName,
    city: loc[0].city,
    state: loc[0].stateCode,
    zipcode: loc[0].zipcode,
    country: loc[0].countryCode,
  };
  this.address = undefined;
  next();
});

export default mongoose.model("Stylist", StylistSchema);
