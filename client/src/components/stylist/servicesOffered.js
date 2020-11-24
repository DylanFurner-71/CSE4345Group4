import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loading from '../loading';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { CustomPlaceholder } from 'react-placeholder-image';
import ReviewBox from '../profile/reviewBox';
import Rating from '../rating/rating';
import ServicesList from './servicesList';
import { AddServices } from './addServices';
import base_url from '../../base_url';
const ServicesOffered = () => {
    const [stylist, setStylist] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const stylistId = useParams();
    const URL = `http://${base_url}:8000`;

    useEffect(() => {
        const fetchStylist = async () => {
            await axios.get(`${URL}/stylists/${stylistId.id}`).then(res => {
                const stylistData = res.data.stylist;
                setStylist(stylistData);
                setIsLoading(false);
            });
        };
        fetchStylist();
    }, [stylist]);
    return (
        <div className='container-fluid w-75 my-2'>
            <Link to={`/stylists/stylistLanding/stylistId=${stylistId.id}`}>
                Back To Your Home Page
            </Link>
            <ServicesList id={stylist.id} />
            <AddServices id={stylist.id} />
        </div>
    );
};
export default ServicesOffered;
