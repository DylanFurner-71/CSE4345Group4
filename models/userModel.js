import mongoose, {
    Schema
} from 'mongoose';


const UserSchema = mongoose.Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    lastLogin:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', UserSchema);