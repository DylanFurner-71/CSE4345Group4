/*eslint-disable*/
import mongoose from "mongoose";
import Stylist from "../models/stylistModel.js";

export const getStylists = async (req, res) => {
  console.log("getting stylists");
  try {
    const stylist = await Stylist.find();
    res.json(stylist);
  } catch (err) {
    res.json({ msg: err });
  }
};

// Same as userlogin and finds the user with
// the corresponding email and password pair
export const stylistLogin = async(req, res) => {

    const stylistEmail = req.body.email;
    const stylistPassword = req.body.password;
    try {
    const currStylist = await Stylist.findOne(
      {
        "email": stylistEmail, 
        "password": stylistPassword
      });
    //res.status(200).send("Logged In");
    res.status(200).json(currStylist);
    } catch (err) {
    res.status(400).json({ msg: err });
    }
}

export const createStylist = async (req, res) => {
  const stylist = new Stylist(req.body);
  try {
    const newStylist = await stylist.save();
    res.json(newStylist);
  } catch (err) {
    res.json({ msg: "No stylist exists" });
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

export const getReviews = async (req, res) => {
  const stylistEmail = req.body.stylistEmail;
  try {
    const currStylist = await Stylist.findOne({
      "email": stylistEmail
    });
    
    res.json(currStylist.reviews);
  } catch (err) {
    res.status(400).json({ msg: err });
  }
};

export const postReviews = async (req, res) => {
  const stylistEmail = req.body.stylistEmail;
  let rev = {
    "reviewName": req.body.reviewName,
    "score": req.body.score,
    "notes": req.body.notes
  };
  try {
    await Stylist.findOneAndUpdate(
      {"email": stylistEmail}, 
      { $push: { reviews: { reviewName: rev.reviewName, score: rev.score, notes: rev.notes }, reviewScores: rev.score},
        $inc: {numReviews: 1},
        $project: {average: {$avg: "reviewScores"}}});
    //currStylist.reviews.push(rev);
    /*currStylist.update(
      {_id: currStylist._id},
      {
      $push: { reviews: {score: rev.score, notes: rev.notes }}
    })*/
    //currStylist.numReviews = currStylist.numReviews + 1;
    //currStylist.average = currStylist.numReviews;
    //await currStylist.save(currStylist.reviews);
    
    res.status(200).send("review posted");
  } catch (err) {
    res.status(400).json({ msg: err });
  }
};