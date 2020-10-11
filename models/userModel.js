import mongoose from "mongoose";
const Schema = mongoose.Schema;
import { geocoder } from "../utils/geocoder.js";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";

const UserSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please Provide a First Name"],
    },
    lastName: {
      type: String,
      required: [true, "Please provide a Last Name"],
    },
    email: {
      type: String,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid email",
      ],
      unique: true,
      required: [true, "Please add an email address"],
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
      select: false
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
    photo: {
      type: String,
      default: "no-photo.jpg",
    },
    role: {
      type: String,
      enum: ["user"],
      default: "user",
    },
  },
  { collection: "users" }
);

//Mongoose Hooks

// Using Locationiq to get long/lat from user address.
UserSchema.pre("save", async function (next) {

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  if (this.address) {
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
  }
  next();
});


// Sign JWT and return

UserSchema.methods.getSignedJwtToken = function(){
  return jwt.sign({id: this._id}, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  })
}


export default mongoose.model("User", UserSchema);
