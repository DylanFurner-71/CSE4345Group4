<<<<<<< HEAD
import React from 'react';
import {useSelector} from "react-redux";

const UserLanding = props => {
    const user = useSelector(state => state.auth)
    const logout = () => ({type: ''})
    return (
        <div>
            The user is {user}
=======
import React, {Component} from "react";
import PropTypes from "prop-types";
import {useDispatch, useSelector} from "react-redux";
import {logoutUser} from "../actions/authActions";
import {Link} from 'react-router-dom'

const UserLanding = () => {
    const {user} = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const onLogout = () => {
        dispatch(logoutUser())
    }

    return (
        <div className="container">
            <div className="row align-items-center">
                <div className="col-6 mx-auto justify-content-center align-self-center text-center">
                    <h1><b>Hello</b>, {user.firstName}</h1>
                    <button onClick={onLogout}>Logout</button>
                </div>

            </div>

>>>>>>> a5e3010b7a2498a558e372825e4c23df8fa698d2
        </div>
    );
};

export default UserLanding;
