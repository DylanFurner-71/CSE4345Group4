/*eslint-disable*/
import mongoose from "mongoose";
import User from "../models/userModel.js";

export const getUsers = async (req, res) => {
  // this is temporary, Corey is
  console.log("Here are the Users");
  try {
    // working on this
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.json({ msg: err });
  }
};

// Same as stylist login and finds the user with
// the corresponding email and password pair
export const userLogin = async(req, res) => {

    const userEmail = req.body.email;
    const userPassword = req.body.password;
    try {
    const currUser = await User.find(
      {
        "email": userEmail,
        "password": userPassword
      });
    res.json(currUser);
    } catch (err) {
    res.status(400).json({ msg: err });
    }
}

export const createUser = async (req, res) => {
  const user = new User(req.body);
  try {
    const newUser = await user.save();
    res.json(newUser);
  } catch (err) {
    res.json({ msg: err });
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