import mongoose from "mongoose";
import Stylist from "../models/stylistModel.js";

//@desc          Get all stylists from DB
//@route         GET /stylists
//@access        Private?
export const getStylists = async (req, res, next) => {
  console.log("hello from getStylists");
  try {
    const stylist = await Stylist.find();
    res.json(stylist);
  } catch (err) {
    next(err);
  }
};

//@desc          Login in stylist
//@route         POST /stylists/login
//@access        Public
export const stylistLogin = async (req, res, next) => {
  const stylistEmail = req.body.email;
  const stylistPassword = req.body.password;
  try {
    const currStylist = await Stylist.findOne({
      email: stylistEmail,
      password: stylistPassword,
    });
    console.log(currStylist);
    if (currStylist) {
      res.status(200).json({ success: true, stylist: currStylist });
    } else {
      res.status(400).json({
        success: false,
        msg: "No stylist with that password/email combination",
      });
    }
  } catch (err) {
    next(err);
  }
};

//@desc          Register a new stylist account
//@route         POST /stylists/register
//@access        Public
export const createStylist = async (req, res, next) => {
  const stylist = new Stylist(req.body);
  try {
    const newStylist = await stylist.save();
    res.json(newStylist);
  } catch (err) {
    next(err);
  }
};

//@desc          Change Stylist Password
//@route         POST /stylists/change/:stylistID
//@access        Private
export const changePassword = async (req, res, next) => {
  const stylistId = req.params.stylistId;
  try {
    const currStylist = await Stylist.findById(req.params.stylistId);
    currStylist.password = req.body.password;
    await currStylist.save();
    res.status(200).send("password updated");
  } catch (err) {
    next(err);
  }
};

//@desc          Search STylist by name
//@route         GET /stylists/search?name=xxxlastname=xxx
//@access        Private?
export const searchStylist = async (req, res) => {
  try {
    let queries = req.query.search.split(" ");

    //makes the queries into regex to ignore case. Might make better down the
    //road
    for (let key in queries) {
      queries[key] = new RegExp(queries[key], "i");
    }

    //finds the stylists based on search query
    const stylists = await Stylist.find({
      $or: [{ firstName: { $in: queries } }, { lastName: { $in: queries } }],
    });

    res.json(stylists);
  } catch (err) {
    res.status(400).json({ msg: err });
  }
};
