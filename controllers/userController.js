import mongoose from "mongoose";
import User from "../models/userModel.js";
import ErrorResponse from "../utils/errorResponse.js";

//@desc          Allow User to create an account
//@route         POST /users/register
//@access        Public
export const createUser = async (req, res, next) => {
  const user = new User(req.body);
  try {
    const newUser = await user.save();
    console.log(newUser);
    //create token
    const token = user.getSignedJwtToken();

    res.json({ sucess: true, token, newUser });
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    user.set(req.body);
    const updated = await user.save();
    res.status(200).json({
      sucess: true,
      user,
    });
  } catch (err) {
    return next(new ErrorResponse(err.message, 404));
  }
};

//@desc          Get all users and their information
//@route         GET /users/
//@access        Private?
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    next(err);
  }
};

//@desc          Allow user to login by matching email and password
//@route         POST /users/login
//@access        Public
export const userLogin = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  if (!email || !password) {
    return next(new ErrorResponse("Please provide an email and password", 400));
  }
  try {
    const currUser = await User.findOne({ email }).select("+password");
    console.log(currUser);
    if (!currUser) {
      return next(new ErrorResponse("Invalid Credentials", 401));
    }
    const isMatch = await currUser.matchPassword(password);
    if (!isMatch) {
      return next(new ErrorResponse("Invalid Credentials", 401));
    }
    const token = currUser.getSignedJwtToken();
    res.status(200).json({ success: true, token, user: currUser });
  } catch (err) {
    next(err);
  }
};

//@desc          Allow User to change password
//@route         POST users/change/:userId"
//@access        Private
export const changePassword = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const currUser = await User.findById(req.params.userId);
    currUser.password = req.body.password;
    await currUser.save();
    res.status(200).json({
      success: true,
      msg: "Password Updated",
    });
  } catch (err) {
    next(err);
  }
};
