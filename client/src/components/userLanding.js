import React, {Component} from "react";
import PropTypes from "prop-types";
import {useDispatch, useSelector} from "react-redux";
import {logoutUser} from "../actions/authActions";
import {Link} from 'react-router-dom'
import SearchBar from "./search/searchBar";

const UserLanding = () => {
    const {user} = useSelector(state => state.auth)
    const dispatch = useDispatch()
    console.log(user)
    const onLogout = () => {
        dispatch(logoutUser())
    }

    return (
        <div className="container">
            <div className="row align-items-center">
                <div className="col-6 mx-auto justify-content-center align-self-center text-center">
                    <SearchBar />
                    <h1><b>Hello</b>, {user.firstName}</h1>
                    <button onClick={onLogout} className="btn btn-warning">Logout</button>
                </div>

            </div>

        </div>
    );
};

export default UserLanding;
