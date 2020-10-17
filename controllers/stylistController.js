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

    res.json({ sucess: true, token, newStylist });
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
//@route         POST /stylists/change/:stylistId
//@access        Private
// needs to change!!!
export const changePassword = async (req, res, next) => {
  try {
    const currStylist = await Stylist.findById(req.params.stylistId).select(
      "+password"
    );
    if (!req.user || req.user.id !== currStylist.id) {
      return next(new ErrorResponse("Unauthorized", 401));
    }
    const isMatch = await currStylist.matchPassword(req.body.password);
    if (!isMatch) {
      return next(new ErrorResponse("Invalid password", 400));
    }
    if (req.body.newPassword !== req.body.newPasswordConf) {
      return next(new ErrorResponse("new passwords do not match", 400));
    }
    currStylist.password = req.body.newPassword;
    await currStylist.save();
    res.status(200).json({
      success: true,
      msg: "Password Updated",
    });
  } catch (err) {
    next(err);
  }
};

//@desc          Search STylist by name
//@route         GET /stylists/search?xxx
//@access        Private
/**
 * types of searches supported:
 * name=<name of stylist - space seperated list of names user is looking for>
 * within=<max distance from current user - integer>
 * min=<minimum rating - integer>
 * rat=<exact rating desired - integer (floored value of stylist avg rating)>
 * services=<services desired - space-seperated string list>
 */
export const searchStylist = async (req, res) => {
  try {
    const { name, within, min, rat, services } = req.query;
    let returnedStylists;

    // search by name logic
    //-------------------------------------------------------
    if (name) {
      let names = name.split(" ");
      for (let key in names) {
        names[key] = new RegExp(names[key], "i");
      }
      //finds the stylists based on search query
      returnedStylists = await Stylist.find({
        $or: [{ firstName: { $in: names } }, { lastName: { $in: names } }],
      });
    } else {
      returnedStylists = await Stylist.find();
    }

    //search by services logic
    //-------------------------------------------------------
    if (services) {
      returnedStylists = returnedStylists.filter((stylist) => {
        let hasServices = true;
        for (let service of services.split(" ")) {
          if (stylist.services.indexOf(service) === -1) {
            hasServices = false;
            break;
          }
        }
        return hasServices;
      });
    }

    res.json({
      success: true,
      returnedStylists,
    });
  } catch (err) {
    res.status(400).json({ msg: err });
  }
};
