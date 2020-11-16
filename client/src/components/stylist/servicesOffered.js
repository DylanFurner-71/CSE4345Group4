
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
                   import ServicesList from "./servicesList";
                   import {AddServices} from "./addServices";
                   const ServicesOffered = () => {
                    const [stylist, setStylist] = useState({});
                    const [isLoading, setIsLoading] = useState(true);
                    const stylistId = useParams();
                    const URL = "http://localhost:8000/";
                
        useEffect(() => {
                        const fetchStylist = async () => {
                            console.log(stylist);
                            await axios.get(URL+stylist.id)
                                .then(res => {
                                    const stylistData = res.data.stylist
                                    console.log(stylistData)
                                    setStylist(stylistData)
                                    setIsLoading(false)
                                })
                        }
                        fetchStylist()
                    }, [])



                        return (
                            <div className="container-fluid w-75 my-2">
                                <Link to={`/stylists/stylistLanding`}>
                             Back To Your Home Page                                
                             </Link>
                             <ServicesList
                             services={stylist.services}
                        />
                            <AddServices
                            stylist={stylist}
                            />
                            </div>
                        );
                    };
export default ServicesOffered;