import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom'
import {useParams} from 'react-router-dom'
import axios from 'axios'
import Loading from "../loading"
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import {CustomPlaceholder} from "react-placeholder-image";
import ReviewBox from "../profile/reviewBox";
import Rating from "../rating/rating"
const ServicesList = (props) => {
    const stylist = props.stylist;
    const stylistId = useParams();
    const URL = "http://localhost:8000";
    const services = stylist.services;

    if (stylist && services && services.length > 0){
    return (
        <div>
            {services.map((service, i) => (
                <div key={i}>{service}</div>
            ))}
        </div>
    );
            } else {
                return (
                    <div>
                        there are no services available currently. Please add one Below!
                    </div>
                )
            }
};

export default ServicesList;