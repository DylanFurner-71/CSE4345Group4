import mongoose from 'mongoose';
import { userInfo } from 'os';
import Stylist from '../models/stylistModel.js';
import ErrorResponse from '../utils/errorResponse.js';
import sendEmail from '../utils/sendEmail.js';
import crypto from 'crypto';

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
        return next(
            new ErrorResponse('Please provide an email and password', 400)
        );
    }
    try {
        const currStylist = await Stylist.findOne({ email }).select(
            '+password'
        );
        if (!currStylist) {
            return next(new ErrorResponse('Invalid Credentials', 401));
        }
        const isMatch = await currStylist.matchPassword(password);
        if (!isMatch) {
            return next(new ErrorResponse('Invalid Credentials', 401));
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
    let stylist = await Stylist.findOne({ email: req.body.email });
    if (!stylist) {
        stylist = new Stylist(req.body);
    } else {
        return next(new ErrorResponse('Stylist already exists', 400));
    }
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
            return next(new ErrorResponse('Cannot Find Resource', 404));
        }
        if (!req.stylist || req.stylist.id !== stylist.id) {
            return next(new ErrorResponse('Unauthorized', 401));
        }
        [
            'address',
            'firstName',
            'lastName',
            'photo',
            'businessName',
            'number',
            'services',
        ].forEach(prop => {
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
            '+password'
        );
        if (!req.stylist || req.stylist.id !== currStylist.id) {
            return next(new ErrorResponse('Unauthorized', 401));
        }
        const isMatch = await currStylist.matchPassword(req.body.password);
        if (!isMatch) {
            return next(new ErrorResponse('Invalid password', 400));
        }
        if (req.body.newPassword !== req.body.newPasswordConf) {
            return next(new ErrorResponse('new passwords do not match', 400));
        }
        currStylist.password = req.body.newPassword;
        await currStylist.save();
        res.status(200).json({
            success: true,
            msg: 'Password Updated',
        });
    } catch (err) {
        next(err);
    }
};

//@desc          Get current logged in stylist
//@route         GET /stylists/me
//@access        Private

export const getMe = async (req, res, next) => {
    try {
        const stylist = await Stylist.findById(req.stylist.id);
        res.status(200).json({
            success: true,
            stylist,
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
            let names = name.split(' ');
            for (let key in names) {
                names[key] = new RegExp(names[key], 'i');
            }
            //finds the stylists based on search query
            returnedStylists = await Stylist.find({
                $or: [
                    { firstName: { $in: names } },
                    { lastName: { $in: names } },
                ],
            });
        } else {
            returnedStylists = await Stylist.find();
        }

        //search by services logic
        //-------------------------------------------------------
        if (services) {
            returnedStylists = returnedStylists.filter(stylist => {
                let hasServices = true;
                for (let service of services.split(' ')) {
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

export const forgotPassword = async (req, res, next) => {
    const stylist = await Stylist.findOne({ email: req.body.email });

    if (!stylist) {
        return next(
            new ErrorResponse('There is no stylist with that email', 404)
        );
    }

    // get rest token
    const resetToken = stylist.getResetPasswordToken();

    console.log(`${resetToken} worked`);

    await stylist.save({ validateBeforeSave: false });

    // create reset url
    const resetUrl = `${req.protocol}://${req.get(
        'host'
    )}/stylists/resetPassword/${resetToken}`;

    const message = `You are receiving this email because you (or somebody else) has requested the reset of a password. Please follow the link provided OR make a PUT request to \n\n ${resetUrl}`;

    try {
        await sendEmail({
            email: stylist.email,
            subject: 'Password reset',
            message,
            token: resetToken,
        });
        res.status(200).json({ sucess: true, data: 'email sent' });
    } catch (err) {
        console.log(err);
        stylist.resetPasswordToken = undefined;
        stylist.resetPasswordExpiration = undefined;
        await stylist.save({ validateBeforeSave: false });
        return next(new ErrorResponse('email could not be sent', 500));
    }
};

export const resetPassword = async (req, res, next) => {
    try {
        const resetPasswordToken = crypto
            .createHash('sha256')
            .update(req.params.resettoken)
            .digest('hex');

        const stylist = await Stylist.findOne({
            resetPasswordToken,
            resetPasswordExpiration: { $gt: Date.now() },
        });

        if (!stylist) {
            return next(new ErrorResponse('invalid token', 400));
        }

        // set new password

        stylist.password = req.body.password;
        stylist.resetPasswordToken = undefined;
        stylist.resetPasswordExpiration = undefined;

        const token = stylist.getSignedJwtToken();
        stylist.lastLogin = Date.now();
        await stylist.save();
        res.status(200).json({ success: true, token, stylist });
    } catch (err) {
        next(err);
    }
};

export const postReviews = async (req, res) => {
    const stylistEmail = req.body.email;
    let rev = {
        reviewerName: req.body.reviewerName,
        score: req.body.score,
        notes: req.body.notes,
    };
    try {
        const currStylist = await Stylist.findOneAndUpdate(
            { email: stylistEmail },
            {
                $push: {
                    reviews: {
                        reviewerName: rev.reviewerName,
                        score: rev.score,
                        notes: rev.notes,
                    },
                    reviewScores: rev.score,
                },
                $inc: { numReviews: 1 },
            }
        );

        var a = currStylist.reviewScores.reduce(function (a, b) {
            return a + b;
        }, 0);

        a = a / currStylist.numReviews;
        await Stylist.findOneAndUpdate(
            { email: stylistEmail },
            { $set: { average: Math.round(a) } }
        );

        res.status(200).send('review posted');
    } catch (err) {
        next(err);
    }
};

export const getOneStylist = async (req, res) => {
    const stylistId = req.params.id;
    try {
        const stylist = await Stylist.findById(stylistId);
        res.status(200).json({
            success: true,
            stylist,
        });
        if (!stylist) {
            return next(new ErrorResponse('User Not found', 404));
        }
    } catch (err) {
        next(err);
    }
};

export const addService = async (req, res) => {
    const stylistId = req.params.id;
    const service = req.params.service;
    console.log("Inside of addService");
    try {
        const stylist = await Stylist.findById(stylistId);
        stylist.services.push(service);
        res.status(200).json({
            success: true,
            stylist,
        });
        if (!stylist) {
            return next(new ErrorResponse('Add Service failed due to unknown reason', 404));
        }
    } catch (err) {
        next(err);
    }
};