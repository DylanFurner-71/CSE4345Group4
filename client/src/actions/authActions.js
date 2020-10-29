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
export const registerUser = (userData, history) => dispatch => {
    axios
        .post("/users/register", userData)
        .then(() => history.push("/login")) // re-direct to login on successful register
        .catch(err =>
            // dispatch({
            //     type: GET_ERRORS,
            //     payload: err.response
            // })
            console.log(err)
        );
};

//registerSylistUserWillBe updated once I figure out how to correctlyCheck the texas ID database
export const registerUserStylist = (userData, history) => dispatch => {
    axios
        .post("/stylists/register/create", userData)
        .then(() => history.push("/login")) // re-direct to login on successful register
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};
export const login = (userData, history) => dispatch => {
    console.log(userData, 'User data aqui"');
    const {email, password, isStylist} = userData;
    const newUserData = {email: email, password: password};
    console.log(newUserData);
    if (isStylist === true){
        console.log("What's up homies")
        return loginStylist(newUserData, history);
    } else {
        return loginUser(newUserData, history);
    }
};
export const loginStylist = (userData, history) => dispatch =>  {
    console.log(userData, "l;aksdjfl;akdsjfl;akdsj");
    axios
    .post(`/stylists/login/`, userData)
    .then(res => {
        // Save to localStorage
// Set token to localStorage
        const {token} = res.data;
        localStorage.setItem("jwtToken", token);
        // Set token to Auth header
        setAuthToken(token);
        // Decode token to get user data
        const decoded = jwt_decode(token);
        // Set current user
        dispatch(setCurrentUser(decoded));
        console.log("decoded", decoded);
        console.log('loginstylist');
    }).then(() => history.push("/stylist/stylistLanding"))
    .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        }
    );
};
// Change Password
export const changePassword = (userData, history) => dispatch => {
    axios
        .post("/users/changePassword", userData)
        .then(() => history.push("/home")) // re-direct to home after changing password
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Login - get user token
export const loginUser = (userData, history) => dispatch => {
    axios
        .post("/users/login", userData)
        .then(res => {
            // Save to localStorage
// Set token to localStorage
            const {token} = res.data;
            localStorage.setItem("jwtToken", token);
            // Set token to Auth header
            setAuthToken(token);
            // Decode token to get user data
            const decoded = jwt_decode(token);
            // Set current user
            dispatch(setCurrentUser(decoded));
        })
        .catch(err => {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                })
            }
        );
};
// Set logged in user
export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    };
};

export const getCurrentUser = () => {
    return {
        type: CURRENT_USER,
        payload: SET_CURRENT_USER.payload
    }
}
// User loading
export const setUserLoading = () => {
    return {
        type: USER_LOADING
    };
};
// Log user out
export const logoutUser = () => dispatch => {
    // Remove token from local storage
    localStorage.removeItem("jwtToken");
    // Remove auth header for future requests
    setAuthToken(false);
    // Set current user to empty object {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}));
};