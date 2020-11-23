import React, {Component} from "react";
import PropTypes from "prop-types";
import {useDispatch, useSelector} from "react-redux";
import {logoutUser} from "../../actions/authActions";
import {Link} from 'react-router-dom'
import SearchBar from "../search/searchBar";
import ServiceBox from "./serviceBox";

const UserLanding = () => {
    const {user} = useSelector(state => state.auth)
    const services = ['Men\'s Haircut', 'Women\'s Haircut', 'Braids', 'Color', 'Facial', 'Nails']
    const imageURLs = [
        'https://images.unsplash.com/photo-1519019121902-896ed7312a9e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
        'https://images.unsplash.com/flagged/photo-1575277942704-3b02a862e5f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1867&q=80',
        'https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
        'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80',
        'https://images.unsplash.com/photo-1531299244174-d247dd4e5a66?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1270&q=80',
        'https://images.unsplash.com/photo-1599206676335-193c82b13c9e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1251&q=80'
    ]
    return (
        <div className="justify-content-center align-items-center h-100">
            <div className="row">
                <div className="col-6 mx-auto  align-self-center text-center">
                    <h1 className="display-1"><b>Hello</b>, {user.firstName}</h1>
                    <p>You have 0 appointments</p>
                </div>
            </div>
            <div className="row justify-content-center align-items-start h-100">
                <div className="card-deck col-11">
                    {services.map((service, index) => <ServiceBox
                        key={index}
                        imageURL={imageURLs[index]}
                        service={service}
                    />)}
                </div>


            </div>

        </div>
    );
};

export default UserLanding;
