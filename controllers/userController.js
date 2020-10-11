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
    console.log(token);


    res.json({sucess:true, token, newUser});
  } catch (err) {
    next(err);
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
// we are going to change this by using encryption + salt
// as well as using jwt
export const userLogin = async (req, res, next) => {
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
      throw new Error("Invalid Username or Password");
    }
  } catch (err) {
    next(err);
  }
};

//@desc          Allow User to change password
//@route         POST users/change/:userId"
//@access        Public
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
