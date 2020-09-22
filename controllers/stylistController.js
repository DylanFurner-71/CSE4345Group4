import mongoose from "mongoose";
import Stylist from "../models/stylistModel.js";

export const getStylists = async (req, res) => {
  try {
    const stylist = await Stylist.find();
    res.json(stylist);
  } catch (err) {
    res.json({ msg: err });
  }
};

// Same as userlogin and finds the user with
// the corresponding email and password pair
export const stylistLogin = async (req, res) => {
  const stylistEmail = req.params.email;
  const stylistPassword = req.params.password;
  try {
    const currStylist = await Stylist.findOne({
      email: stylistEmail,
      password: stylistPassword,
    });
    res.json(currStylist);
  } catch (err) {
    res.json({ msg: err });
  }
};

export const createStylist = async (req, res) => {
  const stylist = new Stylist(req.body);
  try {
    const newStylist = await stylist.save();
    res.json(newStylist);
  } catch (err) {
    res.json({ msg: err });
  }
};

// don't know if this is proper, but it's how I'm doing it
// for the moment
export const changePassword = async (req, res) => {
  const stylistId = req.params.stylistId;
  try {
    const currStylist = await Stylist.findById(req.params.stylistId);
    currStylist.password = req.body.password;
    await currStylist.save();
    res.status(200).send("password updated");
  } catch (err) {
    res.status(400).json({ msg: err });
  }
};
