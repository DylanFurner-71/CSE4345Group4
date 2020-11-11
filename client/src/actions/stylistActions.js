import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import {
    GET_ERRORS,
    SET_CURRENT_USER,
    USER_LOADING,
    CURRENT_USER,
} from "./types";
// Register User
const api = "http://localhost:8000";
axios.defaults.baseURL = api;
export const getStylistByID = async (email) => {
    return new Promise((resolve, reject) => {
        axios.get(`/stylists/jules@gmail.com}`)
        .then(x => resolve(x.data))
        .catch(e => {
            alert(e);
            reject();
        });
    });          
};

