import React, {Component} from "react";
import PropTypes from "prop-types";
import {useDispatch, useSelector} from "react-redux";
import {logoutUser} from "../actions/authActions";
import {Link} from 'react-router-dom'
import SearchBar from "./search/searchBar";
import StylistNav from "./stylistNav";
import ServicesOffered from "./stylist/servicesOffered";
const StylistLanding = () => {
    const {user} = useSelector(state => state.auth);
    const {services} = user;
    return (
        <div className="container justify-content-center align-items-center h-100">
            <div className="row">
                <div className="col-6 mx-auto  align-self-center text-center">
                    <h1><b>Hello</b>, {user.firstName}</h1>
                </div>
<div className="justify-content-center container valign-wrapper">
{StylistNav(user.firstName, user.id)}
<h1> Hello {`${user.firstName}  ${user.lastName}`} welcome to Ultimate Style!
            </h1>
                <img src={user.photo}/>
                <div className="container">

                </div>
            <div>
    <div className="row">
        <div className="col center-align">
           
                <Link
                    to={`/stylists/stylistCalendar/stylistId=${user.id}`}
                    style={{
                        width: "140px",
                        borderRadius: "3px",
                        letterSpacing: "1.5px",
                        padding: "12px"
                    }}
                    className="btn btn-large btn-flat waves-effect blue black-text"
                >Calendar</Link>
                <Link
                    to="/"
                    style={{
                        width: "140px",
                        borderRadius: "3px",
                        letterSpacing: "1.5px",
                        padding: "12px"
                    }}
                    className="btn btn-large btn-flat waves-effect blue black-text"
                >Back to home</Link>
            </div>
        </div>
    </div>
</div>
            </div>

        </div>
    );
};

export default StylistLanding;

