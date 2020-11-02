import mongoose from 'mongoose';
import User from '../models/userModel.js';
import ErrorResponse from '../utils/errorResponse.js';
import sendEmail from '../utils/sendEmail.js';
import crypto from 'crypto';

//@desc          Allow User to create an account
//@route         POST /users/register
//@access        Public
export const createUser = async (req, res, next) => {
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
        user = new User(req.body);
    } else {
        console.log(user);
        return next(new ErrorResponse('User already exists', 400));
    }
    try {
        const newUser = await user.save();
        //create token
        const token = user.getSignedJwtToken();

        res.json({ sucess: true, token, newUser });
    } catch (err) {
        next(err);
    }
};

//@desc          Update user based on userId
//@route         PUT /users/:id
//@access        Private
export const updateUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return next(new ErrorResponse('Cannot Find Resource', 404));
        }
        if (!req.user || req.user.id !== user.id) {
            return next(new ErrorResponse('Unauthorized', 401));
        }
        ['address', 'firstName', 'lastName', 'photo', 'number'].forEach(
            prop => {
                if (req.body[prop] && req.body[prop] !== user[prop]) {
                    user[prop] = req.body[prop];
                }
            }
        );
        await user.save();
        res.status(200).json({
            sucess: true,
            user,
        });
    } catch (err) {
        return next(err);
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
        return next(
            new ErrorResponse('Please provide an email and password', 400)
        );
    }
    try {
        const currUser = await User.findOne({ email }).select('+password');
        if (!currUser) {
            return next(new ErrorResponse('Invalid Credentials', 401));
        }
        const isMatch = await currUser.matchPassword(password);
        if (!isMatch) {
            return next(new ErrorResponse('Invalid Credentials', 401));
        }
        const token = currUser.getSignedJwtToken();
        currUser.lastLogin = Date.now();
        currUser.save();
        res.status(200).json({ success: true, token, user: currUser });
    } catch (err) {
        next(err);
    }
};

//@desc          Allow User to change password
//@route         POST users/change/:userId"
//@access        Private
/*
should take in:
   {
       password,
       newPassword,
       newPasswordConf
   }
*/
export const changePassword = async (req, res, next) => {
    try {
        const currUser = await User.findById(req.params.userId).select(
            '+password'
        );
        if (!req.user || req.user.id !== currUser.id) {
            return next(new ErrorResponse('Unauthorized', 401));
        }
        const isMatch = await currUser.matchPassword(req.body.password);
        if (!isMatch) {
            return next(new ErrorResponse('Invalid password', 400));
        }
        if (req.body.newPassword !== req.body.newPasswordConf) {
            return next(new ErrorResponse('new passwords do not match', 400));
        }
        currUser.password = req.body.newPassword;
        await currUser.save();
        res.status(200).json({
            success: true,
            msg: 'Password Updated',
        });
    } catch (err) {
        next(err);
    }
};

//@desc          Get current logged in user
//@route         GET /users/me
//@access        Private

export const getMe = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        res.status(200).json({
            success: true,
            user,
        });
    } catch (err) {
        next(err);
    }
};

export const forgotPassword = async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return next(new ErrorResponse('There is no user with that email', 404));
    }

    // get rest token
    const resetToken = user.getResetPasswordToken();

    console.log(`${resetToken} worked`);

    await user.save({ validateBeforeSave: false });

    // create reset url
    const resetUrl = `${req.protocol}://${req.get(
        'host'
    )}/users/resetPassword/${resetToken}`;

    const message = `You are receiving this email because you (or somebody else) has requested the reset of a password. Please follow the link provided OR make a PUT request to \n\n ${resetUrl}`;

    try {
        await sendEmail({
            email: user.email,
            subject: 'Password reset',
            message,
            token: resetToken,
        });
        res.status(200).json({ sucess: true, data: 'email sent' });
    } catch (err) {
        console.log(err);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiration = undefined;
        await user.save({ validateBeforeSave: false });
        return next(new ErrorResponse('email could not be sent', 500));
    }
};

export const resetPassword = async (req, res, next) => {
    try {
        const resetPasswordToken = crypto
            .createHash('sha256')
            .update(req.params.resettoken)
            .digest('hex');

        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpiration: { $gt: Date.now() },
        });

        if (!user) {
            return next(new ErrorResponse('invalid token', 400));
        }

        // set new password

        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiration = undefined;

        const token = user.getSignedJwtToken();
        user.lastLogin = Date.now();
        await user.save();
        res.status(200).json({ success: true, token, user });
    } catch (err) {
        next(err);
    }
};
