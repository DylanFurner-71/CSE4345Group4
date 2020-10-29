import Stylist from "../models/stylistModel.js";
import User from "../models/userModel.js";
import {userLogin} from './userController';
import { stylistLogin } from "./stylistController.js";


//@desc          Login in all users
//@route         POST /login
//@access        Public
export const login = async (req, res, next) => {
let isStylist = false;
if (!isStylist) {
    console.log("we are running user login");
    return userLogin(req, res, next);
}
return stylistLogin(req, res, next);
};