import mongoose from 'mongoose'; 
import User from '../models/userModel.js';

/*
user.getUsers
user.createUser
*/

exports.getUsers = async (req, res) =>{
    try{
        const users = await User.find();
        res.json(users);
    } catch(err){
        res.json({msg:err});
    }
}

exports.createUser = async (req, res) => {
    const user = new User(req.body);
    try {
        const newUser = await user.save();
        res.json(newUser);
    } catch(err){
        res.json({msg: err});
    }
}