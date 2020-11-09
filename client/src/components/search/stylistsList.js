import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom'
import axios from 'axios';
import StylistInfo from "./stylistInfo";

const StylistsList = () => {
    const stylistName = useParams()
    const URL = 'http://localhost:8000/stylists/search'
    const [stylists, setStylists] = useState([]);

    useEffect(() => {
        const getStylists = async () => {
            await axios.get(URL, {
                params: {
                    name: stylistName.name
                }
            })
                .then(res => {
                    setStylists(res.data.returnedStylists)
                    console.log('Stylists data fetched')
                })
                .catch(err => console.log(err))

        }
        getStylists()
    }, [])

    return (
        <div>
            <ul>
                {stylists.map((stylist, index) => (
                    <StylistInfo
                        key={index}
                        stylist={stylist}
                    />
                ))}
            </ul>
        </div>
    );
};

export default StylistsList;
