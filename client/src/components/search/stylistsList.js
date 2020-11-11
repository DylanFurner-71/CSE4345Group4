import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom'
import axios from 'axios';
import StylistInfo from "./stylistInfo";
import Loading from "../loading";

const StylistsList = () => {
    const query = useParams()
    console.log(query)
    const URL = 'http://localhost:8000/stylists/search'
    const [stylists, setStylists] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getStylistsOnName = async () => {
        await axios.get(URL, {
            params: {
                name: query.query
            }
        })
            .then(res => {
                setStylists(res.data.returnedStylists)
                setIsLoading(false)
                console.log('Stylists data fetched')
            })
            .catch(err => console.log(err))

    }

    const getStylistsOnServices = async () => {
        await axios.get(URL, {
            params: {
                services: query.query
            }
        })
            .then(res => {
                setStylists(res.data.returnedStylists)
                setIsLoading(false)
                console.log('Stylists data fetched')
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        if(query.type === 'name'){
            getStylistsOnName()
        }
        else if(query.type === 'services'){
            getStylistsOnServices()
        }

    }, [])

    return (
        <div className="h-100">
            {
                isLoading ? <Loading/> :
                <ul>
                    {stylists.map((stylist, index) => (
                        <StylistInfo
                            key={index}
                            stylist={stylist}
                        />
                    ))}
                </ul>
            }

        </div>
    );
};

export default StylistsList;
