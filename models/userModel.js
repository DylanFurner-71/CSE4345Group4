import mongoose from "mongoose";
const Schema = mongoose.Schema;

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
      required: true,
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
    },
    lastLogin: {
      type: Date,
      default: Date.now,
    },
    photo: {
      type: String,
      default: "no-photo.jpg",
    },
  },
  { collection: "users" }
);
export default mongoose.model("User", UserSchema);
