import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import { geocoder } from '../utils/geocoder.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

/**
 * Services offered subdocument Schema
 */

/**
 * Stylist Schema
 */

const StylistSchema = new Schema(
    {
        firstName: {
            type: String,
            required: [true, 'Please Enter a First Name'],
        },
        lastName: {
            type: String,
            required: [true, 'Please Enter a Last Name'],
        },
        businessName: {
            type: String,
            required: [true, 'Please provide Name of business'],
        },
        email: {
            type: String,
            required: true,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                'Please add a valid email',
            ],
            unique: true,
        },
        password: {
            type: String,
            required: [true, 'Please provide a password'],
            select: false,
        },
        number: {
            type: String,
            match: [/[0-9]{10}/, 'Please add valid number'],
            default: '',
        },
        photo: {
            type: String,
            default: 'no-photo.jpg',
        },
        services: [
            {
                type: String,
                enum: [
                    'hair treatment',
                    'haircuts',
                    'hair coloring',
                    'hair styling',
                    'extensions',
                    'waxing',
                    'men',
                    'women',
                    'children',
                    'waxing',
                    'shaving',
                    'special occasion',
                    'blow outs',
                    'perms',
                    'other',
                ],
            },
        ],
        address: {
            type: String,
            required: [true, 'Must Provide address of business location'],
        },
        location: {
            // GeoJSON Point
            // Will take in address and generate a location
            type: {
                type: String,
                enum: ['Point'],
            },
            coordinates: {
                type: [Number],
                index: '2dsphere',
            },
            formattedAddress: String,
            street: String,
            city: String,
            state: String,
            zipcode: String,
            country: String,
        },
        lastLogin: {
            type: Date,
            default: Date.now,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        role: {
            type: String,
            enum: ['stylist'],
            default: 'stylist',
        },
        resetPasswordToken: String,
        resetPasswordExpiration: Date,
    },
    { collection: 'stylists' }
);

// --------- Mongoose Hooks ----------------
StylistSchema.pre('save', async function (next) {
    var self = this;
    var exists = !this.isNew;
    await mongoose
        .model('StylistModel', StylistSchema)
        .find({ email: self.email }, function (err, docs) {
            if (!docs.length) {
                exists = false;
            } else {
                console.log('document exists');
                exists = true;
            }
        });

    // check if the document is new and see if password has been modified to
    // rehash and resalt as needed
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }

    // check if docuemnt is new and address exists and also checks if address
    // hass been modified to avoid using api when not necessary
    if ((!exists && this.address) || this.isModified('address')) {
        console.log('api function executed');
        console.log(this.isModified('address'));
        const loc = await geocoder.geocode(this.address);

        this.location = {
            type: 'Point',
            coordinates: [loc[0].longitude, loc[0].latitude],
            formattedAddress: loc[0].formattedAddress,
            street: loc[0].streetName,
            city: loc[0].city,
            state: loc[0].state,
            zipcode: loc[0].zipcode,
            country: loc[0].countryCode,
        };
    }
    next();
});

// Sign JWT and return

StylistSchema.methods.getSignedJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

StylistSchema.methods.geocodeAddress = function (address) {};

// Match plain pwd and hashed pwd

StylistSchema.methods.matchPassword = async function (plain) {
    return await bcrypt.compare(plain, this.password);
};

StylistSchema.methods.getResetPasswordToken = function () {
    //gen token

    const resetToken = crypto.randomBytes(20).toString('hex');

    // hash token and set to resetPasswordToken field
    this.resetPasswordToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

    // set expiration date
    this.resetPasswordExpiration = Date.now() + 10 * 60 * 1000;
    return resetToken;
};

export default mongoose.model('Stylist', StylistSchema);
