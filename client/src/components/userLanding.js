import React, {Component} from "react";
import PropTypes from "prop-types";
import {useDispatch, useSelector} from "react-redux";
import {logoutUser} from "../actions/authActions";
import {Link} from 'react-router-dom'
import SearchBar from "./search/searchBar";

const UserLanding = () => {
    const {user} = useSelector(state => state.auth)

    return (
        <div className="container justify-content-center align-items-center h-100">
            <div className="row">
                <div className="col-6 mx-auto  align-self-center text-center">
                    <h1><b>Hello</b>, {user.firstName}</h1>
                </div>

            </div>

        </div>
    );
};

export default UserLanding;
