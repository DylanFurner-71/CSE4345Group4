import mongoose from "mongoose";
import User from "../models/userModel.js";

export const createUser = async (req, res) => {
  console.log("this is creatUser");
  const user = new User(req.body);
  try {
    const newUser = await user.save();
    console.log(newUser);
    res.json(newUser);
  } catch (err) {
    res.json({ msg: err });
  }
};
export const getUsers = async (req, res) => {
  console.log("hello there");
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.json({ msg: err });
  }
};

// Same as stylist login and finds the user with
// the corresponding email and password pair
export const userLogin = async (req, res) => {
  const userEmail = req.body.email;
  const userPassword = req.body.password;
  try {
    const currUser = await User.findOne({
      email: userEmail,
      password: userPassword,
    });
    console.log(currUser);
    if (currUser) {
      res.status(200).json({ success: true, user: currUser });
    } else {
      res.status(400).json({
        success: false,
        msg: "No user with that password/email combination",
      });
    }
  } catch (err) {
    res.status(400).json({ success: false, msg: err });
  }
};

// don't know if this is proper, but it's how I'm doing it
// for the moment
export const changePassword = async (req, res) => {
  const userId = req.params.userId;
  try {
    const currUser = await User.findById(req.params.userId);
    currUser.password = req.body.password;
    await currUser.save();
    res.status(200).send("password updated");
  } catch (err) {
    res.status(400).json({ msg: err });
  }
};
