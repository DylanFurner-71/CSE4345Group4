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
    const [stylist, setStylist] = useState({});
    const stylistId = useParams();
    const URL = "http://localhost:8000/api";
    const services = stylist.services;
    console.log("Services: ", services);
    useEffect(() => {
        const fetchStylist = async () => {
            await axios.get(`${URL}/stylists/${stylistId.id}`)
                .then(res => {
                    const stylistData = res.data.stylist
                    console.log(stylistData)
                    setStylist(stylistData)
                })
        }
        fetchStylist()
    }, [stylist])
    if (stylist && stylist.services && stylist.services.length > 0){
    return (
        <div className='Services text-center'>
        <h5 className='card-title display-4'> Services </h5>
        <div className='card'>
            {services.map((service, i) => (
                <div className='m-3' key={i}>
                    <div className='h3'>Service {i}</div>
                    <p> {service.name}</p>
                    <p> {service.description}</p>
                    <p> {service.cateogry}</p>
                    <p> {service.price}</p>

                </div>
            ))}
        </div>
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