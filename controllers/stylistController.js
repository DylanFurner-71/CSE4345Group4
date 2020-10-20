import mongoose from "mongoose";
import Stylist from "../models/stylistModel.js";
import ErrorResponse from "../utils/errorResponse.js";

//@desc          Get all stylists from DB
//@route         GET /stylists
//@access        Private?
export const getStylists = async (req, res, next) => {
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
  const email = req.body.email;
  const password = req.body.password;
  if (!email || !password) {
    return next(new ErrorResponse("Please provide an email and password", 400));
  }
  try {
    const currStylist = await Stylist.findOne({ email }).select("+password");
    if (!currStylist) {
      return next(new ErrorResponse("Invalid Credentials", 401));
    }
    const isMatch = await currStylist.matchPassword(password);
    if (!isMatch) {
      return next(new ErrorResponse("Invalid Credentials", 401));
    }
    const token = currStylist.getSignedJwtToken();
    currStylist.lastLogin = Date.now();
    currStylist.save();
    res.status(200).json({ success: true, token, stylist: currStylist });
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
    //create token
    const token = stylist.getSignedJwtToken();

    res.json({ sucess: true, token, stylist });
  } catch (err) {
    next(err);
  }
};

export const updateStylist = async (req, res, next) => {
  try {
    const stylist = await Stylist.findById(req.params.id);

    if (!stylist) {
      return next(new ErrorResponse("Cannot Find Resource", 404));
    }
    if (!req.user || req.user.id !== stylist.id) {
      return next(new ErrorResponse("Unauthorized", 401));
    }
    [
      "address",
      "firstName",
      "lastName",
      "photo",
      "businessName",
      "number",
      "services",
    ].forEach((prop) => {
      if (req.body[prop] && req.body[prop] !== stylist[prop]) {
        stylist[prop] = req.body[prop];
      }
    });
    await stylist.save();
    res.status(200).json({
      sucess: true,
      stylist,
    });
  } catch (err) {
    return next(new ErrorResponse(err));
  }
  
};

//@desc          Change Stylist Password
//@route         POST /stylists/change/:stylistID
//@access        Private
// needs to change!!!
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
//@access        Private
export const searchStylist = async (req, res) => {
  const { name, lastname } = req.query;
  try {
    let queries = [];
    if (name) queries.push(name);
    if (lastname) queries.push(lastname);
    console.log(queries);

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
    res.status(400).json({ msg: "dog" });
  }
};

export const searchStylistCosmetologyID = async (req, res) => { //what do i do here do I do anything here I don't know its late
};
